import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function Player() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(20);
  const [volume, setVolume] = useState(75);

  return (
    <div className="sticky bottom-4 z-20">
      <div className="mx-auto max-w-6xl">
        <div className="backdrop-blur-xl bg-zinc-900/70 border border-white/10 shadow-2xl rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop"
              alt="Album art"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="text-white font-semibold truncate">Digital Heartbeat</p>
              <p className="text-white/60 text-sm truncate">Astra Nova</p>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <button className="p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/15">
                <SkipBack className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setPlaying(!playing)}
                className="p-3 rounded-full bg-[#1DB954] text-black font-bold shadow"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button className="p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/15">
                <SkipForward className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1 mx-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-white/10 accent-[#1DB954]"
              />
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>1:12</span>
                <span>3:43</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-white" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-28 h-2 rounded-lg appearance-none bg-white/10 accent-[#1DB954]"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
