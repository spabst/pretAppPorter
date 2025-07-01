export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: Date;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  images: string[];
  owner: User;
  isAvailable: boolean;
  condition: ItemCondition;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowRequest {
  id: string;
  item: Item;
  borrower: User;
  owner: User;
  status: RequestStatus;
  message: string;
  requestedDate: Date;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
}

export enum ItemCategory {
  TOOLS = 'tools',
  ELECTRONICS = 'electronics',
  BOOKS = 'books',
  KITCHEN = 'kitchen',
  GARDEN = 'garden',
  SPORTS = 'sports',
  HOUSEHOLD = 'household',
  AUTOMOTIVE = 'automotive',
  OTHER = 'other'
}

export enum ItemCondition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor'
}

export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface SearchFilters {
  category?: ItemCategory;
  maxDistance?: number;
  condition?: ItemCondition;
  isAvailable?: boolean;
  query?: string;
}