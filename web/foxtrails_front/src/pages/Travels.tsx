

type TourCard = {
  title: string;
  image: string;
};

function SavedTours() {
  const tours: TourCard[] = [
    {
      title: 'Винный тур',
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Горный маршрут',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Гастрономический тур',
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    },
  ];

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 min-h-screen flex flex-col">
        {/* Верхняя плашка */}
        <div className="w-full h-12 rounded-full bg-white/75 backdrop-blur-sm shadow-sm" />

        <div className="flex-1 flex items-center mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.4fr] gap-10 w-full items-center">
            {/* Левая колонка */}
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Ваши сохранённые туры
              </h1>

              <p className="mt-5 text-lg lg:text-xl text-white/80 max-w-lg leading-relaxed">
                Здесь собраны маршруты, которые вы уже отметили. Откройте любой тур, чтобы
                вернуться к нему позже и быстро продолжить планирование.
              </p>
            </div>

            {/* Правая часть */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.title}
                  className="relative aspect-square rounded-3xl overflow-hidden shadow-lg bg-white/20"
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4">
                    <p className="text-white text-2xl font-light leading-none">{tour.title}</p>
                  </div>
                </div>
              ))}

              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-3xl bg-white/65 shadow-lg backdrop-blur-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedTours;