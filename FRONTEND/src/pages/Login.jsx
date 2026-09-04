import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import Navbar from '../components/Navbar'
import { loginUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()
    
    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            const data = await loginUser(email, password)
            login(data.token)
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <div className="max-w-sm mx-auto mt-16 p-6 border border-gray-200 rounded-lg">
                <h1 className="text-xl font-semibold mb-6">Log In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="bg-black text-white rounded-md py-2 text-sm hover:bg-gray-800 transition-colors"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login