
import React, { useState } from 'react';
import ActivationForm from '@/components/ActivationForm';
import AviatorAnimation from '@/components/AviatorAnimation';
import PredictionPanel from '@/components/PredictionPanel';
import BettingControls from '@/components/BettingControls';
import StatsPanel from '@/components/StatsPanel';
import { Plane, LineChart, Github } from 'lucide-react';

const Index = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [predictedMultiplier, setPredictedMultiplier] = useState(0);

  const handleActivate = () => {
    setIsActivated(true);
  };

  const handleStartFlight = (multiplier: number) => {
    setPredictedMultiplier(multiplier);
    setIsFlying(true);
  };

  const handleFlightComplete = () => {
    setIsFlying(false);
  };

  const handleCashout = (amount: number) => {
    // This would be handled by BettingControls internally
  };

  if (!isActivated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <Plane className="text-aviator-primary mr-2" size={36} />
            <h1 className="text-4xl font-bold text-white">Aviator Predictor Pro</h1>
          </div>
          <p className="text-gray-300 max-w-md mx-auto">
            Advanced prediction algorithm with 99% accuracy for the popular Aviator game
          </p>
        </div>
        
        <ActivationForm onActivate={handleActivate} />
        
        <div className="mt-10 text-center text-xs text-gray-500">
          <p>This is a simulation for entertainment purposes only.</p>
          <p>Not affiliated with any actual betting platform.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Plane className="text-aviator-primary mr-2" size={28} />
          <h1 className="text-2xl font-bold text-white">Aviator Predictor Pro</h1>
          <span className="ml-2 px-2 py-1 bg-aviator-primary/20 rounded text-xs text-aviator-primary font-medium">v4.0</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center px-3 py-1 bg-aviator-secondary/80 rounded-full">
            <LineChart className="text-aviator-accent mr-2" size={16} />
            <span className="text-sm text-gray-200">99% Accuracy</span>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <AviatorAnimation 
            isFlying={isFlying} 
            multiplier={predictedMultiplier}
            onComplete={handleFlightComplete}
          />
          
          <StatsPanel />
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <PredictionPanel 
            onStartFlight={handleStartFlight}
            isFlying={isFlying}
          />
          
          <BettingControls 
            isFlying={isFlying}
            onCashout={handleCashout}
          />
        </div>
      </div>
      
      <footer className="mt-8 border-t border-aviator-accent/20 pt-4 text-center text-xs text-gray-500">
        <p>
          Disclaimer: This application is for simulation and entertainment purposes only. 
          Real gambling involves risk and may lead to addiction. Play responsibly.
        </p>
      </footer>
    </div>
  );
};

export default Index;
