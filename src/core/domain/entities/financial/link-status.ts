export interface LinkStatus {
  is_linked: boolean;
  link_id: string | null;
  linked_at: string | null;
  active: boolean;
  institution: string | null;
  status: string | null;
  access_mode: string | null;
}
