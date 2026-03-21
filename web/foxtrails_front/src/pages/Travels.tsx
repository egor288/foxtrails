import { useEffect, useState } from 'react';
import { Button } from '../components/button';

type Tour = {
    id: number;
    title: string;
    description: string;
    image: string;
};

function Travels() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState('');

    // поля создания
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        setTours([]);
    }, []);

    const addTour = () => {
        if (!title.trim()) return;

        const newTour: Tour = {
            id: Date.now(),
            title,
            description,
            image: image || 'https://picsum.photos/400/200'
        };

        setTours(prev => [newTour, ...prev]);

        // очистка
        setTitle('');
        setDescription('');
        setImage('');

        // API POST сюда
    };

    const deleteTour = (id: number) => {
        setTours(prev => prev.filter(t => t.id !== id));
    };

    const moveTour = (index: number, direction: 'up' | 'down') => {
        const newTours = [...tours];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= tours.length) return;

        [newTours[index], newTours[targetIndex]] = [newTours[targetIndex], newTours[index]];
        setTours(newTours);
    };

    const startEdit = (tour: Tour) => {
        setEditingId(tour.id);
        setNewTitle(tour.title);
    };

    const saveEdit = (id: number) => {
        setTours(prev =>
            prev.map(t => (t.id === id ? { ...t, title: newTitle } : t))
        );
        setEditingId(null);
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#89995D' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
                <path d="M0,400 Q150,350 300,380 T1200,400" fill="none" stroke="#627430" strokeWidth="24" opacity="0.3"/>
                <path d="M0,750 Q300,650 600,550 T1200,250" fill="none" stroke="#6f8040" strokeWidth="24" opacity="0.3"/>
            </svg>

            <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
                <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>

                    <h1 className="text-3xl font-bold mb-6 text-center">Мои маршруты</h1>

                    {/* 🟢 ФОРМА СОЗДАНИЯ */}
                    <div className="rounded-2xl p-6 mb-8 flex flex-col gap-4"
                         style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>

                        <h2 className="text-xl font-semibold">Добавить маршрут</h2>

                        <input
                            placeholder="Название"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-4 py-2 rounded-full"
                        />

                        <textarea
                            placeholder="Описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="px-4 py-2 rounded-2xl resize-none"
                        />

                        <input
                            placeholder="Ссылка на изображение"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="px-4 py-2 rounded-full"
                        />

                        <div className="flex justify-end">
                            <Button onClick={addTour}>Добавить</Button>
                        </div>
                    </div>

                    {/* список */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tours.map((tour, index) => (
                            <div key={tour.id}
                                 className="rounded-2xl p-4 flex flex-col gap-4"
                                 style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>

                                <img src={tour.image} className="h-40 w-full object-cover rounded-xl"/>

                                {editingId === tour.id ? (
                                    <div className="flex gap-2">
                                        <input
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-full"
                                        />
                                        <Button onClick={() => saveEdit(tour.id)}>OK</Button>
                                    </div>
                                ) : (
                                    <h2 className="text-xl font-semibold">{tour.title}</h2>
                                )}

                                <p>{tour.description}</p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <Button onClick={() => startEdit(tour)}>Переименовать</Button>
                                    <Button onClick={() => deleteTour(tour.id)}>Удалить</Button>
                                    <Button onClick={() => moveTour(index, 'up')}>↑</Button>
                                    <Button onClick={() => moveTour(index, 'down')}>↓</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {tours.length === 0 && (
                        <p className="text-center mt-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>
                            Маршрутов пока нет
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Travels;