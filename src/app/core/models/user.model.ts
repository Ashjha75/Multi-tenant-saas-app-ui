import { AppRole } from '../constants/role.constants';

export interface User {
  username: string;
  role: AppRole;
  tenantId: string;
  companyName?: string;
  exp?: number;
}
