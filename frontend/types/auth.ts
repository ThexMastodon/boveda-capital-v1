export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    access_token: string;
    token_type: string;
    roles: string[];
  };
}

export interface loginCredentials {
  login: string;
  password: string;
}