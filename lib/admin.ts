import { supabase } from './supabase';
import { type Product } from './store';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
}

export async function isAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !data) return false;
  return data.role === 'admin';
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) return null;
  return data as AdminUser;
}

export async function getAllUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as AdminUser[];
}

export async function updateUserRole(userId: string, role: 'user' | 'admin'): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', userId);

  return !error;
}

export async function deleteUser(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  return !error;
}

export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:users(email, full_name),
      items:order_items(*, product:products(name, price))
    `)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  return !error;
}

export async function getStats() {
  const [usersCount, ordersCount, productsCount, revenue] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total').eq('status', 'delivered')
  ]);

  const totalRevenue = revenue.data?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

  return {
    users: usersCount.count || 0,
    orders: ordersCount.count || 0,
    products: productsCount.count || 0,
    revenue: totalRevenue
  };
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as Product[];
}
