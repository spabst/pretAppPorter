import { supabase } from '@/lib/supabase';
import { Item, User, BorrowRequest, ItemCategory, ItemCondition, RequestStatus, SearchFilters } from '../types';

// Helper function to transform database item to app item format
function transformDbItemToItem(dbItem: any, ownerData?: any): Item {
  return {
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description,
    category: dbItem.category as ItemCategory,
    images: dbItem.images || [],
    owner: ownerData || {
      id: dbItem.owner_id,
      name: dbItem.owner_name || 'Unknown',
      email: '',
      location: { latitude: 0, longitude: 0, address: dbItem.owner_address || '' },
      createdAt: new Date()
    },
    isAvailable: dbItem.is_available,
    condition: dbItem.condition as ItemCondition,
    tags: dbItem.tags || [],
    createdAt: new Date(dbItem.created_at),
    updatedAt: new Date(dbItem.updated_at)
  };
}

// Helper function to transform database user to app user format
function transformDbUserToUser(dbUser: any): User {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    location: {
      latitude: 0, // PostGIS data would need special parsing
      longitude: 0,
      address: dbUser.address
    },
    createdAt: new Date(dbUser.created_at)
  };
}

export const supabaseApi = {
  async getItems(filters?: SearchFilters): Promise<Item[]> {
    try {
      let query = supabase
        .from('items')
        .select(`
          *,
          owner:users!items_owner_id_fkey(id, name, email, address)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (filters) {
        if (filters.category) {
          query = query.eq('category', filters.category);
        }
        if (filters.condition) {
          query = query.eq('condition', filters.condition);
        }
        if (filters.isAvailable !== undefined) {
          query = query.eq('is_available', filters.isAvailable);
        }
        if (filters.query) {
          // Use PostgreSQL full-text search or simple ILIKE
          query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching items:', error);
        throw error;
      }

      return (data || []).map(item => transformDbItemToItem(item, item.owner ? transformDbUserToUser(item.owner) : undefined));
    } catch (error) {
      console.error('Error in getItems:', error);
      throw error;
    }
  },

  async getItemById(id: string): Promise<Item | null> {
    try {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          owner:users!items_owner_id_fkey(id, name, email, address)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching item by id:', error);
        return null;
      }

      return data ? transformDbItemToItem(data, data.owner ? transformDbUserToUser(data.owner) : undefined) : null;
    } catch (error) {
      console.error('Error in getItemById:', error);
      return null;
    }
  },

  async createItem(itemData: Omit<Item, 'id' | 'owner' | 'createdAt' | 'updatedAt'>): Promise<Item> {
    try {
      // Get current user - for now we'll use the first user from our sample data
      // In a real app, this would come from the auth context
      const currentUser = await this.getCurrentUser();
      
      const newItem = {
        title: itemData.title,
        description: itemData.description,
        category: itemData.category,
        condition: itemData.condition,
        images: itemData.images,
        tags: itemData.tags,
        is_available: itemData.isAvailable,
        owner_id: currentUser.id
      };

      const { data, error } = await supabase
        .from('items')
        .insert([newItem])
        .select(`
          *,
          owner:users!items_owner_id_fkey(id, name, email, address)
        `)
        .single();

      if (error) {
        console.error('Error creating item:', error);
        throw error;
      }

      return transformDbItemToItem(data, data.owner ? transformDbUserToUser(data.owner) : undefined);
    } catch (error) {
      console.error('Error in createItem:', error);
      throw error;
    }
  },

  async updateItem(id: string, updates: Partial<Item>): Promise<Item | null> {
    try {
      const updateData: any = {};
      
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.condition !== undefined) updateData.condition = updates.condition;
      if (updates.images !== undefined) updateData.images = updates.images;
      if (updates.tags !== undefined) updateData.tags = updates.tags;
      if (updates.isAvailable !== undefined) updateData.is_available = updates.isAvailable;

      const { data, error } = await supabase
        .from('items')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          owner:users!items_owner_id_fkey(id, name, email, address)
        `)
        .single();

      if (error) {
        console.error('Error updating item:', error);
        return null;
      }

      return data ? transformDbItemToItem(data, data.owner ? transformDbUserToUser(data.owner) : undefined) : null;
    } catch (error) {
      console.error('Error in updateItem:', error);
      return null;
    }
  },

  async deleteItem(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting item:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteItem:', error);
      return false;
    }
  },

  async getUserItems(userId: string): Promise<Item[]> {
    try {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          owner:users!items_owner_id_fkey(id, name, email, address)
        `)
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user items:', error);
        throw error;
      }

      return (data || []).map(item => transformDbItemToItem(item, item.owner ? transformDbUserToUser(item.owner) : undefined));
    } catch (error) {
      console.error('Error in getUserItems:', error);
      throw error;
    }
  },

  async searchItems(query: string): Promise<Item[]> {
    return this.getItems({ query });
  },

  async getCurrentUser(): Promise<User> {
    try {
      // For now, return the first user from our sample data
      // In a real app, this would get the authenticated user
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1)
        .single();

      if (error || !data) {
        // Fallback: create or return a default user
        console.warn('No user found, using fallback user');
        return {
          id: 'e3de7cf1-a7cb-4826-8cc6-02a3963d7629', // John Doe's ID from our sample data
          name: 'John Doe',
          email: 'john@example.com',
          location: {
            latitude: 46.5197,
            longitude: 6.6323,
            address: 'Rue de la Paix 15, 1003 Lausanne'
          },
          createdAt: new Date()
        };
      }

      return transformDbUserToUser(data);
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      // Return fallback user
      return {
        id: 'e3de7cf1-a7cb-4826-8cc6-02a3963d7629',
        name: 'John Doe',
        email: 'john@example.com',
        location: {
          latitude: 46.5197,
          longitude: 6.6323,
          address: 'Rue de la Paix 15, 1003 Lausanne'
        },
        createdAt: new Date()
      };
    }
  },

  async getNearbyItems(latitude: number, longitude: number, maxDistance: number = 10000): Promise<Item[]> {
    try {
      const { data, error } = await supabase
        .rpc('nearby_items', {
          lat: latitude,
          lng: longitude,
          max_distance: maxDistance
        });

      if (error) {
        console.error('Error fetching nearby items:', error);
        throw error;
      }

      return (data || []).map((item: any) => transformDbItemToItem({
        ...item,
        owner_name: item.owner_name,
        owner_address: item.owner_address
      }));
    } catch (error) {
      console.error('Error in getNearbyItems:', error);
      throw error;
    }
  }
};