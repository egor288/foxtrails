import { useState, useEffect } from "react";
import photo_2026 from "../assets/photo_2026.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";

interface MapPoint {
    id: number;
    name: string;
    description: string;
    x: number;
    y: number;
    image?: string;
}

// Данные с API
interface APIPoint {
    id: number;
    name: string;
    description: string;
    image?: string;
}

interface TourImage {
    id: number;
    url: string;
    alt: string;
}

interface SavedTour {
    id: string;
    name: string;
    date: string;
    points: MapPoint[];
    images: TourImage[];
}

export default function TourPage() {
    const navigate = useNavigate(); // ← переместили внутрь компонента
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const [visiblePoints, setVisiblePoints] = useState<MapPoint[]>([]);
    const [images, setImages] = useState<TourImage[]>([]);
    const [loading, setLoading] = useState(true);

    const predefinedPoints: Omit<MapPoint, 'name' | 'description'>[] = [
        { id: 1, x: 25, y: 40 },
        { id: 2, x: 55, y: 35 },
        { id: 3, x: 75, y: 55 },
        { id: 4, x: 45, y: 70 },
        { id: 5, x: 80, y: 80 },
    ];

    // Загрузка изображений
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/tour-images');
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Ошибка загрузки изображений:', error);
            }
        };
        fetchImages();
    }, []);

    // Загрузка точек
    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await fetch('../shared/api/generateRoute');
                const apiData: APIPoint[] = await response.json();

                const mergedPoints: MapPoint[] = predefinedPoints
                    .map(predefined => {
                        const apiPoint = apiData.find(api => api.id === predefined.id);

                        if (apiPoint && apiPoint.name && apiPoint.description) {
                            return {
                                id: predefined.id,
                                x: predefined.x,
                                y: predefined.y,
                                name: apiPoint.name,
                                description: apiPoint.description,
                            };
                        }
                        return null;
                    })
                    .filter((point): point is MapPoint => point !== null);

                setVisiblePoints(mergedPoints);
            } catch (error) {
                console.error('Ошибка загрузки точек:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, []);

    const imageCount = images.length;

    const handleSaveTour = () => {
        const savedTours: SavedTour[] = JSON.parse(localStorage.getItem('savedTours') || '[]');
        
        const newTour: SavedTour = {
            id: Date.now().toString(),
            name: `Тур от ${new Date().toLocaleDateString()}`,
            date: new Date().toISOString(),
            points: visiblePoints,
            images: images,
        };
        
        savedTours.push(newTour);
        localStorage.setItem('savedTours', JSON.stringify(savedTours));
        
        // Переход на страницу с иконкой тура
        navigate('/travels');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${photo_2026})`, backgroundSize: 'cover' }}>
                <div className="text-white text-xl font-normal">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen text-white overflow-hidden" style={{ backgroundImage: `url(${photo_2026})`, backgroundSize: 'cover' }}>
            {/* Левая часть с точками */}
            <div className="w-1/2 p-8 flex flex-col justify-center relative">
                {/* Кнопка сохранения тура */}
                

                {visiblePoints.map((point) => (
                    <div
                        key={point.id}
                        className="absolute cursor-pointer"
                        style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                    >
                        {/* Точка */}
                        <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>

                        {/* Название точки */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 text-white text-sm px-2 py-1 rounded">
                            {point.name}
                        </div>

                        {/* Модальное окно при наведении */}
                        {hoveredPoint === point.id && (
                            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl p-4 z-20">
                                <h3 className="font-bold text-lg mb-2" style={{ color: "#2D2D2D" }}>
                                    {point.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    {point.description}
                                </p>
                            </div>
                        )}
                    </div>
                ))}

                {/* Легенда */}
                {visiblePoints.length > 0 && (
                    <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-lg p-4 absolute bottom-8 left-8 right-8">
                        <div className="flex flex-wrap gap-3">
                            {visiblePoints.map((point) => (
                                <div key={point.id} className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-white text-sm">{point.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {visiblePoints.length === 0 && (
                    <div className="text-center text-white mt-8">
                        <p>Нет доступных точек для отображения</p>
                    </div>
                )}
            </div>

            {/* Правая часть с изображениями */}
            <div className="w-1/2 p-8">
                <div className="h-full w-full">
                    <div className="grid grid-cols-2 gap-4 h-full">
                        {/* Первое изображение всегда слева на всю высоту */}
                        {images[0] && (
                            <img
                                src={images[0].url}
                                alt={images[0].alt}
                                className="rounded-2xl object-cover w-full h-full"
                            />
                        )}

                        {/* Правая колонка с двумя изображениями */}
                        <div className="grid grid-rows-2 gap-4">
                            {images[1] && (
                                <img
                                    src={images[1].url}
                                    alt={images[1].alt}
                                    className="rounded-2xl object-cover w-full h-full"
                                />
                            )}
                            {images[2] && (
                                <img
                                    src={images[2].url}
                                    alt={images[2].alt}
                                    className="rounded-2xl object-cover w-full h-full"
                                />
                            )}
                        </div>

                        {/* Нижние изображения для 4 и 5 картинок */}
                        {imageCount >= 4 && images[3] && (
                            <img
                                src={images[3].url}
                                alt={images[3].alt}
                                className="rounded-2xl object-cover w-full h-full"
                            />
                        )}
                        {imageCount >= 5 && images[4] && (
                            <img
                                src={images[4].url}
                                alt={images[4].alt}
                                className="rounded-2xl object-cover w-full h-full"
                            />
                        )}
                    </div>
                </div>
                <div className="absolute bottom-10 right-20 z-20">
                    <Button className="bg-[#89995D]" onClick={handleSaveTour}>Сохранить тур</Button>
                </div>
            </div>
        </div>
    );
}