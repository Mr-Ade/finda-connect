import type { Database } from "./database";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  helpful_count: number;
  reply_count: number;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string;
    full_name?: string;
  };
  review_photos?: ReviewPhoto[];
  review_responses?: ReviewResponse[];
}

export interface ReviewPhoto {
  id: string;
  photo_url: string;
  caption?: string;
  created_at: string;
}

export interface ReviewResponse {
  id: string;
  response_text: string;
  created_at: string;
}

export interface ReviewVote {
  id: string;
  review_id: string;
  user_id: string;
  is_helpful: boolean;
  created_at: string;
}