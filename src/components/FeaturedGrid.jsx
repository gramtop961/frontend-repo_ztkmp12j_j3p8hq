import { Download, Heart, Plus, Play } from 'lucide-react';

const samplePlaylists = [
  { id: 1, title: 'Neon Nights', by: 'BeatWave Originals' },
  { id: 2, title: 'Bass Surge', by: 'Curated' },
  { id: 3, title: 'Chillwave Focus', by: 'BeatWave' },
  { id: 4, title: 'Synthwave Drive', by: 'Community' },
];

const sampleArtists = [
  { id: 11, title: 'Astra Nova' },
  { id: 12, title: 'Echo Prism' },
  { id: 13, title: 'MonoPulse' },
  { id: 14, title: 'Kairox' },
];

function Card({ title, subtitle }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10">
      <div className="aspect-square w-full bg-gradient-to-br from-[#1DB954]/20 via-zinc-800 to-black" />
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg drop-shadow">{title}</h3>
          {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-2">
          <button className="inline-flex items-center gap-2 text-black bg-[#1DB954] px-3 py-2 rounded-full text-sm font-medium shadow">
            <Plus className="w-4 h-4" /> Add to Playlist
          </button>
          <button className="inline-flex items-center gap-2 text-white bg-white/10 border border-white/10 px-3 py-2 rounded-full text-sm hover:bg-white/15">
            <Download className="w-4 h-4" /> Download
          </button>
          <button className="ml-auto inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/10 hover:bg-white/15">
            <Heart className="w-4 h-4 text-[#1DB954]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedGrid({ tracks = [], currentIndex = 0, isPlaying = false, onPlayIndex = () => {} }) {
  return (
    <div id="discover" className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Featured Playlists</h2>
          <a className="text-sm text-[#1DB954] hover:underline" href="#">View all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {samplePlaylists.map((p) => (
            <Card key={p.id} title={p.title} subtitle={p.by} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Trending Artists</h2>
          <a className="text-sm text-[#1DB954] hover:underline" href="#">View all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sampleArtists.map((a) => (
            <Card key={a.id} title={a.title} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">My Tracks</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tracks.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => onPlayIndex(idx)}
              className={`group text-left rounded-2xl overflow-hidden border transition focus:outline-none focus:ring-2 focus:ring-[#1DB954]/70 ${
                idx === currentIndex ? 'border-[#1DB954]/70 bg-[#1DB954]/10' : 'border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800'
              }`}
            >
              <div className="relative">
                <img src={t.cover} alt={t.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 right-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1DB954] text-black shadow">
                    <Play className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white font-semibold truncate">{t.title}</p>
                <p className="text-white/60 text-sm truncate">{t.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
