import bg from "../assets/background.png"

function Home(){
    return (
        <>
            <div
                className="h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}>
            </div>
        </>
    )
}

export default Home;