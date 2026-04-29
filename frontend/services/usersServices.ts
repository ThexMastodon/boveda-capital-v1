import apiClient from "@/lib/api-client";
import { ApiResponse, UserItem, UserPayload, UsersListResponse } from "@/types/users";

export const usersService = {
  async getUsers(page = 1, perPage = 10, search = ""): Promise<UsersListResponse> {
    const { data } = await apiClient.get<UsersListResponse>("/users", {
      params: {
        page,
        per_page: perPage,
        search: search || undefined,
      },
    });

    return data;
  },

  async getRoles(): Promise<string[]> {
    const { data } = await apiClient.get<ApiResponse<string[]>>("/users/roles");
    return data.data;
  },

  async createUser(payload: UserPayload): Promise<UserItem> {
    const { data } = await apiClient.post<ApiResponse<UserItem>>("/users", payload);
    return data.data;
  },

  async updateUser(id: number, payload: UserPayload): Promise<UserItem> {
    const { data } = await apiClient.put<ApiResponse<UserItem>>(`/users/${id}`, payload);
    return data.data;
  },

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};
