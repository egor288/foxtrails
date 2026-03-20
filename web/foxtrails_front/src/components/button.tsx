type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
}

export function Button({children, onClick}: ButtonProps){
    return(
        <button 
        onClick={onClick}
        className = "m-4 p-4 hover:bg-gray-100 rounded-full"
        >
            {children}
        </button>
    )
}