// Integration tests for Supabase API service
import { supabaseApi } from '@/services/supabaseApi';
import { ItemCategory, ItemCondition } from '@/types';

// Mock Supabase client for isolated testing
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => ({
            data: [
              {
                id: 'test-item-1',
                title: 'Test Item',
                description: 'A test item',
                category: 'tools',
                condition: 'good',
                images: [],
                tags: ['test'],
                is_available: true,
                owner_id: 'test-owner-1',
                created_at: '2025-01-01T00:00:00Z',
                updated_at: '2025-01-01T00:00:00Z',
                owner: {
                  id: 'test-owner-1',
                  name: 'Test Owner',
                  email: 'test@example.com',
                  address: 'Test Address'
                }
              }
            ],
            error: null
          }))
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              id: 'new-item-id',
              title: 'New Item',
              description: 'A new test item',
              category: 'tools',
              condition: 'good',
              images: [],
              tags: [],
              is_available: true,
              owner_id: 'test-owner-1',
              created_at: '2025-01-01T00:00:00Z',
              updated_at: '2025-01-01T00:00:00Z',
              owner: {
                id: 'test-owner-1',
                name: 'Test Owner',
                email: 'test@example.com',
                address: 'Test Address'
              }
            },
            error: null
          }))
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => ({
              data: {
                id: 'test-item-1',
                title: 'Updated Item',
                description: 'An updated test item',
                category: 'tools',
                condition: 'good',
                images: [],
                tags: [],
                is_available: true,
                owner_id: 'test-owner-1',
                created_at: '2025-01-01T00:00:00Z',
                updated_at: '2025-01-01T12:00:00Z',
                owner: {
                  id: 'test-owner-1',
                  name: 'Test Owner',
                  email: 'test@example.com',
                  address: 'Test Address'
                }
              },
              error: null
            }))
          }))
        }))
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          error: null
        }))
      }))
    })),
    rpc: jest.fn(() => ({
      data: [
        {
          id: 'nearby-item-1',
          title: 'Nearby Item',
          description: 'An item nearby',
          category: 'tools',
          condition: 'good',
          images: [],
          tags: [],
          is_available: true,
          owner_id: 'test-owner-1',
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z',
          distance: 500,
          owner_name: 'Test Owner',
          owner_address: 'Test Address'
        }
      ],
      error: null
    }))
  }
}));

describe('SupabaseApi Service', () => {
  describe('getItems', () => {
    it('should fetch items successfully', async () => {
      const items = await supabaseApi.getItems();
      
      expect(items).toHaveLength(1);
      expect(items[0]).toMatchObject({
        id: 'test-item-1',
        title: 'Test Item',
        description: 'A test item',
        category: ItemCategory.TOOLS,
        condition: ItemCondition.GOOD,
        isAvailable: true
      });
    });

    it('should fetch items with filters', async () => {
      const items = await supabaseApi.getItems({ 
        category: ItemCategory.TOOLS 
      });
      
      expect(items).toHaveLength(1);
      expect(items[0].category).toBe(ItemCategory.TOOLS);
    });

    it('should handle search queries', async () => {
      const items = await supabaseApi.getItems({ 
        query: 'drill' 
      });
      
      expect(items).toHaveLength(1);
    });
  });

  describe('createItem', () => {
    it('should create a new item successfully', async () => {
      const itemData = {
        title: 'New Item',
        description: 'A new test item',
        category: ItemCategory.TOOLS,
        condition: ItemCondition.GOOD,
        images: [],
        tags: [],
        isAvailable: true
      };

      const createdItem = await supabaseApi.createItem(itemData);
      
      expect(createdItem).toMatchObject({
        id: 'new-item-id',
        title: 'New Item',
        description: 'A new test item',
        category: ItemCategory.TOOLS,
        condition: ItemCondition.GOOD,
        isAvailable: true
      });
    });
  });

  describe('updateItem', () => {
    it('should update an item successfully', async () => {
      const updates = {
        title: 'Updated Item',
        description: 'An updated test item'
      };

      const updatedItem = await supabaseApi.updateItem('test-item-1', updates);
      
      expect(updatedItem).not.toBeNull();
      expect(updatedItem?.title).toBe('Updated Item');
      expect(updatedItem?.description).toBe('An updated test item');
    });
  });

  describe('deleteItem', () => {
    it('should delete an item successfully', async () => {
      const result = await supabaseApi.deleteItem('test-item-1');
      
      expect(result).toBe(true);
    });
  });

  describe('getNearbyItems', () => {
    it('should fetch nearby items successfully', async () => {
      const nearbyItems = await supabaseApi.getNearbyItems(46.5197, 6.6323, 10000);
      
      expect(nearbyItems).toHaveLength(1);
      expect(nearbyItems[0]).toMatchObject({
        id: 'nearby-item-1',
        title: 'Nearby Item',
        category: ItemCategory.TOOLS,
        isAvailable: true
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should return a fallback user', async () => {
      const user = await supabaseApi.getCurrentUser();
      
      expect(user).toMatchObject({
        id: 'e3de7cf1-a7cb-4826-8cc6-02a3963d7629',
        name: 'John Doe',
        email: 'john@example.com'
      });
    });
  });
});

describe('Data Transformation', () => {
  it('should properly transform database items to app format', async () => {
    const items = await supabaseApi.getItems();
    const item = items[0];
    
    // Check that all required fields are present and properly typed
    expect(typeof item.id).toBe('string');
    expect(typeof item.title).toBe('string');
    expect(typeof item.description).toBe('string');
    expect(Object.values(ItemCategory)).toContain(item.category);
    expect(Object.values(ItemCondition)).toContain(item.condition);
    expect(Array.isArray(item.images)).toBe(true);
    expect(Array.isArray(item.tags)).toBe(true);
    expect(typeof item.isAvailable).toBe('boolean');
    expect(item.createdAt).toBeInstanceOf(Date);
    expect(item.updatedAt).toBeInstanceOf(Date);
    
    // Check owner structure
    expect(item.owner).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      location: expect.objectContaining({
        address: expect.any(String)
      })
    });
  });
});

describe('Error Handling', () => {
  it('should handle API errors gracefully', async () => {
    // Mock an error response
    const { supabase } = require('@/lib/supabase');
    supabase.from.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          order: () => ({
            data: null,
            error: { message: 'Database connection failed' }
          })
        })
      })
    });

    await expect(supabaseApi.getItems()).rejects.toThrow();
  });
});