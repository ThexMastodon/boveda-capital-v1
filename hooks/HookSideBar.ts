import { useState, useEffect } from "react";
import { NavModule } from "@/types/Sidebar";
import { navigationService } from "@/services/SideBar";

export const useSidebar = () => {
  const [modules, setModules] = useState<NavModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await navigationService.getModules();
        setModules(data);
      } catch {
        setError('No se pudo cargar la terminal de navegación.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  return { modules, isLoading, error };
}