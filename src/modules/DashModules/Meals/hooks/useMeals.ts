import { useState, useMemo } from 'react';
import { Meal, MealFilters } from '../types';

const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Risotto',
    price: 24.50,
    category: 'Main Course',
    description: 'Creamy arborio rice with wild mushrooms and truffle oil.',
    availability: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Wagyu Beef Burger',
    price: 18.90,
    category: 'Burgers',
    description: 'Premium wagyu beef with caramelized onions and brioche bun.',
    availability: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Classic Caesar Salad',
    price: 12.00,
    category: 'Salads',
    description: 'Romaine lettuce, parmesan, croutons, and caesar dressing.',
    availability: false,
    createdAt: new Date().toISOString()
  }
];

export const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>(MOCK_MEALS);
  const [filters, setFilters] = useState<MealFilters>({
    search: '',
    category: 'all',
    availability: 'all'
  });

  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || meal.category === filters.category;
      const matchesAvailability = filters.availability === 'all' || 
        (filters.availability === 'available' && meal.availability) ||
        (filters.availability === 'unavailable' && !meal.availability);
      
      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [meals, filters]);

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setMeals(prev => prev.map(m => m.id === id ? { ...m, availability: !m.availability } : m));
  };

  return {
    meals: filteredMeals,
    filters,
    setFilters,
    deleteMeal,
    toggleAvailability,
    totalCount: meals.length
  };
};
