// src/components/Tour.tsx
import { Link } from 'react-router-dom';
import type { TourCardProps } from '../types/tour';

export const Tour = ({ tour }: TourCardProps) => {
  return (
    <Link 
      to={`/tour/${tour.id}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg block"
    >
      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Hover-эффект с описанием */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-bold mb-2">{tour.title}</h3>
        <p className="text-white/90 mb-3">{tour.fullDescription}</p>
        <button className="mt-4 bg-[#373e1e] text-white px-4 py-2 rounded-full w-fit hover:bg-[#4a5a2a] transition">
          Подробнее
        </button>
      </div>
      
      {/* Заголовок - исчезает при наведении на карточку */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h2 className="text-white text-2xl font-title">{tour.title}</h2>
      </div>
    </Link>
  );
};