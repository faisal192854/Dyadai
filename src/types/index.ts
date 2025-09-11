export interface Community {
  id: string;
  rank: number;
  name: string;
  description: string;
  imageUrl: string;
  iconUrl: string;
  members: number;
  price: number | 'Free';
  category: string;
}