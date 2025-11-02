import { useState } from 'react';
import { Search, Play } from 'lucide-react';

export default function SearchResults({ onPlayList }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const doSearch = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const base = import.meta.env.VITE_BACKEND_URL;
      const url = `${base}/search?query=${encodeURIComponent(query)}&country=${encodeURIComponent(country)}&limit=24`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data = await res.json();
      setResults(data || []);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const playResults = (startIndex) => {
    const mapped = results.map((r) => ({
      id: r.id,
      title: r.title,
      artist: r.artist,
      url: r.preview_url, // iTunes preview (30s)
      cover: r.cover,
    })).filter(t => !!t.url);
    if (mapped.length) onPlayList(mapped, startIndex);
  };

  return (
    <section className="space-y-4" aria-label="Global Search">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white">Search the world</h2>
      </div>
      <form onSubmit={doSearch} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any song, artist, or genre (R&B, Phonk, Rap, Afrobeats, K-pop...)"
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/70 backdrop-blur-md"
          />
        </div>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none"
          aria-label="Country"
        >
          <option value="US">US</option>
          <option value="GB">UK</option>
          <option value="CA">Canada</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="NG">Nigeria</option>
          <option value="BR">Brazil</option>
          <option value="JP">Japan</option>
          <option value="KR">Korea</option>
          <option value="IN">India</option>
        </select>
        <button type="submit" className="px-6 py-3 rounded-2xl bg-[#1DB954] text-black font-semibold shadow hover:brightness-110">Search</button>
      </form>

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="text-white/70">Searching…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((r, idx) => (
            <button
              key={r.id + idx}
              onClick={() => playResults(idx)}
              className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/70"
            >
              <div className="relative">
                <img src={r.cover} alt={r.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 right-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1DB954] text-black shadow">
                    <Play className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white font-semibold truncate">{r.title}</p>
                <p className="text-white/60 text-sm truncate">{r.artist}</p>
                {r.genre && <p className="text-white/40 text-xs mt-1">{r.genre}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
