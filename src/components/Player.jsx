import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

function secondsToTime(secs = 0) {
  if (!isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Player({
  track,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolume,
}) {
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="sticky bottom-4 z-20">
      <div className="mx-auto max-w-6xl">
        <div className="backdrop-blur-xl bg-zinc-900/70 border border-white/10 shadow-2xl rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <img
              src={track?.cover}
              alt={track?.title || 'Album art'}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="text-white font-semibold truncate">{track?.title || '—'}</p>
              <p className="text-white/60 text-sm truncate">{track?.artist || ''}</p>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <button onClick={onPrev} className="p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/15">
                <SkipBack className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={onTogglePlay}
                className="p-3 rounded-full bg-[#1DB954] text-black font-bold shadow"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={onNext} className="p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/15">
                <SkipForward className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1 mx-4">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(e) => onSeek(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-white/10 accent-[#1DB954]"
              />
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>{secondsToTime(currentTime)}</span>
                <span>{secondsToTime(duration)}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-white" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => onVolume(parseFloat(e.target.value))}
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
