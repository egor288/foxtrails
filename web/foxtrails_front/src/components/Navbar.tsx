import { Link } from "react-router-dom";


function Navbar() {
    const isLoggedIn = false
    return(
        <nav className="relative p-4 m-4 h-14 bg-gray-200 rounded-xl">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
                <Link to="/">Home</Link>
            </div>
            {!isLoggedIn && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                    <Link to="/signUp">Sign Up</Link>
                    <Link to="/signIn">Sign In</Link>
                </div>
            )}
            {isLoggedIn && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
                    <Link to="/profile">Profile</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar;