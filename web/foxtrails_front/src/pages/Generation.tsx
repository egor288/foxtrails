import { useState } from 'react';
import { Button } from '../components/button';

function Generation() {
    const currentYear = new Date().getFullYear();
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [accommodation, setAccommodation] = useState<string[]>([]);
    const [preferences, setPreferences] = useState<string[]>([]);
    const [dates, setDates] = useState({ day: '', month: '', year: '' });
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);

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
        
        if (numValue < 0 || (value && numValue > maxDays)) {
            return;
        }
        setDates({ ...dates, day: value });
    };

    const handleMonthChange = (value: string) => {
        const numValue = parseInt(value) || 0;
        if (numValue < 0 || numValue > 12) {
            return;
        }
        setDates({ ...dates, month: value });
    };

    const handleYearChange = (value: string) => {
        const numValue = parseInt(value) || 0;
        if (numValue < 0 || (value && numValue < currentYear)) {
            return;
        }
        setDates({ ...dates, year: value });
    };

    const handleSubmit = () => {
        const companyData = `Взрослые: ${adultsCount}, Дети: ${childrenCount}`;

        const formData = {
            accommodation,
            company: companyData,
            preferences,
            dates
        };
        console.log('Данные формы:', formData);
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#4E543A' }}>
            {/* Волнистый фон */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#758B39" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#758B39" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                
                {/* Волна 1 - горизонтальная размашистая волна в центре */}
                <path
                    d="M0,400 Q150,350 300,380 T600,390 T900,380 T1200,400"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="24"
                    opacity="0.5"
                />
                
                {/* Волна 2 - косая размашистая линия под 25 градусов, соприкасается позже */}
                <path
                    d="M0,750 Q300,650 600,550 T1200,250"
                    fill="none"
                    stroke="#758B39"
                    strokeWidth="24"
                    opacity="0.4"
                />
            </svg>
            
            <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
                <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(184, 184, 184, 0.5)' }}>
                    {/* Основной контент - горизонтальная сетка */}
                    <div className="grid grid-cols-3 gap-8">
                        {/* Левая колонка - Заголовок и способ передвижения */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(169, 169, 169, 0.5)' }}>
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D2D' }}>
                                    Для создания тура
                                </h1>
                                <p className="text-lg" style={{ color: '#4A4A4A' }}>заполни анкету</p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold" style={{ color: '#2D2D2D' }}>Предпочтения по желанию</h2>
                                <div className="space-y-3">
                                    {['Отель/гостиница', 'Квартира/апартаменты', 'Дом'].map(option => (
                                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={accommodation.includes(option)}
                                                onChange={() => toggleCheckbox(option, accommodation, setAccommodation)}
                                                className="relative w-5 h-5 appearance-none rounded-md border-2 checked:border-white focus:outline-none focus:ring-2 focus:ring-offset-0 after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:w-2 after:h-1 after:border-b-2 after:border-r-2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:opacity-0 checked:after:opacity-100 after:pointer-events-none"
                                                style={{
                                                    backgroundColor: '#FFFFFF',
                                                    borderColor: '#FFFFFF'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (accommodation.includes(option)) {
                                                        (e.target as HTMLInputElement).style.backgroundColor = '#FFFFFF';
                                                        (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px #22C55E inset';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                                                }}
                                            />
                                            <style>{`
                                                input[type="checkbox"]:checked::after {
                                                    border-color: #22C55E;
                                                }
                                            `}</style>
                                            <span style={{ color: '#2D2D2D' }}>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Центральная колонка - Компания и даты */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(169, 169, 169, 0.5)' }}>
                            <div className="space-y-8">
                                {/* Компания */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold" style={{ color: '#2D2D2D' }}>Какая компания будет?</h2>
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-1 p-4 rounded-lg" style={{ backgroundColor: 'rgba(154, 154, 154, 0.5)' }}>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-base leading-tight" style={{ color: '#2D2D2D' }}>Взрослые</p>
                                                    <p className="text-sm leading-tight" style={{ color: '#5A5A5A' }}>12 лет и старше</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={decrementAdults}
                                                        disabled={adultsCount <= 1}
                                                        className={`w-10 h-10 rounded-full font-bold text-xl leading-none transition-all duration-200 ${
                                                            adultsCount <= 1
                                                                ? 'cursor-not-allowed'
                                                                : 'hover:opacity-80'
                                                        }`}
                                                        style={{
                                                            backgroundColor: adultsCount <= 1 ? '#858585' : '#808080',
                                                            color: adultsCount <= 1 ? '#7A7A7A' : '#2D2D2D'
                                                        }}
                                                        aria-label="Уменьшить количество взрослых"
                                                    >
                                                        −
                                                    </button>

                                                    <div className="min-w-[2rem] text-center text-lg font-semibold" style={{ color: '#2D2D2D' }}>
                                                        {adultsCount}
                                                    </div>

                                                    <button
                                                        onClick={incrementAdults}
                                                        className="w-10 h-10 rounded-full font-bold text-xl leading-none transition-all duration-200 hover:opacity-80"
                                                        style={{ backgroundColor: '#B5B5B5', color: '#2D2D2D' }}
                                                        aria-label="Увеличить количество взрослых"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-base leading-tight" style={{ color: '#2D2D2D' }}>Дети</p>
                                                    <p className="text-sm leading-tight" style={{ color: '#5A5A5A' }}>от 2 до 11 лет</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={decrementChildren}
                                                        disabled={childrenCount <= 0}
                                                        className={`w-10 h-10 rounded-full font-bold text-xl leading-none transition-all duration-200 ${
                                                            childrenCount <= 0
                                                                ? 'cursor-not-allowed'
                                                                : 'hover:opacity-80'
                                                        }`}
                                                        style={{
                                                            backgroundColor: childrenCount <= 0 ? '#858585' : '#808080',
                                                            color: childrenCount <= 0 ? '#7A7A7A' : '#2D2D2D'
                                                        }}
                                                        aria-label="Уменьшить количество детей"
                                                    >
                                                        −
                                                    </button>

                                                    <div className="min-w-[2rem] text-center text-lg font-semibold" style={{ color: '#2D2D2D' }}>
                                                        {childrenCount}
                                                    </div>

                                                    <button
                                                        onClick={incrementChildren}
                                                        className="w-10 h-10 rounded-full font-bold text-xl leading-none transition-all duration-200 hover:opacity-80"
                                                        style={{ backgroundColor: '#B5B5B5', color: '#2D2D2D' }}
                                                        aria-label="Увеличить количество детей"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Даты */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold" style={{ color: '#2D2D2D' }}>В какие даты?</h2>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            placeholder="ДД"
                                            value={dates.day}
                                            onChange={(e) => handleDayChange(e.target.value)}
                                            min="1"
                                            max="31"
                                            className="w-20 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                                            style={{
                                                backgroundColor: '#B5B5B5',
                                                color: '#2D2D2D',
                                                borderWidth: '2px',
                                                borderColor: '#9A9A9A'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#808080';
                                                e.target.style.boxShadow = '0 0 0 2px rgba(179, 179, 179, 0.3)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#9A9A9A';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        <input
                                            type="number"
                                            placeholder="ММ"
                                            value={dates.month}
                                            onChange={(e) => handleMonthChange(e.target.value)}
                                            min="1"
                                            max="12"
                                            className="w-20 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                                            style={{
                                                backgroundColor: '#B5B5B5',
                                                color: '#2D2D2D',
                                                borderWidth: '2px',
                                                borderColor: '#9A9A9A'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#808080';
                                                e.target.style.boxShadow = '0 0 0 2px rgba(179, 179, 179, 0.3)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#9A9A9A';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        <input
                                            type="number"
                                            placeholder="ГГ"
                                            value={dates.year}
                                            onChange={(e) => handleYearChange(e.target.value)}
                                            min={currentYear}
                                            className="w-20 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                                            style={{
                                                backgroundColor: '#B5B5B5',
                                                color: '#2D2D2D',
                                                borderWidth: '2px',
                                                borderColor: '#9A9A9A'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#808080';
                                                e.target.style.boxShadow = '0 0 0 2px rgba(179, 179, 179, 0.3)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#9A9A9A';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка - Предпочтения */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(169, 169, 169, 0.5)' }}>
                            <h2 className="text-lg font-semibold mb-4" style={{ color: '#2D2D2D' }}>Предпочтения</h2>
                            <div className="space-y-3">
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
                                        <input
                                            type="checkbox"
                                            checked={preferences.includes(option)}
                                            onChange={() => toggleCheckbox(option, preferences, setPreferences)}
                                            className="relative w-5 h-5 appearance-none rounded-md border-2 checked:border-white focus:outline-none focus:ring-2 focus:ring-offset-0 after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:w-2 after:h-1 after:border-b-2 after:border-r-2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:opacity-0 checked:after:opacity-100 after:pointer-events-none"
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                borderColor: '#FFFFFF'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (preferences.includes(option)) {
                                                    (e.target as HTMLInputElement).style.backgroundColor = '#FFFFFF';
                                                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 2px #22C55E inset';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.target as HTMLInputElement).style.boxShadow = 'none';
                                            }}
                                        />
                                        <style>{`
                                            input[type="checkbox"]:checked::after {
                                                border-color: #22C55E;
                                            }
                                        `}</style>
                                        <span className="text-sm" style={{ color: '#2D2D2D' }}>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Отдельная кнопка в своем контейнере */}
                <div className="flex justify-end mt-6">
                    <div className="rounded-full px-8 py-4" style={{ backgroundColor: 'rgba(184, 184, 184, 0.5)' }}>
                        <Button onClick={handleSubmit}>Составить тур</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Generation;