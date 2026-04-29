export interface UserRole {
  id: number;
  name: string;
}

export interface UserItem {
  id: number;
  username: string;
  name: string;
  last_name: string;
  second_last_name?: string | null;
  phone: string;
  email: string;
  address: string;
  created_at: string;
  roles?: UserRole[];
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface UsersListResponse {
  status: string;
  message: string;
  data: UserItem[];
  meta: PaginationMeta;
}

export interface UserPayload {
  username: string;
  name: string;
  last_name: string;
  second_last_name?: string;
  phone: string;
  email: string;
  address: string;
  role?: string;
  password?: string;
  password_confirmation?: string;
}
