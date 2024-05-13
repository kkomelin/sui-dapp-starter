import Logo from '../assets/logo.svg'

const Header = () => {
  return (
    <header className="flex flex-col items-center gap-3">
      <img src={Logo} alt="Logo" className="h-16 w-16" />
      <div className="text-2xl sm:text-3xl">
        {import.meta.env.VITE_APP_NAME}
      </div>
    </header>
  )
}
export default Header
