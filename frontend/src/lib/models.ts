export type PostType = 'offer' | 'request';
export type PostStatus = 'open' | 'closed';

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export interface Skill {
  name: string;
  level?: number;
  verified: boolean;
  endorsements: string[]; // userIds que apoyaron la skill
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  location?: GeoPoint | null;
  skills: Skill[];
  reputation?: number; // agregado por backend
}

export interface Review {
  _id?: string;
  reviewer: {
    _id: string;
    first_name: string;
    last_name: string;
    // opcionalmente username o email
  };  // userId
  reviewee: string;  // userId
  post?: string;     // postId (opcional)
  rating: number;    // 1..5
  comment?: string;
  createdAt?: string;
}

export interface Post {
  _id: string;
  user: string;
  type: PostType;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  location?: GeoPoint | null;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}
