import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Heart, MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import Countdown from './Countdown';

interface EnvelopeProps {
  onOpen?: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRSVPed, setIsRSVPed] = useState(false);

  const weddingDate = new Date('2026-06-15T18:00:00'); // Example date
  const location = "Grand Ballroom, Cairo, Egypt";
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Grand+Ballroom+Cairo";
  
  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen?.();
      
      // Heart confetti burst
      const count = 150;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#FDFBF7', '#F4E1A1'],
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  };

  const addToCalendar = () => {
    const title = "Aya & Abdelrahman Wedding";
    const details = "We are waiting for you to share our special day";
    const start = weddingDate.toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(weddingDate.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, "");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[600px] flex items-center justify-center perspective-1000">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.5 } }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpen}
            className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px] bg-[#E8E2D6] cursor-pointer shadow-2xl rounded-sm group"
          >
            {/* Envelope Flap */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0 border-l-[160px] md:border-l-[225px] border-l-transparent border-r-[160px] md:border-r-[225px] border-r-transparent border-t-[110px] md:border-t-[150px] border-t-[#D9D1C1] z-20 transition-transform duration-500 group-hover:-translate-y-2" />
            </div>
            
            {/* Envelope Body */}
            <div className="absolute bottom-0 left-0 w-full h-0 border-l-[160px] md:border-l-[225px] border-l-transparent border-r-[160px] md:border-r-[225px] border-r-transparent border-b-[110px] md:border-b-[150px] border-b-[#F4F1EA] z-10" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[#FDFBF7] border border-[#D9D1C1] rounded-sm" />
            
            {/* Wax Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 bg-wedding-gold rounded-full flex items-center justify-center shadow-lg border-4 border-wedding-gold-light"
              >
                <span className="serif text-white text-2xl font-bold">A&A</span>
              </motion.div>
              <p className="mt-4 text-wedding-charcoal/60 uppercase tracking-[0.3em] text-[10px] font-medium">Click to Open</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
            className="w-full max-w-lg bg-[#FDFBF7] p-8 md:p-12 shadow-2xl rounded-sm border-[12px] border-double border-wedding-gold/20 relative overflow-hidden"
            style={{
              backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")`,
            }}
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-wedding-gold/30 m-4" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-wedding-gold/30 m-4" />

            <div className="text-center space-y-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="uppercase tracking-[0.4em] text-[10px] text-wedding-charcoal/60 mb-2">The Wedding of</p>
                <h1 className="calligraphy text-6xl md:text-7xl text-wedding-gold py-4">Aya & Abdelrahman</h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="serif italic text-lg text-wedding-charcoal/80"
              >
                Together with their families, invite you to celebrate their wedding
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="py-8 border-y border-wedding-gold/10 space-y-4"
              >
                <div className="flex items-center justify-center gap-3 text-wedding-charcoal/90">
                  <Calendar className="w-5 h-5 text-wedding-gold" />
                  <span className="serif text-xl">Monday, June 15, 2026</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-wedding-charcoal/90">
                  <Clock className="w-5 h-5 text-wedding-gold" />
                  <span className="serif text-xl">6:00 PM in the Evening</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-wedding-charcoal/90">
                  <MapPin className="w-5 h-5 text-wedding-gold" />
                  <span className="serif text-xl">{location}</span>
                </div>
              </motion.div>

              <Countdown targetDate={weddingDate} />

              <div className="pt-4 space-y-4">
                <p className="serif text-wedding-charcoal/70 italic">"We are waiting for you to share our special day"</p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <button 
                    onClick={addToCalendar}
                    className="flex items-center gap-2 px-6 py-3 bg-transparent border border-wedding-gold text-wedding-gold rounded-full hover:bg-wedding-gold hover:text-white transition-all duration-300 text-sm uppercase tracking-widest font-medium"
                  >
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </button>
                  
                  <a 
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-transparent border border-wedding-gold text-wedding-gold rounded-full hover:bg-wedding-gold hover:text-white transition-all duration-300 text-sm uppercase tracking-widest font-medium"
                  >
                    <MapPin className="w-4 h-4" />
                    View Location
                  </a>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setIsRSVPed(true)}
                    disabled={isRSVPed}
                    className={`w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full shadow-lg transition-all duration-500 ${
                      isRSVPed 
                      ? 'bg-green-50 text-green-600 border border-green-200 cursor-default' 
                      : 'bg-wedding-gold text-white hover:bg-wedding-gold/90 hover:scale-[1.02] active:scale-[0.98]'
                    } text-sm uppercase tracking-[0.2em] font-bold`}
                  >
                    {isRSVPed ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        RSVP Confirmed
                      </>
                    ) : (
                      'Confirm Attendance (RSVP)'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
