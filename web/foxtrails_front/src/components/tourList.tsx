// src/components/TourList.tsx
import { Tour } from './tour';
import type { Tour as TourType } from '../types/tour';

interface TourListProps {
  tours: TourType[];
}

export const TourList = ({ tours }: TourListProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <Tour key={tour.id} tour={tour} />
      ))}
    </div>
  );
};