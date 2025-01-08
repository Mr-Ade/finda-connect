export interface AdminSetting {
  id: string;
  key: string;
  value: any;
  updated_at: string | null;
  updated_by: string | null;
}

export interface AdminSettingsState {
  site_name: string;
  contact_email: string;
  support_phone: string;
  primary_color: string;
  logo_url: string;
  maintenance_mode: boolean;
  analytics_id: string;
}