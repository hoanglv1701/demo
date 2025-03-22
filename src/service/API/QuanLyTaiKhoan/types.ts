
export interface RoleDataResponse {
  id: string;
  name: string;
  code: string;
  roles: string[];
  children?: RoleDataResponse[]
}
