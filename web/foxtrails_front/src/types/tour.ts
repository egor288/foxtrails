// src/types/tour.ts
export interface Tour {
  id: number;
  title: string;
  description: string;
  image: string;
  fullDescription?: string;
  price?: string;
  duration?: string;
  includes?: string[];
}

export interface TourCardProps {
  tour: Tour;
}