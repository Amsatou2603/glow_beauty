const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = {
  async register(data: { email: string; password: string; username: string; first_name: string; last_name: string }) {
    const response = await fetch(`${API_BASE}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result.detail || 'Erreur lors de l\'inscription' };
    }
    return result;
  },
  
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result.error || 'Email ou mot de passe incorrect' };
    }
    return result;
  },
  
  async getProfile(token: string) {
    const response = await fetch(`${API_BASE}/auth/profile/`, {
      headers: { 'Authorization': `Token ${token}` },
    });
    if (!response.ok) {
      return { error: 'Non authentifié' };
    }
    return response.json();
  },

  async isAdmin(token: string) {
    const response = await fetch(`${API_BASE}/auth/is-admin/`, {
      headers: { 'Authorization': `Token ${token}` },
    });
    if (!response.ok) {
      return { is_admin: false };
    }
    return response.json();
  },

  getHeaders(token?: string) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    return headers;
  },

  async getProducts() {
    const response = await fetch(`${API_BASE}/products/`);
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return [];
    }
    return response.json();
  },

  async getProduct(id: string) {
    const response = await fetch(`${API_BASE}/products/${id}/`);
    return response.json();
  },
};