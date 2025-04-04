
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, LineChart, History, TrendingUp, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface PredictionPanelProps {
  onStartFlight: (multiplier: number) => void;
  isFlying: boolean;
}

const PredictionPanel = ({ onStartFlight, isFlying }: PredictionPanelProps) => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [history, setHistory] = useState<{ multiplier: number, time: string }[]>([]);

  // Generate a new prediction
  const calculatePrediction = () => {
    setIsCalculating(true);
    setPrediction(null);
    
    // Simulate algorithm calculation with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setConfidence(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        // Generate predicted multiplier between 1.2 and 10
        const newPrediction = +(Math.random() * 8.8 + 1.2).toFixed(2);
        setPrediction(newPrediction);
        setIsCalculating(false);
        
        // Add to history
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        setHistory(prev => [{
          multiplier: newPrediction,
          time: timeString
        }, ...prev].slice(0, 5));
      }
    }, 100);
  };

  // Start flight with the predicted multiplier
  const handleStartFlight = () => {
    if (prediction) {
      onStartFlight(prediction);
      toast.info(`Flight started with predicted multiplier: ${prediction.toFixed(2)}x`);
    }
  };

  // Calculate initial prediction when component mounts
  useEffect(() => {
    calculatePrediction();
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border border-aviator-accent/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2 text-aviator-primary" size={20} />
          Next Flight Prediction
        </h2>
        
        <div className="space-y-4">
          {isCalculating ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Analyzing patterns...</span>
                <span>{confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="meter-bg h-2 rounded-full transition-all duration-300"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 italic">
                AI algorithm processing flight data...
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              {prediction && (
                <>
                  <div className="text-4xl font-bold text-aviator-accent animate-fade-in">
                    {prediction.toFixed(2)}x
                  </div>
                  <p className="text-gray-300 mt-2">Predicted Multiplier</p>
                  
                  <div className="mt-4 flex gap-2 justify-center">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleStartFlight}
                      disabled={isFlying}
                    >
                      Start Flight
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-aviator-accent/50 text-aviator-accent hover:bg-aviator-accent/20"
                      onClick={calculatePrediction}
                      disabled={isCalculating || isFlying}
                    >
                      New Prediction
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border border-aviator-accent/20">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center">
          <History className="mr-2 text-aviator-primary" size={20} />
          Recent Predictions
        </h2>
        
        {history.length > 0 ? (
          <div className="space-y-2">
            {history.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-aviator-dark/50 rounded">
                <div className="flex items-center">
                  <ArrowRight size={16} className="mr-2 text-aviator-accent" />
                  <span className="text-gray-200">{item.time}</span>
                </div>
                <span className="font-medium text-aviator-primary">{item.multiplier.toFixed(2)}x</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400">
            No prediction history yet
          </div>
        )}
      </Card>
      
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border-red-500/20 border">
        <div className="flex items-center text-amber-400 mb-2">
          <AlertTriangle size={18} className="mr-2" />
          <h3 className="font-medium">Disclaimer</h3>
        </div>
        <p className="text-xs text-gray-300">
          This is a simulation for entertainment purposes only. Real gambling involves 
          financial risk. No prediction algorithm can guarantee results in games of chance.
        </p>
      </Card>
    </div>
  );
};

export default PredictionPanel;
