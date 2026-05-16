export const API_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  health: '/health',
  tenants: '/tenants',
  users: '/users',
  categories: '/categories',
  products: '/products',
  stockMovements: '/stock-mvts',
} as const;

export const PUBLIC_ENDPOINTS: string[] = [
  API_ENDPOINTS.login,
  API_ENDPOINTS.register,
  API_ENDPOINTS.health,
];
