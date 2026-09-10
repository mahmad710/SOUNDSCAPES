import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'

import Navbar from '../components/Navbar'
import { registerUser } from '../api/auth'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerUser(name, email, password)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen text-black bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.pinimg.com/1200x/48/80/c0/4880c09ae4d4fbe9ddf4bb02a2e2f06c.jpg')" }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <Navbar />
        <div className="flex justify-center pt-24 px-6">
          <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">
                <UserPlus size={20} />
              </div>
              <h1 className="font-['Fraunces'] text-2xl">Create account</h1>
              <p className="text-sm text-gray-400 mt-1">Join SoundHouse today</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2.5 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />
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
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <p className="text-sm text-center text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-black hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register