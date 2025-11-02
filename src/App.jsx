import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FeaturedGrid from './components/FeaturedGrid';
import Player from './components/Player';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* App container */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-10">
        {/* Hero with Spline cover */}
        <Hero />

        {/* Search */}
        <section className="mt-6 md:mt-10">
          <SearchBar />
        </section>

        {/* Featured sections */}
        <FeaturedGrid />

        {/* Support banner */}
        <section className="mt-8">
          <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10">
            <h3 className="text-lg md:text-xl font-semibold">Need help?</h3>
            <p className="text-white/70 mt-1">
              Submit your request — our support team will reply via email.
            </p>
            <a
              href="#"
              className="inline-block mt-4 bg-[#1DB954] text-black font-semibold px-5 py-3 rounded-full shadow hover:brightness-110 transition"
            >
              Open Support
            </a>
          </div>
        </section>
      </div>

      {/* Persistent player */}
      <div className="px-4">
        <Player />
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70">Copyright © 2025 BeatWave</p>
          <a href="mailto:cyusaowen793@gmail.com" className="text-[#1DB954] hover:underline">
            cyusaowen793@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
