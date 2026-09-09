import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const WHITE_KEYS = [
  { note: 'C4' }, { note: 'D4' }, { note: 'E4' }, { note: 'F4' },
  { note: 'G4' }, { note: 'A4' }, { note: 'B4' }, { note: 'C5' },
]

const BLACK_KEYS = [
  { note: 'C#4', afterIndex: 0 },
  { note: 'D#4', afterIndex: 1 },
  { note: 'F#4', afterIndex: 3 },
  { note: 'G#4', afterIndex: 4 },
  { note: 'A#4', afterIndex: 5 },
]

const STORIES = {
  C4: {
    sku: 'GTR-FEN-PLYRSTRAT-001',
    musician: 'Jimi Hendrix',
    blurb:
      "The Fender Stratocaster became rock's defining electric guitar after Jimi Hendrix reshaped what the instrument could do — restringing a right-handed model to play left-handed, and pushing its tone into territory no one had heard before.",
  },
  E4: {
    sku: 'GTR-GIB-LP50S-001',
    musician: 'Slash',
    blurb:
      "Slash made the Gibson Les Paul the sound of Guns N' Roses, favoring a replica of the classic 1959 model for its thick, singing tone — reviving interest in the Les Paul for a new generation of players.",
  },
  G4: {
    sku: 'AMP-BOSS-DS1-001',
    musician: 'Kurt Cobain',
    blurb:
      "Kurt Cobain ran his guitar through a Boss DS-1 on Nirvana's early records, including Nevermind — the pedal's raw, compressed crunch became a key part of grunge's signature sound.",
  },
  C5: {
    sku: 'DRM-ZIL-ACUSTOM14-001',
    musician: 'Buddy Rich',
    blurb:
      "Buddy Rich endorsed Zildjian cymbals for decades, relying on their crash, ride, and hi-hat sound through a career that helped define big-band and jazz drumming.",
  },
}

function PianoHero({ products }) {
  const [activeNote, setActiveNote] = useState(null)
  const [openStoryNote, setOpenStoryNote] = useState(null)

  function handleKeyPress(note) {
    setActiveNote(note)
    setTimeout(() => setActiveNote(null), 150)

    if (STORIES[note]) {
      setOpenStoryNote(note)
    }
  }

  const openStory = openStoryNote ? STORIES[openStoryNote] : null
  const openProduct = openStory
    ? products.find((p) => p.sku === openStory.sku)
    : null

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12 text-center flex flex-col items-center">
        <h1 className="font-['Fraunces'] text-5xl md:text-7xl leading-tight max-w-2xl">
          Every instrument starts with a single note.
        </h1>
        <p className="mt-6 text-gray-400 max-w-md">
          Some keys hide a story. Press one to find out.
        </p>
      </div>

      <motion.div
        layout
        transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
        className="relative w-full max-w-3xl mx-auto mb-16 rounded-2xl overflow-hidden bg-black"
      >
        <AnimatePresence mode="wait">
          {!openStory ? (
            <motion.div
              key="keyboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-56 select-none"
            >
              <div className="flex w-full h-full">
                {WHITE_KEYS.map((key) => (
                  <div key={key.note} className="flex-1 flex flex-col items-center">
                    <motion.div
                      onPointerDown={() => handleKeyPress(key.note)}
                      animate={{ y: activeNote === key.note ? 6 : 0 }}
                      transition={{ duration: 0.1 }}
                      className={`w-full flex-1 border border-gray-300 rounded-b-md cursor-pointer active:bg-gray-100 ${
                        STORIES[key.note] ? 'bg-amber-50' : 'bg-white'
                      }`}
                    />
                    {STORIES[key.note] && (
                      <span className="text-[10px] text-gray-400 mt-1">
                        {STORIES[key.note].musician}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="absolute top-0 left-0 w-full h-[55%]">
                {BLACK_KEYS.map((key) => {
                  const whiteKeyWidth = 100 / WHITE_KEYS.length
                  const leftPercent =
                    (key.afterIndex + 1) * whiteKeyWidth - whiteKeyWidth * 0.3
                  return (
                    <motion.div
                      key={key.note}
                      onPointerDown={(e) => {
                        e.stopPropagation()
                        handleKeyPress(key.note)
                      }}
                      animate={{ y: activeNote === key.note ? 4 : 0 }}
                      transition={{ duration: 0.1 }}
                      style={{
                        left: `${leftPercent}%`,
                        width: `${whiteKeyWidth * 0.6}%`,
                      }}
                      className="absolute top-0 h-full bg-black border border-gray-800 rounded-b-md cursor-pointer z-10"
                    />
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="story"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-black p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {openProduct?.images?.[0] && (
                  <img
                    src={openProduct.images[0]}
                    alt={openProduct.name}
                    className="w-full md:w-56 h-48 object-contain bg-gray-50 rounded-md flex-shrink-0"
                  />
                )}

                <div className="text-left">
                  <p className="text-xs text-gray-400 mb-2">
                    {openProduct?.name || 'Loading...'}
                  </p>
                  <h2 className="font-['Fraunces'] text-2xl mb-4">
                    {openStory.musician}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {openStory.blurb}
                  </p>

                  <div className="flex gap-4 items-center">
                    {openProduct && (
                      <Link
                        to={`/product/${openProduct._id}`}
                        className="inline-block bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                      >
                        Shop this instrument
                      </Link>
                    )}
                    <button
                      onClick={() => setOpenStoryNote(null)}
                      className="text-sm text-gray-400 hover:text-black transition-colors"
                    >
                      Back to keyboard
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default PianoHero