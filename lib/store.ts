import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  category: string;
  description: string;
  image_url: string;
  rating: number;
  review_count: number;
  badge?: string;
  ingredients?: string;
  is_new?: boolean;
  is_bestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  userId: string | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  setUserId: (userId: string | null) => void;
  syncWithSupabase: () => Promise<void>;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      userId: null,

      addItem: async (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });

        const state = get();
        if (state.userId) {
          const item = state.items.find(i => i.id === product.id);
          if (item) {
            await supabase.from('cart_items').upsert({
              user_id: state.userId,
              product_id: product.id,
              quantity: item.quantity
            }, { onConflict: 'user_id, product_id' });
          }
        }
      },

      removeItem: async (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        const state = get();
        if (state.userId) {
          await supabase.from('cart_items').delete().eq('user_id', state.userId).eq('product_id', id);
        }
      },

      updateQuantity: async (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
        
        const state = get();
        if (state.userId) {
          await supabase.from('cart_items').update({ quantity }).eq('user_id', state.userId).eq('product_id', id);
        }
      },

      clearCart: async () => {
        set({ items: [] });
        const state = get();
        if (state.userId) {
          await supabase.from('cart_items').delete().eq('user_id', state.userId);
        }
      },
      
      setOpen: (open) => set({ isOpen: open }),
      setUserId: (userId) => set({ userId }),

      syncWithSupabase: async () => {
        const state = get();
        if (!state.userId) return;

        // 1. Fetch cloud cart
        const { data: cloudItems } = await supabase
          .from('cart_items')
          .select('quantity, product_id, products(*)')
          .eq('user_id', state.userId);

        if (!cloudItems) return;

        // 2. Merge local items into cloud (upsert missing local items)
        const localItems = [...state.items];
        
        for (const localItem of localItems) {
          const cloudItem = cloudItems.find(c => c.product_id === localItem.id);
          if (!cloudItem) {
             await supabase.from('cart_items').upsert({
               user_id: state.userId,
               product_id: localItem.id,
               quantity: localItem.quantity
             }, { onConflict: 'user_id, product_id' });
          }
        }

        // 3. Fetch final merged state from cloud
        const { data: finalCloudItems } = await supabase
          .from('cart_items')
          .select('quantity, product_id, products(*)')
          .eq('user_id', state.userId);

        if (finalCloudItems) {
           const mergedItems: CartItem[] = finalCloudItems.map(item => {
             const product = Array.isArray(item.products) ? item.products[0] : item.products;
             return {
               ...product,
               quantity: item.quantity
             };
           }).filter(i => i.id);

           set({ items: mergedItems });
        }
      },

      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'glow-beauty-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, userId: state.userId }),
    }
  )
);
