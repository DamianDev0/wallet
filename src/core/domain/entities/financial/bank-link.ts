export interface BankLink {
  customer_id: string;
  link_id: string;
  linked_at: string;
  institution: string;
  status: string;
}

export interface BankLinkRequest {
  link_id: string;
}

export interface BankLinkResponse {
  success: boolean;
  message: string;
  data: BankLink;
}
