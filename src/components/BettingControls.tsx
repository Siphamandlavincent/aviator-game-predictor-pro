
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CircleDollarSign, Gauge, ChevronsDownUp } from 'lucide-react';
import { toast } from "sonner";

interface BettingControlsProps {
  isFlying: boolean;
  onCashout: (amount: number) => void;
}

const BettingControls = ({ isFlying, onCashout }: BettingControlsProps) => {
  const [betAmount, setBetAmount] = useState(10);
  const [autoMultiplier, setAutoMultiplier] = useState(2.0);
  const [balance, setBalance] = useState(1000);
  
  const handleCashout = () => {
    if (!isFlying) return;
    
    // Calculate winnings based on current multiplier (simulated)
    const currentMultiplier = Math.random() * 3 + 1; // Random between 1-4x for demo
    const winnings = betAmount * currentMultiplier;
    
    setBalance(prev => prev + winnings - betAmount);
    onCashout(winnings);
    toast.success(`Cashed out at ${currentMultiplier.toFixed(2)}x. Won $${winnings.toFixed(2)}!`);
  };
  
  const handleChangeBet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBetAmount(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-aviator-secondary/80 backdrop-blur-sm rounded-lg border border-aviator-accent/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <CircleDollarSign className="mr-2 text-aviator-primary" size={20} />
          Betting Controls
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Balance:</span>
            <span className="text-lg font-bold text-white">${balance.toFixed(2)}</span>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Bet Amount ($)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={betAmount}
                onChange={handleChangeBet}
                min={1}
                className="bg-aviator-dark/70 border-aviator-accent/30 text-white"
              />
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-aviator-accent/50 text-aviator-accent" 
                  onClick={() => setBetAmount(10)}
                >
                  10
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-aviator-accent/50 text-aviator-accent" 
                  onClick={() => setBetAmount(50)}
                >
                  50
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300 flex items-center">
                <Gauge size={16} className="mr-1 text-aviator-primary" />
                Auto Cashout (x{autoMultiplier.toFixed(2)})
              </label>
              <span className="text-xs text-gray-400">{autoMultiplier.toFixed(2)}x</span>
            </div>
            <Slider
              value={[autoMultiplier]}
              min={1.2}
              max={10}
              step={0.1}
              onValueChange={(values) => setAutoMultiplier(values[0])}
              className="py-2"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="w-1/2 bg-green-600 hover:bg-green-700 text-white"
              disabled={isFlying}
              onClick={() => {
                if (betAmount > balance) {
                  toast.error("Insufficient balance");
                  return;
                }
                toast.info(`Bet placed: $${betAmount}`);
              }}
            >
              Place Bet
            </Button>
            <Button 
              className="w-1/2 bg-aviator-primary hover:bg-aviator-primary/80 text-white"
              onClick={handleCashout}
              disabled={!isFlying}
            >
              Cash Out
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-aviator-secondary/80 backdrop-blur-sm rounded-lg border border-aviator-accent/20">
        <h2 className="text-lg font-bold text-white mb-2 flex items-center">
          <ChevronsDownUp className="mr-2 text-aviator-primary" size={18} />
          Quick Bets
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="border-aviator-accent/50 text-aviator-accent"
            onClick={() => {
              setBetAmount(25);
              setAutoMultiplier(1.5);
              toast.info("Low risk strategy selected");
            }}
          >
            Low Risk
          </Button>
          <Button 
            variant="outline" 
            className="border-aviator-accent/50 text-aviator-accent"
            onClick={() => {
              setBetAmount(50);
              setAutoMultiplier(2.5);
              toast.info("Medium risk strategy selected");
            }}
          >
            Medium Risk
          </Button>
          <Button 
            variant="outline" 
            className="border-aviator-accent/50 text-aviator-accent"
            onClick={() => {
              setBetAmount(100);
              setAutoMultiplier(5);
              toast.info("High risk strategy selected");
            }}
          >
            High Risk
          </Button>
          <Button 
            variant="outline" 
            className="border-aviator-accent/50 text-aviator-accent"
            onClick={() => {
              setBetAmount(200);
              setAutoMultiplier(8);
              toast.info("Extreme risk strategy selected");
            }}
          >
            Extreme Risk
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BettingControls;
