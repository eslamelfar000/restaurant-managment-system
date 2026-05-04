import { useState, useMemo } from 'react';
import { RestaurantClient, ClientFilters } from '../types';

const MOCK_CLIENTS: RestaurantClient[] = [
  {
    id: 'C-8801',
    name: 'Alexander Wright',
    email: 'alex.w@gmail.com',
    phone: '+1 555 0102',
    tier: 'vip',
    status: 'active',
    joinedAt: new Date('2023-11-12').toISOString(),
    totalOrders: 42,
    totalSpent: 1250.50,
  },
  {
    id: 'C-8802',
    name: 'Elena Rodriguez',
    email: 'elena.r@outlook.com',
    phone: '+1 555 0103',
    tier: 'loyal',
    status: 'active',
    joinedAt: new Date('2024-01-05').toISOString(),
    totalOrders: 18,
    totalSpent: 450.25,
  },
  {
    id: 'C-8803',
    name: 'Marcus Chen',
    email: 'm.chen@yahoo.com',
    phone: '+1 555 0104',
    tier: 'new',
    status: 'active',
    joinedAt: new Date('2024-04-15').toISOString(),
    totalOrders: 2,
    totalSpent: 85.00,
  }
];

export const useClients = () => {
  const [clients, setClients] = useState<RestaurantClient[]>(MOCK_CLIENTS);
  const [filters, setFilters] = useState<ClientFilters>({
    search: '',
    tier: 'all',
    status: 'all'
  });

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           client.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesTier = filters.tier === 'all' || client.tier === filters.tier;
      const matchesStatus = filters.status === 'all' || client.status === filters.status;
      
      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [clients, filters]);

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const toggleClientStatus = (id: string) => {
    setClients(prev => prev.map(c => c.id === id 
      ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } 
      : c
    ));
  };

  return {
    clients: filteredClients,
    filters,
    setFilters,
    deleteClient,
    toggleClientStatus,
    totalCount: clients.length
  };
};
