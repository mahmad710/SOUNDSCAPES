import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PianoHero from '../components/PianoHero'
import { getProducts } from '../api/products'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts).catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <PianoHero products={products} />
    </div>
  )
}

export default Home