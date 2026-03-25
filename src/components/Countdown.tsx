import { useState, useEffect } from 'react';
import { intervalToDuration, isAfter, type Duration } from 'date-fns';

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [duration, setDuration] = useState<Duration | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (isAfter(now, targetDate)) {
        setIsPast(true);
        setDuration(null);
        clearInterval(timer);
      } else {
        setDuration(intervalToDuration({ start: now, end: targetDate }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isPast) {
    return (
      <div className="text-center py-8">
        <p className="serif text-2xl text-wedding-gold italic">The celebration has begun!</p>
      </div>
    );
  }

  if (!duration) return null;

  const TimeBlock = ({ value, label }: { value: number | undefined; label: string }) => (
    <div className="flex flex-col items-center px-4 py-2">
      <span className="text-3xl md:text-4xl font-light text-wedding-gold serif">
        {value?.toString().padStart(2, '0') || '00'}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-wedding-charcoal/60 mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center divide-x divide-wedding-gold/20 my-8">
      <TimeBlock value={duration.days} label="Days" />
      <TimeBlock value={duration.hours} label="Hours" />
      <TimeBlock value={duration.minutes} label="Minutes" />
      <TimeBlock value={duration.seconds} label="Seconds" />
    </div>
  );
}
