export interface NavModule {
  id: number;
	name: string;
	slug: string;
	icon: string;
	permission?: string;
	order?: number;
	is_active?: boolean;
	submodules?: NavModule[];
}

export interface SidebarProps {
	userRole?: string;
}