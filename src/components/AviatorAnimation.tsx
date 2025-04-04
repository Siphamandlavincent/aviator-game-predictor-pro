
import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

interface AviatorAnimationProps {
  isFlying: boolean;
  multiplier: number;
  onComplete: () => void;
}

const AviatorAnimation: React.FC<AviatorAnimationProps> = ({ 
  isFlying,
  multiplier,
  onComplete
}) => {
  const [animationClass, setAnimationClass] = useState('');
  const [showMultiplier, setShowMultiplier] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (isFlying) {
      setShowMultiplier(true);
      setCurrentMultiplier(1.00);
      
      // Start the multiplier counter
      const id = window.setInterval(() => {
        setCurrentMultiplier(prev => {
          const increment = Math.random() * 0.03 + 0.01;
          return Number((prev + increment).toFixed(2));
        });
      }, 100);
      setIntervalId(id);
      
      // Start with a delay to show the multiplier first
      setTimeout(() => {
        setAnimationClass('animate-plane-fly');
        
        // Flight duration based on multiplier (higher = longer flight)
        const duration = 1000 + (multiplier * 200);
        
        // Schedule the completion
        setTimeout(() => {
          if (intervalId) clearInterval(intervalId);
          setAnimationClass('');
          setShowMultiplier(false);
          onComplete();
        }, duration);
      }, 500);
    } else {
      if (intervalId) clearInterval(intervalId);
      setAnimationClass('');
      setShowMultiplier(false);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isFlying, multiplier, onComplete]);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg bg-aviator-dark/80 border border-aviator-accent/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzIxMjUzMyIgZmlsbC1vcGFjaXR5PSIwLjQiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTM2IDRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTYgNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')]"></div>
      
      <div className={`absolute left-8 bottom-8 transition-all duration-300 ${animationClass}`}>
        <Plane size={48} className="text-aviator-primary plane-shadow" />
      </div>
      
      {showMultiplier && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-aviator-dark/70 px-4 py-2 rounded-full border border-aviator-accent/30">
          <span className="text-2xl font-bold text-white">
            {currentMultiplier.toFixed(2)}x
          </span>
        </div>
      )}
      
      {/* Ground line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-aviator-accent/30"></div>
    </div>
  );
};

export default AviatorAnimation;
