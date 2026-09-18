import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ArtistBanner from '../components/ArtistBanner'
import { getProducts } from '../api/products'

const STORIES = [
  {
    sku: 'GTR-FEN-PLYRSTRAT-001',
    musician: 'Jimi Hendrix',
    era: '1960s',
    genre: 'Rock',
    song: 'Purple Haze',
    accent: '#B33A3A',
    bgTint: '#000000',
    imageUrl: 'https://storage.googleapis.com/stateless-blog-g4m-co-uk/2023/06/Jimi-Hendrix-performing-in-Helsinki-Finland-in-1967-with-a-Fender-Black-Strat.jpg',
    blurb:
      "The Fender Stratocaster became rock's defining electric guitar after Jimi Hendrix reshaped what the instrument could do — restringing a right-handed model to play left-handed, and pushing its tone into territory no one had heard before.",
  },
  {
    sku: 'GTR-GIB-LP50S-001',
    musician: 'Slash',
    era: '1980s–90s',
    genre: 'Hard Rock',
    song: "Sweet Child O' Mine",
    accent: '#9C6B30',
    bgTint: '#000000',
    imageUrl: 'https://i.pinimg.com/1200x/4c/cd/3d/4ccd3d50a424fcd1134c57771ca04220.jpg',
    blurb:
      "Slash made the Gibson Les Paul the sound of Guns N' Roses, favoring a replica of the classic 1959 model for its thick, singing tone — reviving interest in the Les Paul for a new generation of players.",
  },
  {
    sku: 'AMP-BOSS-DS1-001',
    musician: 'Kurt Cobain',
    era: '1990s',
    genre: 'Grunge',
    song: 'Smells Like Teen Spirit',
    accent: '#3A6B8A',
    bgTint: '#000000',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPLKkWRDjBC2cfK0kYKBVydRI4FUvu4-yuIORxOIZ3g&s=10',
    blurb:
      "Kurt Cobain ran his guitar through a Boss DS-1 on Nirvana's early records, including Nevermind — the pedal's raw, compressed crunch became a key part of grunge's signature sound.",
  },
  {
    sku: 'DRM-ZIL-ACUSTOM14-001',
    musician: 'Buddy Rich',
    era: '1940s–80s',
    genre: 'Big Band / Jazz',
    song: 'West Side Story Medley',
    accent: '#4A7A4E',
    bgTint: '#000000',
    imageUrl: 'https://static.wixstatic.com/media/9512a5_995810251c6f4cf697a4561f4bd9f5b5~mv2.jpg/v1/fill/w_568,h_452,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9512a5_995810251c6f4cf697a4561f4bd9f5b5~mv2.jpg',
    blurb:
      'Buddy Rich endorsed Zildjian cymbals for decades, relying on their crash, ride, and hi-hat sound through a career that helped define big-band and jazz drumming.',
  },
]

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts).catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="pt-32 pb-16 px-6">
        <h1 className="font-['Fraunces'] text-4xl md:text-6xl max-w-2xl mx-auto text-center">
          Every instrument has a story.
        </h1>
        <p className="text-gray-400 mt-4 text-center">
          Four players who changed how their instrument sounds.
        </p>
      </div>

      {STORIES.slice(0, 2).map((story, i) => (
        <ArtistBanner
          key={story.sku}
          musician={story.musician}
          blurb={story.blurb}
          imageUrl={story.imageUrl}
          era={story.era}
          genre={story.genre}
          song={story.song}
          accent={story.accent}
          bgTint={story.bgTint}
          product={products.find((p) => p.sku === story.sku)}
          reverse={i % 2 === 1}
        />
      ))}

      <div className="bg-black text-white text-center py-24 px-6">
        <p className="font-['Fraunces'] text-2xl md:text-3xl max-w-xl mx-auto leading-relaxed">
          Every one of these instruments is sitting in our catalog right now —
          not behind glass, but ready to play.
        </p>
      </div>

      {STORIES.slice(2).map((story, i) => (
        <ArtistBanner
          key={story.sku}
          musician={story.musician}
          blurb={story.blurb}
          imageUrl={story.imageUrl}
          era={story.era}
          genre={story.genre}
          song={story.song}
          accent={story.accent}
          bgTint={story.bgTint}
          product={products.find((p) => p.sku === story.sku)}
          reverse={i % 2 === 0}
        />
      ))}
    </div>
  )
}

export default Home