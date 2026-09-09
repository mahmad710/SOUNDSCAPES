import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md">
      <Link to="/" className="text-lg font-medium tracking-tight">SoundHouse</Link>
      <div className="flex gap-8 text-sm items-center text-gray-500">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <Link to="/products" className="hover:text-black transition-colors">Menu</Link>
        <Link to="/cart" className="hover:text-black transition-colors">Cart</Link>
        {token ? (
          <button onClick={handleLogout} className="hover:text-black transition-colors">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-black transition-colors">Login</Link>
            <Link to="/register" className="hover:text-black transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar