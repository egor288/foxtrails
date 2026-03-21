import { Link } from "react-router-dom";


function Navbar() {
    const isLoggedIn = true
    return (
        <nav className="bg-transperent text-lg p-4relative fixed top-0 left-0 w-full z-50 bg-transparent p-4 pt-14 text-white ">
            {!isLoggedIn && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link to="/" style={{ backgroundColor: '#373e1e' }}
                            className="font-['normal'] px-4 py-3 text-white rounded-full hover:opacity-80 transition">Главная</Link>
                    </div>
                    <Link to="/signUp" style={{ backgroundColor: '#373e1e' }}
                        className="font-['normal'] px-4 py-2 text-white rounded-full hover:opacity-80 transition">Регистрация</Link>
                    <Link to="/signIn" style={{ backgroundColor: '#373e1e' }}
                        className="font-['normal'] px-4 py-2 text-white rounded-full hover:opacity-80 transition">Вход</Link>
                </div>
            )}
            {isLoggedIn && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
                    <Link to="/" style={{ backgroundColor: '#373e1e' }}
                        className="font-['normal'] px-4 py-3 text-white rounded-full hover:opacity-80 transition">Главная</Link>
                    <Link to="/travels" style={{ backgroundColor: '#373e1e' }}
                        className="font-['normal'] px-4 py-3 text-white rounded-full hover:opacity-80 transition">Маршруты</Link>
                </div>

            )}
        </nav>
    )
}

export default Navbar;