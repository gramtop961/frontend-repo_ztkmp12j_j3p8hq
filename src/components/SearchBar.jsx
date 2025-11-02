import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
        <input
          type="text"
          placeholder="Search songs, artists, or albums"
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/70 backdrop-blur-md"
        />
      </div>
      <p className="mt-2 text-xs text-white/50">
        Try: Neon Nights, Digital Heartbeat, or your favorite artist
      </p>
    </div>
  );
}
