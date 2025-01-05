export interface Activity {
  id: string;
  user_id: string;
  activity_type: string;
  target_id: string;
  target_name: string;
  rating?: number;
  created_at: string;
}

export interface Invoice {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  status: string;
  order_number: string;
  created_at: string;
}