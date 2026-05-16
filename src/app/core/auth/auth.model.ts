import { AppRole } from '../constants/role.constants';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tenantId: string;
  username: string;
  role: AppRole;
  companyName: string;
  expiresAt: string;
}

export interface JwtPayload {
  sub?: string;
  role?: AppRole;
  tenantId?: string;
  companyName?: string;
  exp?: number;
}
