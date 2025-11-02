import Spline from '@splinetool/react-spline';
import { Rocket, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-3xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/QrI46EbSvyxcmozb/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* soft vignette and brand tint overlay - don't block interaction with Spline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl max-w-3xl">
          <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-3">
            <Rocket className="w-4 h-4 text-[#1DB954]" />
            <span>Premium • Futuristic • Fast</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
            Feel Every Beat —
            <span className="text-[#1DB954]"> Stream</span> &
            <span className="text-[#1DB954]"> Download</span> Your Favorite Music
          </h1>
          <p className="mt-4 text-white/80 md:text-lg">
            BeatWave is your modern hub to discover tracks, build playlists, and enjoy
            blazing-fast streaming with a sleek, glassy interface.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button className="inline-flex items-center gap-2 bg-[#1DB954] text-black font-semibold px-5 py-3 rounded-full shadow hover:brightness-110 transition">
              <Play className="w-5 h-5" /> Explore Music
            </button>
            <button className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/10 px-5 py-3 rounded-full hover:bg-white/15 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
