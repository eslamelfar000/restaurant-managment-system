export interface Meal {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  description: string;
  availability: boolean;
  createdAt: string;
}

export interface MealFilters {
  search: string;
  category: string;
  availability: 'all' | 'available' | 'unavailable';
}
