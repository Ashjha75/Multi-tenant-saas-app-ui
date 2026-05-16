export const ROLES = {
  platformAdmin: 'ROLE_PLATFORM_ADMIN',
  companyAdmin: 'ROLE_COMPANY_ADMIN',
  user: 'ROLE_USER',
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];
