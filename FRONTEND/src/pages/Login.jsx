import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'

import Navbar from '../components/Navbar'
import { loginUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginUser(email, password)
      login(data.token, data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      
      style={{ backgroundImage: "url('https://i.pinimg.com/originals/7f/ca/1a/7fca1afa667c13818684699cfa48ed33.gif')" }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <Navbar />
        <div className="flex justify-center pt-24 px-6">
          <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">
                <LogIn size={20} />
              </div>
              <h1 className="font-['Fraunces'] text-2xl">Welcome back</h1>
              <p className="text-sm text-gray-400 mt-1">Log in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white rounded-full py-2.5 text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <p className="text-sm text-center text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-black hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login