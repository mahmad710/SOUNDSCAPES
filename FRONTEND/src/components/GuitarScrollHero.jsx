import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import guitarImg from '../assets/guitar.png'

const WALL_PRODUCTS = [
  { name: 'Gibson Les Paul Standard', category: 'Guitars' },
  { name: 'Yamaha P-125 Digital Piano', category: 'Keyboards' },
  { name: 'Pearl Export Series Kit', category: 'Drums' },
  { name: "D'Addario EXL110 Strings", category: 'Strings' },
  { name: 'Yamaha YAS-280 Saxophone', category: 'Wind' },
  { name: 'Marshall MG15GR Amp', category: 'Amps & Pedals' },
  { name: 'Kyser Quick-Change Capo', category: 'Accessories' },
]

function GuitarScrollHero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // smooths out scroll input so the pan feels slow and fluid, not jumpy
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  })

  // camera stays zoomed in the whole time — only the image slides upward
  const imgY = useTransform(smoothProgress, [0, 0.85], ['0%', '-62%'])

  const neckLabelOpacity = useTransform(smoothProgress, [0, 0.1, 0.2], [1, 1, 0])
  const holeLabelOpacity = useTransform(smoothProgress, [0.65, 0.78, 0.88], [0, 1, 0])

  // black portal grows once we've arrived at the sound hole
  const maskRadius = useTransform(smoothProgress, [0.85, 1], [0, 150])
  const maskClip = useMotionTemplate`circle(${maskRadius}% at 50% 62%)`
  const maskOpacity = useTransform(smoothProgress, [0.85, 0.9], [0, 1])

  return (
    <>
      <div ref={containerRef} className="relative h-[350vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.img
            src={guitarImg}
            style={{ y: imgY }}
            className="absolute left-1/2 -translate-x-1/2 top-0 h-[220vh] w-auto max-w-none scale-150 object-contain select-none pointer-events-none"
            draggable={false}
          />

          <motion.div
            style={{ opacity: neckLabelOpacity }}
            className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center px-6 z-10"
          >
            <h1 className="font-['Fraunces'] text-white text-4xl md:text-5xl">
              Every instrument starts with a single note.
            </h1>
            <p className="text-gray-400 mt-4">Scroll to follow the sound.</p>
          </motion.div>

          <motion.div
            style={{ opacity: holeLabelOpacity }}
            className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center px-6 z-10"
          >
            <p className="text-gray-300 text-lg">
              This is where the sound is born.
            </p>
          </motion.div>

          <motion.div
            style={{ clipPath: maskClip, opacity: maskOpacity }}
            className="absolute inset-0 bg-black z-20"
          />
        </div>
      </div>

      <div className="relative bg-black text-white px-6 py-24">
        <h2 className="font-['Fraunces'] text-3xl text-center mb-4">
          Inside the sound hole
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-md mx-auto">
          A few of the instruments waiting on the other side.
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {WALL_PRODUCTS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white p-3 pb-6 shadow-lg ${
                i % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'
              }`}
            >
              <div className="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                Photo
              </div>
              <p className="text-black text-xs mt-3 text-center font-medium">
                {item.name}
              </p>
              <p className="text-gray-400 text-[10px] text-center">
                {item.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default GuitarScrollHero 