import { Download, Heart, Plus } from 'lucide-react';

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

const newReleases = [
  { id: 21, title: 'Digital Heartbeat', artist: 'Astra Nova' },
  { id: 22, title: 'Voltage Bloom', artist: 'Echo Prism' },
  { id: 23, title: 'Skyline Runner', artist: 'MonoPulse' },
  { id: 24, title: 'Hyperdrive', artist: 'Kairox' },
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

export default function FeaturedGrid() {
  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Featured Playlists</h2>
          <a className="text-sm text-[#1DB954] hover:underline" href="#">View all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {samplePlaylists.map(p => (
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
          {sampleArtists.map(a => (
            <Card key={a.id} title={a.title} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">New Releases</h2>
          <a className="text-sm text-[#1DB954] hover:underline" href="#">View all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newReleases.map(n => (
            <Card key={n.id} title={n.title} subtitle={n.artist} />
          ))}
        </div>
      </section>
    </div>
  );
}
