import bg from "../assets/background.png"

function Home(){
    return (
        <>
            <div
                className="min-h-screen bg-cover bg-center flex items-end justify-start"
                style={{ backgroundImage: `url(${bg})` }}>
                <div className="font-['title'] text-7xl text-white m-12 py-18">
                    <h1>Экономьте</h1>
                    <h1>ваше время и нервы</h1>
                    <div className="font-['normal'] text-4xl text-white py-10">
                        <p>Мы подберем</p>
                        <p>подходящие вам туры</p>
                    </div>
                </div>
            </div>
            <div className="relative min-h-screen bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${bg})` }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 backdrop-blur"></div>
            </div>
        </>
    )
}

export default Home;