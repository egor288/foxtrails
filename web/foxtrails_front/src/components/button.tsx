type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
}

export function Button({children, onClick}: ButtonProps){
    return(
        <button 
        onClick={onClick}
        className="inline-flex items-center justify-center px-16 py-3 text-white font-semibold rounded-full bg-transparent border-0 transition-all duration-200 transform hover:scale-105 hover:bg-white/10 whitespace-nowrap"
        >
            {children}
        </button>
    )
}