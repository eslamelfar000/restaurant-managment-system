import { useState, useMemo } from 'react';
import { RestaurantUser, UserFilters } from '../types';

const MOCK_USERS: RestaurantUser[] = [
  {
    id: 'u1',
    name: 'Chef Mario Rossi',
    email: 'mario@gourmet.os',
    phone: '+1 234 567 890',
    role: 'chef',
    status: 'active',
    joinedAt: new Date('2023-01-15').toISOString(),
  },
  {
    id: 'u2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@gourmet.os',
    phone: '+1 234 567 891',
    role: 'manager',
    status: 'active',
    joinedAt: new Date('2023-03-10').toISOString(),
  },
  {
    id: 'u3',
    name: 'Lucas Silva',
    email: 'lucas.s@gourmet.os',
    phone: '+1 234 567 892',
    role: 'waiter',
    status: 'inactive',
    joinedAt: new Date('2023-06-22').toISOString(),
  }
];

export const useUsers = () => {
  const [users, setUsers] = useState<RestaurantUser[]>(MOCK_USERS);
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    role: 'all',
    status: 'all'
  });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesStatus = filters.status === 'all' || user.status === filters.status;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, filters]);

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id 
      ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } 
      : u
    ));
  };

  return {
    users: filteredUsers,
    filters,
    setFilters,
    deleteUser,
    toggleUserStatus,
    totalCount: users.length
  };
};
