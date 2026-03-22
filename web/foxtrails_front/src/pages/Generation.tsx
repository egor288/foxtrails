import { api } from "../shared/api";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';

const cities = [
    "Краснодар",
    "Абрау-Дюрсо",
    "Сочи",
    "Геленджик",
    "Анапа",
    "Новороссийск",
    "Тамань",
    "Красная Поляна",
    "Мезмай",
    "Гуамка",
    "Лаго-Наки"
];

function Generation() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [accommodation, setAccommodation] = useState<string[]>([]);
    const [preferences, setPreferences] = useState<string[]>([]);
    const [dates, setDates] = useState({ day: '', month: '', year: '' });
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [selectedCity, setSelectedCity] = useState<string>("");

    const toggleCheckbox = (value: string, state: string[], setState: (state: string[]) => void) => {
        setState(state.includes(value) ? state.filter(item => item !== value) : [...state, value]);
    };

    const incrementAdults = () => setAdultsCount(prev => prev + 1);
    const decrementAdults = () => setAdultsCount(prev => (prev > 1 ? prev - 1 : 1));
    const incrementChildren = () => setChildrenCount(prev => prev + 1);
    const decrementChildren = () => setChildrenCount(prev => (prev > 0 ? prev - 1 : 0));

    const handleDayChange = (value: string) => {
        const numValue = parseInt(value) || 0;
        const monthNum = parseInt(dates.month) || 0;
        const maxDays = monthNum > 0 && monthNum <= 12 ? daysInMonth[monthNum - 1] : 31;
        if (numValue < 0 || (value && numValue > maxDays)) return;
        setDates({ ...dates, day: value });
    };

    const handleMonthChange = (value: string) => {
        const numValue = parseInt(value) || 0;
        if (numValue < 0 || numValue > 12) return;
        setDates({ ...dates, month: value });
    };

    const handleYearChange = (value: string) => {
        const numValue = parseInt(value) || 0;
        if (numValue < 0 || (value && numValue < currentYear)) return;
        setDates({ ...dates, year: value });
    };

    const handleSubmit = async () => {
        try {
            const formData = {
                city: selectedCity,
                accommodation,
                company: {
                    adults: adultsCount,
                    children: childrenCount,
                },
                preferences,
                dates,
            };

            console.log("FORM DATA:", formData);

            // 🔥 теперь через api
            const data = await api.generateRoute(formData);

            console.log("RESPONSE:", data);

            navigate("/TourDetails", {
                state: {
                    route: data.places,
                    formData,
                },
            });

        } catch (err) {
            console.error("ERROR:", err);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#89995D' }}>
            {/* Волнистый фон */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#627430" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#627430" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,400 Q150,350 300,380 T600,390 T900,380 T1200,400"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="24"
                    opacity="0.5"
                />
                <path
                    d="M0,750 Q300,650 600,550 T1200,250"
                    fill="none"
                    stroke="#6f8040"
                    strokeWidth="24"
                    opacity="0.4"
                />
            </svg>

            <div className="max-w-6xl mx-auto px-6 min-h-screen flex flex-col justify-center relative z-10 opacity-60">
                <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
                    {/* Основной контент - горизонтальная сетка */}
                    <div className="grid grid-cols-3 gap-8">
                        {/* Левая колонка - Заголовок, выбор города и условия проживания */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-normal mb-2" style={{ color: '#2D2D2D' }}>
                                    Для создания тура
                                </h1>
                                <p className="text-lg font-normal" style={{ color: '#4A4A4A' }}>заполни анкету</p>
                            </div>

                            {/* Выбор города */}
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold font-normal mb-2" style={{ color: '#2D2D2D' }}>Город</h2>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full px-4 py-2 rounded-full bg-white/80 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#627430] font-normal"
                                >
                                    <option value="">Любой город</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold font-normal" style={{ color: '#2D2D2D' }}>Условия проживания</h2>
                                <div className="space-y-3">
                                    {['Отель/гостиница', 'Квартира/апартаменты', 'Дом'].map(option => (
                                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={accommodation.includes(option)}
                                                onChange={() => toggleCheckbox(option, accommodation, setAccommodation)}
                                                className="relative w-5 h-5 appearance-none rounded-md border-2 checked:border-white 
                        focus:outline-none focus:ring-2 focus:ring-offset-0 after:content-[''] after:absolute after:left-1/2 
                        after:top-1/2 after:w-2 after:h-1 after:border-b-2 after:border-r-2 after:transform after:-translate-x-1/2 
                        after:-translate-y-1/2 after:rotate-45 after:opacity-0 checked:after:opacity-100 after:pointer-events-none"
                                                style={{
                                                    backgroundColor: '#FFFFFF',
                                                    borderColor: '#FFFFFF'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (accommodation.includes(option)) {
                                                        (e.target as HTMLInputElement).style.backgroundColor = '#FFFFFF';
                                                        (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px #627430 inset';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                                                }}
                                            />
                                            <style>{`
                        input[type="checkbox"]:checked::after {
                          border-color: #627430;
                        }
                      `}</style>
                                            <span className="font-normal text-base" style={{ color: '#2D2D2D' }}>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Центральная колонка - Компания и даты */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-normal" style={{ color: '#2D2D2D' }}>Какая компания будет?</h2>
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-1 p-4 rounded-lg" style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-base leading-tight font-normal" style={{ color: '#2D2D2D' }}>Взрослые</p>
                                                    <p className="text-sm leading-tight font-normal" style={{ color: '#4A4A4A' }}>12 лет и старше</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={decrementAdults} disabled={adultsCount <= 1}
                                                        className={`w-10 h-10 rounded-full font-normal text-xl leading-none transition-all duration-200 ${adultsCount <= 1 ? 'cursor-not-allowed' : 'hover:opacity-80'}`}
                                                        style={{ backgroundColor: adultsCount <= 1 ? 'rgba(39, 46, 19, 0.2)' : 'rgba(39, 46, 19, 0.6)', color: adultsCount <= 1 ? '#4A4A4A' : '#FFFFFF' }}>
                                                        −
                                                    </button>
                                                    <div className="min-w-[2rem] text-center text-lg font-normal" style={{ color: '#2D2D2D' }}>{adultsCount}</div>
                                                    <button onClick={incrementAdults}
                                                        className="w-10 h-10 rounded-full font-normal text-xl leading-none transition-all duration-200 hover:opacity-80"
                                                        style={{ backgroundColor: 'rgba(39, 46, 19, 0.6)', color: '#FFFFFF' }}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-base leading-tight font-normal" style={{ color: '#2D2D2D' }}>Дети</p>
                                                    <p className="text-sm leading-tight font-normal" style={{ color: '#4A4A4A' }}>от 2 до 11 лет</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={decrementChildren} disabled={childrenCount <= 0}
                                                        className={`w-10 h-10 rounded-full text-xl leading-none transition-all duration-200 font-normal ${childrenCount <= 0 ? 'cursor-not-allowed' : 'hover:opacity-80'}`}
                                                        style={{ backgroundColor: childrenCount <= 0 ? 'rgba(39, 46, 19, 0.2)' : 'rgba(39, 46, 19, 0.6)', color: childrenCount <= 0 ? '#4A4A4A' : '#FFFFFF' }}>
                                                        −
                                                    </button>
                                                    <div className="min-w-[2rem] text-center text-lg font-normal" style={{ color: '#2D2D2D' }}>{childrenCount}</div>
                                                    <button onClick={incrementChildren}
                                                        className="w-10 h-10 rounded-full text-xl leading-none transition-all duration-200 hover:opacity-80 font-normal"
                                                        style={{ backgroundColor: 'rgba(39, 46, 19, 0.6)', color: '#FFFFFF' }}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-normal" style={{ color: '#2D2D2D' }}>В какие даты?</h2>
                                    <div className="flex gap-4 font-normal">
                                        <input type="number" placeholder="ДД" value={dates.day} onChange={(e) => handleDayChange(e.target.value)} min="1" max="31"
                                            className="w-20 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 font-normal"
                                            style={{ backgroundColor: 'rgba(39, 46, 19, 0.6)', color: '#FFFFFF', borderWidth: '2px', borderColor: 'rgba(39, 46, 19, 0.6)' }}
                                            onFocus={(e) => { e.target.style.borderColor = '#627430'; e.target.style.boxShadow = '0 0 0 2px rgba(39, 46, 19, 0.3)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(39, 46, 19, 0.6)'; e.target.style.boxShadow = 'none'; }} />
                                        <input type="number" placeholder="ММ" value={dates.month} onChange={(e) => handleMonthChange(e.target.value)} min="1" max="12"
                                            className="w-20 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 font-normal"
                                            style={{ backgroundColor: 'rgba(39, 46, 19, 0.6)', color: '#FFFFFF', borderWidth: '2px', borderColor: 'rgba(39, 46, 19, 0.6)' }}
                                            onFocus={(e) => { e.target.style.borderColor = '#627430'; e.target.style.boxShadow = '0 0 0 2px rgba(39, 46, 19, 0.3)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(39, 46, 19, 0.6)'; e.target.style.boxShadow = 'none'; }} />
                                        <input type="number" placeholder="ГГ" value={dates.year} onChange={(e) => handleYearChange(e.target.value)} min={currentYear}
                                            className="w-20 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 font-normal"
                                            style={{ backgroundColor: 'rgba(39, 46, 19, 0.6)', color: '#FFFFFF', borderWidth: '2px', borderColor: 'rgba(39, 46, 19, 0.6)' }}
                                            onFocus={(e) => { e.target.style.borderColor = '#627430'; e.target.style.boxShadow = '0 0 0 2px rgba(39, 46, 19, 0.3)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(39, 46, 19, 0.6)'; e.target.style.boxShadow = 'none'; }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка - Предпочтения */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>
                            <h2 className="text-xl font-normal mb-4" style={{ color: '#2D2D2D' }}>Предпочтения</h2>
                            <div className="space-y-3 font-normal">
                                {[
                                    'Винодельни/винные туры',
                                    'Горы',
                                    'Гастрономия',
                                    'Культурные мероприятия',
                                    'Морские прогулки',
                                    'Пешие тропы',
                                    'Фермы/ремесленные мастерские'
                                ].map(option => (
                                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" checked={preferences.includes(option)} onChange={() => toggleCheckbox(option, preferences, setPreferences)}
                                            className="relative w-5 h-5 appearance-none rounded-md border-2 checked:border-white focus:outline-none focus:ring-2 focus:ring-offset-0 after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:w-2 after:h-1 after:border-b-2 after:border-r-2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:opacity-0 checked:after:opacity-100 after:pointer-events-none"
                                            style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }}
                                            onMouseEnter={(e) => { if (preferences.includes(option)) { (e.target as HTMLInputElement).style.backgroundColor = '#FFFFFF'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px #627430 inset'; } }}
                                            onMouseLeave={(e) => { (e.target as HTMLInputElement).style.boxShadow = 'none'; }} />
                                        <style>{`input[type="checkbox"]:checked::after { border-color: #627430; }`}</style>
                                        <span className="text-base font-normal" style={{ color: '#2D2D2D' }}>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Кнопка "Составить тур" */}
                <div className="flex justify-end mt-6">
                    <div className="rounded-full px-8 py-4" style={{ backgroundColor: 'rgba(39, 46, 19, 0.2)' }}>
                        <Button onClick={handleSubmit} className="text-2xl ">Составить тур</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Generation;