import { Item, User, BorrowRequest, ItemCategory, ItemCondition, RequestStatus, SearchFilters } from '../types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  location: {
    latitude: 47.3769,
    longitude: 8.5417,
    address: 'Zurich, Switzerland'
  },
  createdAt: new Date('2024-01-01')
};

const mockUsers: User[] = [
  mockUser,
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    location: {
      latitude: 47.3700,
      longitude: 8.5400,
      address: 'Zurich, Switzerland'
    },
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    location: {
      latitude: 47.3800,
      longitude: 8.5450,
      address: 'Zurich, Switzerland'
    },
    createdAt: new Date('2024-01-03')
  }
];

let mockItems: Item[] = [
  {
    id: '1',
    title: 'Electric Drill',
    description: 'Powerful cordless drill, perfect for home projects',
    category: ItemCategory.TOOLS,
    images: ['https://via.placeholder.com/300x300?text=Electric+Drill'],
    owner: mockUsers[1],
    isAvailable: true,
    condition: ItemCondition.GOOD,
    tags: ['drill', 'power tool', 'cordless'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Garden Hose',
    description: '25-meter garden hose with spray nozzle',
    category: ItemCategory.GARDEN,
    images: ['https://via.placeholder.com/300x300?text=Garden+Hose'],
    owner: mockUsers[2],
    isAvailable: true,
    condition: ItemCondition.LIKE_NEW,
    tags: ['hose', 'garden', 'watering'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'Stand Mixer',
    description: 'KitchenAid stand mixer, great for baking',
    category: ItemCategory.KITCHEN,
    images: ['https://via.placeholder.com/300x300?text=Stand+Mixer'],
    owner: mockUsers[0],
    isAvailable: false,
    condition: ItemCondition.GOOD,
    tags: ['mixer', 'baking', 'kitchen'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    title: 'Ladder',
    description: '3-meter aluminum ladder, foldable',
    category: ItemCategory.TOOLS,
    images: ['https://via.placeholder.com/300x300?text=Ladder'],
    owner: mockUsers[1],
    isAvailable: true,
    condition: ItemCondition.GOOD,
    tags: ['ladder', 'aluminum', 'foldable'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
];

let mockRequests: BorrowRequest[] = [];

export const mockApi = {
  async getItems(filters?: SearchFilters): Promise<Item[]> {
    let filteredItems = [...mockItems];

    if (filters) {
      if (filters.category) {
        filteredItems = filteredItems.filter(item => item.category === filters.category);
      }
      if (filters.condition) {
        filteredItems = filteredItems.filter(item => item.condition === filters.condition);
      }
      if (filters.isAvailable !== undefined) {
        filteredItems = filteredItems.filter(item => item.isAvailable === filters.isAvailable);
      }
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(filteredItems), 300);
    });
  },

  async getItemById(id: string): Promise<Item | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const item = mockItems.find(item => item.id === id);
        resolve(item || null);
      }, 200);
    });
  },

  async createItem(itemData: Omit<Item, 'id' | 'owner' | 'createdAt' | 'updatedAt'>): Promise<Item> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newItem: Item = {
          ...itemData,
          id: Math.random().toString(36).substr(2, 9),
          owner: mockUser,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        mockItems.push(newItem);
        resolve(newItem);
      }, 400);
    });
  },

  async updateItem(id: string, updates: Partial<Item>): Promise<Item | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const itemIndex = mockItems.findIndex(item => item.id === id);
        if (itemIndex === -1) {
          resolve(null);
          return;
        }
        
        mockItems[itemIndex] = {
          ...mockItems[itemIndex],
          ...updates,
          updatedAt: new Date()
        };
        resolve(mockItems[itemIndex]);
      }, 300);
    });
  },

  async deleteItem(id: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const itemIndex = mockItems.findIndex(item => item.id === id);
        if (itemIndex === -1) {
          resolve(false);
          return;
        }
        mockItems.splice(itemIndex, 1);
        resolve(true);
      }, 200);
    });
  },

  async getUserItems(userId: string): Promise<Item[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const userItems = mockItems.filter(item => item.owner.id === userId);
        resolve(userItems);
      }, 250);
    });
  },

  async searchItems(query: string): Promise<Item[]> {
    return this.getItems({ query });
  },

  async getCurrentUser(): Promise<User> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockUser), 100);
    });
  }
};