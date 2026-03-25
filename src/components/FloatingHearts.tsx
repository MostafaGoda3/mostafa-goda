import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: 10 + Math.random() * 20,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.6, 0.6, 0],
            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          className="absolute text-wedding-gold/30"
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
