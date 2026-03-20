import { useState } from 'react';
import { Button } from '../components/button';

function Generation() {
    const currentYear = new Date().getFullYear();
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [accommodation, setAccommodation] = useState<string[]>([]);
    const [company, setCompany] = useState<string>('');
    const [preferences, setPreferences] = useState<string[]>([]);
    const [dates, setDates] = useState({ day: '', month: '', year: '' });
    const [showQuantityForm, setShowQuantityForm] = useState(false);
    const [quantityType, setQuantityType] = useState<'family' | 'friends' | null>(null);
    const [familyCount, setFamilyCount] = useState(1);
    const [friendsCount, setFriendsCount] = useState(1);

    const toggleCheckbox = (value: string, state: string[], setState: (state: string[]) => void) => {
        setState(state.includes(value) ? state.filter(item => item !== value) : [...state, value]);
    };

    const handleCompanyChange = (value: string) => {
        setCompany(value);
        if (value === 'Семья (укажите количество)') {
            setQuantityType('family');
            setShowQuantityForm(true);
        } else if (value === 'Друзья (укажите количество)') {
            setQuantityType('friends');
            setShowQuantityForm(true);
        } else {
            setShowQuantityForm(false);
        }
    };

    const incrementCount = () => {
        if (quantityType === 'family') {
            setFamilyCount(prev => prev + 1);
        } else if (quantityType === 'friends') {
            setFriendsCount(prev => prev + 1);
        }
    };

    const decrementCount = () => {
        if (quantityType === 'family') {
            setFamilyCount(prev => (prev > 1 ? prev - 1 : 1));
        } else if (quantityType === 'friends') {
            setFriendsCount(prev => (prev > 1 ? prev - 1 : 1));
        }
    };

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
        const companyData = company === 'Семья (укажите количество)' 
            ? `Семья (${familyCount})`
            : company === 'Друзья (укажите количество)'
            ? `Друзья (${friendsCount})`
            : company;

        const formData = {
            accommodation,
            company: companyData,
            preferences,
            dates
        };
        console.log('Данные формы:', formData);
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#1a1f08' }}>
            {/* Волнистый фон */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7CB342" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#7CB342" stopOpacity="0.3" />
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
                    stroke="#7CB342"
                    strokeWidth="24"
                    opacity="0.4"
                />
            </svg>
            
            <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
                <div className="bg-gray-500 bg-opacity-20 backdrop-blur-md rounded-3xl p-8">
                    {/* Основной контент - горизонтальная сетка */}
                    <div className="grid grid-cols-3 gap-8">
                        {/* Левая колонка - Заголовок и способ передвижения */}
                        <div className="bg-lime-400 bg-opacity-5 rounded-2xl p-6">
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Для создания тура
                                </h1>
                                <p className="text-lg text-gray-200">заполни анкету</p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-white">Предпочтения по желанию</h2>
                                <div className="space-y-3">
                                    {['Отель/гостиница', 'Квартира/апартаменты', 'Дом'].map(option => (
                                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={accommodation.includes(option)}
                                                onChange={() => toggleCheckbox(option, accommodation, setAccommodation)}
                                                className="w-5 h-5 rounded bg-gray-500 border-gray-500 text-green-500"
                                            />
                                            <span className="text-gray-200">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Центральная колонка - Компания и даты */}
                        <div className="bg-lime-400 bg-opacity-5 rounded-2xl p-6">
                            <div className="space-y-8">
                                {/* Компания */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-white">Какая компания будет?</h2>
                                    <select
                                        value={company}
                                        onChange={(e) => handleCompanyChange(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-900"
                                    >
                                        <option value="" disabled hidden>Выберите компанию</option>
                                        <option value="Один">Один</option>
                                        <option value="Пара">Пара</option>
                                        <option value="Семья (укажите количество)">Семья (укажите количество)</option>
                                        <option value="Друзья (укажите количество)">Друзья (укажите количество)</option>
                                    </select>

                                    {/* Форма количества с плавной анимацией */}
                                    {showQuantityForm && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-4 p-4 bg-gray-600 rounded-lg">
                                            <p className="text-white text-sm mb-3 text-center">
                                                {quantityType === 'family' ? 'Количество членов семьи' : 'Количество друзей'}
                                            </p>
                                            <div className="flex items-center justify-center gap-6">
                                                <button
                                                    onClick={decrementCount}
                                                    className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-all duration-200"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    value={quantityType === 'family' ? familyCount : friendsCount}
                                                    readOnly
                                                    className="w-16 px-3 py-2 bg-gray-700 text-white text-center rounded-lg border border-gray-500 font-semibold text-lg"
                                                />
                                                <button
                                                    onClick={incrementCount}
                                                    className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-all duration-200"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Даты */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-white">В какие даты?</h2>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            placeholder="ДД"
                                            value={dates.day}
                                            onChange={(e) => handleDayChange(e.target.value)}
                                            min="1"
                                            max="31"
                                            className="w-20 px-3 py-2 bg-gray-600 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="ММ"
                                            value={dates.month}
                                            onChange={(e) => handleMonthChange(e.target.value)}
                                            min="1"
                                            max="12"
                                            className="w-20 px-3 py-2 bg-gray-600 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="ГГ"
                                            value={dates.year}
                                            onChange={(e) => handleYearChange(e.target.value)}
                                            min={currentYear}
                                            className="w-20 px-3 py-2 bg-gray-600 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка - Предпочтения */}
                        <div className="bg-lime-400 bg-opacity-5 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Предпочтения</h2>
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
                                            className="w-5 h-5 rounded bg-gray-500 border-gray-500 text-green-500"
                                        />
                                        <span className="text-gray-200 text-sm">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Отдельная кнопка в своем контейнере */}
                <div className="flex justify-end mt-6">
                    <div className="bg-gray-500 bg-opacity-20 backdrop-blur-md rounded-3xl px-8 py-4">
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105"
                        >
                            Составить тур
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Generation;