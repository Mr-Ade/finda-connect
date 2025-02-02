import type { Database } from "./database";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type Review = Tables<'reviews'>;
export type ReviewPhoto = Tables<'review_photos'>;
export type ReviewResponse = Tables<'review_responses'>;
export type ReviewVote = Tables<'review_votes'>;