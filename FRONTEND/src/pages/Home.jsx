import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center mt-32 px-6">
        <h1 className="text-4xl font-semibold mb-4">Welcome to SoundHouse</h1>
        <p className="text-gray-500 max-w-md">
          Your one-stop shop for instruments — guitars, keyboards, drums, and more.
        </p>
      </div>
    </div>
  )
}

export default Home