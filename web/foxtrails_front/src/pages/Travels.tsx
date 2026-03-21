import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TourList } from '../components/tourList';
import type { Tour as TourType } from '../types/tour';
import { Button } from '../components/button';

function Travels() {
    const location = useLocation();
    const navigate = useNavigate();

    const generatedTour = location.state as TourType | null;
    const [savedTours, setSavedTours] = useState<TourType[]>([]);

    const saveTour = () => {
        if (!generatedTour) return;

        setSavedTours(prev => [generatedTour, ...prev]);
        navigate('/travels', { replace: true });
    };

    const rejectTour = () => {
        navigate('/travels', { replace: true });
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#89995D' }}>
            
            {/* Декоративный фон */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f5d28" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#4f5d28" stopOpacity="0.25" />
                    </linearGradient>
                </defs>

                <path
                    d="M0,100 C180,20 260,130 420,130 C580,130 700,40 920,80 C1060,105 1120,150 1200,130"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="6"
                    opacity="0.9"
                />
                <path
                    d="M20,0 C70,120 90,290 180,390 C280,500 420,560 560,610 C760,680 900,690 1200,760"
                    fill="none"
                    stroke="#3f4a21"
                    strokeWidth="3"
                    opacity="0.65"
                />
                <path
                    d="M0,640 C240,520 360,450 520,430 C720,405 940,430 1200,360"
                    fill="none"
                    stroke="#3f4a21"
                    strokeWidth="3"
                    opacity="0.65"
                />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold text-white mb-10">
                    Ваши маршруты
                </h1>

                {/* ПРЕДПРОСМОТР СГЕНЕРЕННОГО ТУРА */}
                {generatedTour && (
                    <div className="mb-10 p-6 rounded-3xl bg-white/70 backdrop-blur-md max-w-xl">
                        
                        <h2 className="text-2xl font-bold mb-4">
                            Новый сгенерированный маршрут
                        </h2>

                        <img
                            src={generatedTour.image}
                            className="rounded-xl h-64 w-full object-cover mb-4"
                        />

                        <h3 className="text-xl font-semibold mb-2">
                            {generatedTour.title}
                        </h3>

                        <p className="text-gray-700 mb-4">
                            {generatedTour.fullDescription}
                        </p>

                        <div className="flex gap-3">
                            <Button onClick={saveTour}>
                                Сохранить
                            </Button>
                            <Button onClick={rejectTour}>
                                Не сохранять
                            </Button>
                        </div>
                    </div>
                )}

                {/* СОХРАНЕННЫЕ ТУРЫ */}
                <TourList tours={savedTours} />

                {savedTours.length === 0 && !generatedTour && (
                    <p className="text-white mt-6">
                        У тебя пока нет сохранённых маршрутов
                    </p>
                )}
            </div>
        </div>
    );
}

export default Travels;