import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-['Fraunces'] text-xl mb-3">SoundHouse</h3>
          <p className="text-sm text-white/50 leading-relaxed">
            Real instruments, real stories. Guitars, keyboards, drums, and more.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
            Shop
          </h4>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <Link to="/products" className="hover:text-white transition-colors">
              All Products
            </Link>
            <Link to="/products?category=Guitars" className="hover:text-white transition-colors">
              Guitars
            </Link>
            <Link to="/products?category=Keyboards" className="hover:text-white transition-colors">
              Keyboards
            </Link>
            <Link to="/products?category=Drums" className="hover:text-white transition-colors">
              Drums
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
            Account
          </h4>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <Link to="/login" className="hover:text-white transition-colors">
              Log In
            </Link>
            <Link to="/register" className="hover:text-white transition-colors">
              Register
            </Link>
            <Link to="/cart" className="hover:text-white transition-colors">
              Cart
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
            About
          </h4>
          <p className="text-sm text-white/70 leading-relaxed">
            A portfolio project built to explore real e-commerce, from checkout
            to catalog.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} SoundHouse. Built by Ahmad.
      </div>
    </footer>
  )
}

export default Footer