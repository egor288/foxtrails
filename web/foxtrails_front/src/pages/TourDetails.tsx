import { useState } from "react";
import photo_2026 from "../assets/photo_2026.jpg"

const steps = [
    {
        title: "Экскурсия по винодельне «Усадьба Маркотх»",
        description: "Дегустация вин, прогулка по виноградникам и экскурсия по производству.",
    },
    {
        title: "Ужин в рыбном ресторане «Rony Oyster»",
        description: "Свежие морепродукты и авторская кухня на побережье.",
    },
    {
        title: "Пеший поход к дольменам и водопадам реки Жане",
        description: "Живописный маршрут с природными достопримечательностями.",
    },
    {
        title: "Экскурсия по винодельне «Долина Лефкадия»",
        description: "Премиальные вина и современное производство.",
    },
    {
        title: "Ужин в ресторане «Пастораль» при винодельне",
        description: "Гастрономический ужин с локальными продуктами.",
    },
];

export default function TourPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-[#4b5335] text-white p-20 overflow-hidden "
            style={{ background: `url(${photo_2026})` }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* LEFT SIDE */}
                <div className="relative mb-10">

                    <div className="space-y-20 pl-20">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {/* dot */}
                                <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-white" />

                                {/* card */}
                                <div className="bg-[#5a6440] px-5 py-3 rounded-xl inline-block max-w-md cursor-pointer">
                                    <p className="text-sm leading-snug">{step.title}</p>
                                </div>

                                {/* transparent tooltip */}
                                {activeIndex === index && (
                                    <div className="absolute left-0 top-full mt-3 w-72 bg-white/70 backdrop-blur-md text-black p-4 rounded-xl shadow-lg z-10 border border-white/30">
                                        <p className="text-sm font-medium mb-2">{step.title}</p>
                                        <p className="text-xs opacity-80">{step.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="https://source.unsplash.com/600x800/?mountains,vineyard"
                        className="rounded-2xl object-cover w-full h-full"
                    />

                    <div className="grid grid-rows-2 gap-4">
                        <img
                            src="https://source.unsplash.com/600x400/?restaurant,interior"
                            className="rounded-2xl object-cover w-full h-full"
                        />
                        <img
                            src="https://source.unsplash.com/600x400/?waterfall,nature"
                            className="rounded-2xl object-cover w-full h-full"
                        />
                    </div>

                    <img
                        src="https://source.unsplash.com/600x400/?winery,night"
                        className="rounded-2xl object-cover w-full h-full"
                    />

                    <img
                        src="https://source.unsplash.com/600x400/?vineyard,aerial"
                        className="rounded-2xl object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
