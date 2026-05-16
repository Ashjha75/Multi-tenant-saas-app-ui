import { AppRole } from '../constants/role.constants';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  tenantId?: string;
  username?: string;
  role?: AppRole;
  companyName?: string;
  expiresAt?: string;
}

export interface RegisterTenantRequest {
  companyName: string;
  companyCode: string;
  email: string;

  adminFullName: string;
  adminEmail: string;
  adminUsername: string;
  adminPassword: string;
}

export interface RegisterTenantResponse {
  id?: string;
  status?: string;
  message?: string;
}

export interface JwtPayload {
  sub?: string;
  role?: AppRole;
  tenantId?: string;
  companyName?: string;
  exp?: number;
}
