type ButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export const Button = ({ children, className, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-full transition-all ${className ?? ""}`}
    >
      {children}
    </button>
  )
}