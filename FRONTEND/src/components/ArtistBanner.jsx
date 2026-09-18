import { Link } from 'react-router-dom'

function ArtistBanner({ musician, blurb, imageUrl, product, reverse, era, genre, song, accent, bgTint }) {
  return (
    <div
      style={{ backgroundColor: bgTint }}
      className="max-w-6xl mx-auto rounded-3xl overflow-hidden my-8"
    >
      <div
        className={`flex flex-col md:flex-row ${
          reverse ? 'md:flex-row-reverse' : ''
        } items-stretch gap-10 md:gap-16 py-20 px-6 max-w-5xl mx-auto`}
      >
        <div className="w-full md:w-1/2 relative">
          <div
            className="absolute -inset-3 -z-10"
            style={{ background: accent, opacity: 0.15 }}
          />
          <img
            src={imageUrl}
            alt={musician}
            className="w-full h-full min-h-[420px] object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs uppercase tracking-widest px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: accent }}
            >
              {era}
            </span>
            <span className="text-xs uppercase tracking-widest text-white/50">
              {genre}
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
            {product?.name || 'Loading...'}
          </p>
          <h2 className="font-['Fraunces'] text-3xl md:text-4xl mb-5 text-white">
            {musician}
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">{blurb}</p>

          <p className="text-sm text-white/50 italic mb-6">
            Signature track: <span className="text-white not-italic">{song}</span>
          </p>

          {product && (
            <Link
              to={`/product/${product._id}`}
              className="inline-block border px-5 py-2 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: accent, borderColor: accent }}
            >
              Shop this instrument
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtistBanner