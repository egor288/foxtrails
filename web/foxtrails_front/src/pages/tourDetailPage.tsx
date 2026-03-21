// src/pages/TourDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { tours } from '../data/tours';

export const TourDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const tour = tours.find(t => t.id === Number(id));

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Тур не найден</h1>
          <button 
            onClick={() => navigate('/tours')}
            className="bg-[#373e1e] text-white px-6 py-2 rounded-full"
          >
            Вернуться к турам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => navigate('/tours')}
          className="mb-6 text-[#373e1e] hover:underline"
        >
          ← Назад к турам
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src={tour.image} 
            alt={tour.title}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{tour.description}</p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">О туре</h2>
              <p className="text-gray-700">{tour.fullDescription}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Длительность</h3>
                <p className="text-gray-600">{tour.duration}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Стоимость</h3>
                <p className="text-3xl font-bold text-[#373e1e]">{tour.price}</p>
              </div>
            </div>
            
            {tour.includes && (
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-3">Включено в стоимость:</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button className="w-full bg-[#373e1e] text-white py-3 rounded-full hover:bg-[#4a5a2a] transition text-lg font-semibold">
              Забронировать тур
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};