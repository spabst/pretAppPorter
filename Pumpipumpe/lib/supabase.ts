import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database Types (based on your existing TypeScript interfaces)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar: string | null;
          location: unknown; // PostGIS geography point
          address: string;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          avatar?: string | null;
          location: unknown;
          address: string;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          avatar?: string | null;
          location?: unknown;
          address?: string;
          phone?: string | null;
          updated_at?: string;
        };
      };
      items: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          images: string[];
          owner_id: string;
          is_available: boolean;
          condition: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          images?: string[];
          owner_id: string;
          is_available?: boolean;
          condition: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          images?: string[];
          owner_id?: string;
          is_available?: boolean;
          condition?: string;
          tags?: string[];
          updated_at?: string;
        };
      };
      borrow_requests: {
        Row: {
          id: string;
          item_id: string;
          borrower_id: string;
          owner_id: string;
          status: string;
          message: string;
          requested_date: string;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          item_id: string;
          borrower_id: string;
          owner_id: string;
          status?: string;
          message: string;
          requested_date: string;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          item_id?: string;
          borrower_id?: string;
          owner_id?: string;
          status?: string;
          message?: string;
          requested_date?: string;
          start_date?: string | null;
          end_date?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      nearby_items: {
        Args: {
          lat: number;
          lng: number;
          max_distance: number;
        };
        Returns: {
          id: string;
          title: string;
          description: string;
          category: string;
          images: string[];
          owner_id: string;
          is_available: boolean;
          condition: string;
          tags: string[];
          created_at: string;
          updated_at: string;
          distance: number;
        }[];
      };
    };
    Enums: {
      item_category: 'tools' | 'electronics' | 'books' | 'kitchen' | 'garden' | 'sports' | 'household' | 'automotive' | 'other';
      item_condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
      request_status: 'pending' | 'approved' | 'declined' | 'active' | 'completed' | 'cancelled';
    };
  };
}