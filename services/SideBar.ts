import apiClient from '@/lib/api-client';
import { NavModule } from '@/types/Sidebar';

export const navigationService = {
  getModules: async (): Promise<NavModule[]> => {
    try {
      const { data } = await apiClient.get<{ status: string; data: NavModule[] }>('/navigation');

      return data.data;
    } catch (error) {
      console.error('Error fetching navigation modules:', error);
      throw error;
    }
  }
};