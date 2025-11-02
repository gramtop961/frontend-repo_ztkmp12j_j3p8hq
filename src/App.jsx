import { useEffect, useMemo, useRef, useState } from 'react';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FeaturedGrid from './components/FeaturedGrid';
import Player from './components/Player';

function App() {
  // Sample tracks (royalty-free demos)
  const tracks = useMemo(
    () => [
      {
        id: 't1',
        title: 'SoundHelix Song 1',
        artist: 'SoundHelix',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover:
          'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 't2',
        title: 'SoundHelix Song 2',
        artist: 'SoundHelix',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        cover:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 't3',
        title: 'SoundHelix Song 3',
        artist: 'SoundHelix',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        cover:
          'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop',
      },
    ],
    []
  );

  const audioRef = useRef(new Audio());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = tracks[currentIndex].url;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentIndex, isPlaying, tracks]);

  // Attach audio listeners once
  useEffect(() => {
    const audio = audioRef.current;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnd = () => next();

    audio.volume = volume;
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  // Keep volume in sync
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playAtIndex = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    // play will trigger after src load effect
    setTimeout(() => {
      audioRef.current.play().catch(() => {});
    }, 0);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const next = () => {
    setCurrentIndex((i) => (i + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-10">
        <Hero />

        <section className="mt-6 md:mt-10">
          <SearchBar />
        </section>

        <FeaturedGrid
          tracks={tracks}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          onPlayIndex={playAtIndex}
        />

        <section className="mt-8">
          <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10">
            <h3 className="text-lg md:text-xl font-semibold">Need help?</h3>
            <p className="text-white/70 mt-1">
              Submit your request — our support team will reply via email.
            </p>
            <a
              href="mailto:cyusaowen793@gmail.com?subject=BeatWave%20Support"
              className="inline-block mt-4 bg-[#1DB954] text-black font-semibold px-5 py-3 rounded-full shadow hover:brightness-110 transition"
            >
              Open Support
            </a>
          </div>
        </section>
      </div>

      <div className="px-4">
        <Player
          track={tracks[currentIndex]}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onNext={next}
          onPrev={prev}
          currentTime={currentTime}
          duration={duration}
          onSeek={seek}
          volume={volume}
          onVolume={(v) => setVolume(v)}
        />
      </div>

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
