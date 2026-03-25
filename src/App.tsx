import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Music2, Volume2, VolumeX, Heart } from 'lucide-react';
import Envelope from './components/Envelope';
import FloatingHearts from './components/FloatingHearts';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const openSoundRef = useRef<HTMLAudioElement | null>(null);

  // Soft romantic piano music
  const bgMusicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder, but functional
  // Better romantic piano:
  const romanticPianoUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808f30307.mp3?filename=romantic-piano-113233.mp3";
  
  // Paper opening sound
  const paperSoundUrl = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      if (!isMuted && isOpened) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, isOpened]);

  const handleEnvelopeOpen = () => {
    setIsOpened(true);
    if (openSoundRef.current) {
      openSoundRef.current.play().catch(e => console.log("Sound play blocked", e));
    }
    // Unmute automatically on user interaction if they haven't manually muted
    setIsMuted(false);
  };

  return (
    <div className="min-h-screen w-full bg-wedding-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <FloatingHearts />
      
      {/* Audio Elements */}
      <audio ref={audioRef} src={romanticPianoUrl} loop />
      <audio ref={openSoundRef} src={paperSoundUrl} />

      {/* Music Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-wedding-gold/20 text-wedding-gold hover:scale-110 transition-transform"
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 animate-pulse" />}
      </motion.button>

      {/* Header (Visible before opening) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center mb-12 z-10"
          >
            <h2 className="calligraphy text-4xl md:text-5xl text-wedding-gold mb-2">Aya & Abdelrahman</h2>
            <p className="serif italic text-wedding-charcoal/60 tracking-widest text-sm uppercase">You are cordially invited</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="w-full max-w-4xl z-10 flex items-center justify-center">
        <Envelope onOpen={handleEnvelopeOpen} />
      </main>

      {/* Footer Decoration */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-wedding-gold"
      >
        <div className="h-px w-12 bg-wedding-gold/30" />
        <Heart className="w-4 h-4 fill-current" />
        <div className="h-px w-12 bg-wedding-gold/30" />
      </motion.div>

      {/* Decorative Corners */}
      <div className="fixed top-0 left-0 w-32 h-32 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-wedding-gold">
          <path d="M0 0 L100 0 L100 5 L5 5 L5 100 L0 100 Z" />
        </svg>
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-wedding-gold">
          <path d="M0 0 L100 0 L100 5 L5 5 L5 100 L0 100 Z" />
        </svg>
      </div>
    </div>
  );
}
