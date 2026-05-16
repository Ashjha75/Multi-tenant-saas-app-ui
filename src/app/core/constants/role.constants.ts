export const ROLES = {
  platformAdmin: 'ROLE_PLATFORM_ADMIN',
  administrator: 'ROLE_ADMINISTRATOR',
  companyAdmin: 'ROLE_COMPANY_ADMIN',
  user: 'ROLE_USER',
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];
