
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, LineChart, History, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import DeepSeekService from '@/services/deepseekService';

interface PredictionPanelProps {
  onStartFlight: (multiplier: number) => void;
  isFlying: boolean;
  betwayId?: string;
  deepseekApiKey?: string;
}

const PredictionPanel = ({ onStartFlight, isFlying, betwayId, deepseekApiKey }: PredictionPanelProps) => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [history, setHistory] = useState<{ multiplier: number, time: string, confidence: number }[]>([]);
  const [deepseekService, setDeepseekService] = useState<DeepSeekService | null>(null);

  useEffect(() => {
    // Use provided props or fallback to environment variables
    const apiKey = deepseekApiKey || process.env.DEEPSEEK_API_KEY;
    const betId = betwayId || process.env.BETWAY_ID;
    
    if (apiKey || betId) {
      console.log("Creating DeepSeek service with Betway ID:", betId);
      const service = new DeepSeekService(apiKey, betId);
      setDeepseekService(service);
    }
  }, [betwayId, deepseekApiKey]);

  // Auto-calculate prediction when service is initialized
  useEffect(() => {
    if (deepseekService && !prediction && !isCalculating) {
      calculatePrediction();
    }
  }, [deepseekService]);

  // Generate a new prediction using DeepSeek API
  const calculatePrediction = useCallback(async () => {
    if (!deepseekService) {
      toast.error("DeepSeek service not initialized. Please check your API key and Betway ID.");
      return;
    }
    
    setIsCalculating(true);
    setPrediction(null);
    
    // Show progress animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setConfidence(progress < 100 ? progress : 99); // Keep at 99% until result
      if (progress >= 100) clearInterval(interval);
    }, 100);
    
    try {
      console.log("Calling DeepSeek service getPrediction");
      const result = await deepseekService.getPrediction();
      clearInterval(interval);
      
      if (result) {
        console.log("Prediction received:", result);
        setPrediction(result.prediction);
        setConfidence(result.confidence);
        
        // Add to history
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        setHistory(prev => [{
          multiplier: result.prediction,
          confidence: result.confidence,
          time: timeString
        }, ...prev].slice(0, 5));
        
        toast.success(`Prediction complete: ${result.prediction.toFixed(2)}x with ${result.confidence}% confidence`);
      } else {
        toast.error("Failed to generate prediction. Please try again.");
      }
    } catch (error) {
      console.error("Error in calculatePrediction:", error);
      toast.error("Failed to get prediction. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  }, [deepseekService]);

  // Start flight with the predicted multiplier
  const handleStartFlight = () => {
    if (prediction) {
      onStartFlight(prediction);
      toast.info(`Flight started with predicted multiplier: ${prediction.toFixed(2)}x`);
    } else {
      toast.error("No prediction available. Please generate a prediction first.");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border border-aviator-accent/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2 text-aviator-primary" size={20} />
          Next Flight Prediction
          {betwayId && <span className="ml-auto text-xs text-gray-400">Betway ID: {betwayId}</span>}
        </h2>
        
        <div className="space-y-4">
          {isCalculating ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Processing with DeepSeek AI...</span>
                <span>{confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-aviator-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 italic">
                DeepSeek AI analyzing live Betway flight patterns...
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              {prediction ? (
                <>
                  <div className="text-4xl font-bold text-aviator-accent animate-pulse">
                    {prediction.toFixed(2)}x
                  </div>
                  <p className="text-gray-300 mt-2">Predicted Multiplier</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Confidence: {confidence}% | Based on real Betway data
                  </p>
                  
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
                      <RefreshCw size={16} className="mr-1" />
                      New Prediction
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-4 py-4">
                  <p className="text-gray-300">No prediction generated yet</p>
                  <Button 
                    className="bg-aviator-primary hover:bg-aviator-primary/80 text-white"
                    onClick={calculatePrediction}
                    disabled={isCalculating}
                  >
                    Generate Prediction
                  </Button>
                </div>
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
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 mr-2">{item.confidence}%</span>
                  <span className="font-medium text-aviator-primary">{item.multiplier.toFixed(2)}x</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400">
            No prediction history yet
          </div>
        )}
      </Card>
      
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border-amber-500/20 border">
        <div className="flex items-center text-amber-400 mb-2">
          <AlertTriangle size={18} className="mr-2" />
          <h3 className="font-medium">DeepSeek AI Status</h3>
        </div>
        <p className="text-xs text-gray-300">
          {betwayId && deepseekApiKey ? 
            `Connection active: DeepSeek AI is synced with Betway ID ${betwayId.substring(0, 3)}***${betwayId.substring(betwayId.length - 3)}` : 
            "DeepSeek API not connected. Check your API key and Betway ID."}
        </p>
      </Card>
    </div>
  );
};

export default PredictionPanel;
