export type ClientTier = 'regular' | 'vip' | 'new' | 'loyal';
export type ClientStatus = 'active' | 'inactive' | 'blacklisted';

export interface RestaurantClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: ClientTier;
  status: ClientStatus;
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
  avatar?: string;
}

export interface ClientFilters {
  search: string;
  tier: ClientTier | 'all';
  status: ClientStatus | 'all';
}
