import { Link, useNavigate } from 'react-router-dom'
import { Home, Grid3x3, ShoppingCart, LogIn, UserPlus, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="sticky top-4 z-40 px-4">
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-8 py-4 rounded-full bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <Link to="/" className="text-lg font-medium tracking-tight">
          SoundHouse
        </Link>

        <div className="flex gap-6 items-center text-gray-500">
          <Link
            to="/"
            title="Home"
            className="group relative hover:text-black transition-colors"
          >
            <Home size={20} />
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              Home
            </span>
          </Link>

          <Link
            to="/products"
            title="Menu"
            className="group relative hover:text-black transition-colors"
          >
            <Grid3x3 size={20} />
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              Menu
            </span>
          </Link>

          <Link
            to="/cart"
            title="Cart"
            className="group relative hover:text-black transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              Cart
            </span>
          </Link>

          {token ? (
            <button
              onClick={handleLogout}
              title="Logout"
              className="group relative hover:text-black transition-colors"
            >
              <LogOut size={20} />
              <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Logout
              </span>
            </button>
          ) : (
            <>
              <Link
                to="/login"
                title="Login"
                className="group relative hover:text-black transition-colors"
              >
                <LogIn size={20} />
                <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Login
                </span>
              </Link>
              <Link
                to="/register"
                title="Register"
                className="group relative hover:text-black transition-colors"
              >
                <UserPlus size={20} />
                <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Register
                </span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar