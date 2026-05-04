export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  itemCount: number;
  status: 'active' | 'hidden';
  sortOrder: number;
}

export interface CategoryFilters {
  search: string;
  status: 'all' | 'active' | 'hidden';
}
