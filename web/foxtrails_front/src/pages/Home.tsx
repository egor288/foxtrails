import bg from "../assets/background.png"
import { Button } from "../components/button";
import { TourList } from '../components/tourList';
import { tours } from '../data/tours';
import { useNavigate } from "react-router-dom";

function Home(){
    const scrollToBottom = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  const  navigate = useNavigate();
  const handleClick = ()=>{
    navigate ('/generation');
  }
    return (
        <>
            <div
                className="relative min-h-screen bg-cover bg-center flex items-end justify-start"
                style={{ backgroundImage: `url(${bg})` }}>
                <div className="font-['title'] text-7xl text-white m-12 py-18">
                    <h1>Экономьте</h1>
                    <h1>ваше время и нервы</h1>
                    <div className="font-['normal'] text-4xl text-white py-10">
                        <p>Мы подберем</p>
                        <p>подходящие вам туры</p>
                    </div>
                    <Button
                        onClick={handleClick}
                        className="bg-[#373e1e]  rounded-full font-['normal'] text-5xl hover:opacity-80 transition"
                    >
                        Создать тур
                    </Button>
                </div>
            </div>
            <style>
                {`
                @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(10px); }
                }
                .bounce-arrow {
                animation: bounce 1.5s infinite;
                }
            `}
            </style>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20">
                <div
                    onClick={scrollToBottom}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-white font-['normal'] text-lg hover:text-gray-300 transition">
                        Наши готовые туры
                    </span>
                    <div className="bounce-arrow">
                        <svg
                            className="w-6 h-6 text-white hover:text-gray-300 transition"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7-7-7m14-5l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
                <div className="relative min-h-screen bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${bg})` }}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 backdrop-blur"></div>
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="container mx-auto px-4">
                            <TourList tours={tours} />
                        </div>
                    </div> 
                </div>
        </>
    )
}

export default Home;