
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ActivationFormProps {
  onActivate: (betwayId: string, deepseekApiKey: string) => void;
}

const ActivationForm = ({ onActivate }: ActivationFormProps) => {
  const [code, setCode] = useState('');
  const [betwayId, setBetwayId] = useState('');
  const [deepseekApiKey, setDeepseekApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (code.length >= 8) {
        if (!deepseekApiKey) {
          toast.warning("DeepSeek API key is required for real-time predictions");
          setLoading(false);
          return;
        }
        
        toast.success("Activation successful! Connected to Betway account.");
        onActivate(betwayId, deepseekApiKey);
      } else {
        toast.error("Invalid activation code. Please try again.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-6 bg-aviator-secondary/80 backdrop-blur-sm rounded-lg shadow-lg border border-aviator-accent/20">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Activate Predictor Pro v4.0</h2>
      
      <form onSubmit={handleActivate} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium text-gray-200">
            Enter your activation code:
          </label>
          <Input
            id="code"
            placeholder="e.g., XXXX-XXXX-XXXX"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-aviator-dark/70 border-aviator-accent/30 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="betwayId" className="text-sm font-medium text-gray-200">
            Betway Account ID:
          </label>
          <Input
            id="betwayId"
            placeholder="Enter your Betway ID to sync predictions"
            value={betwayId}
            onChange={(e) => setBetwayId(e.target.value)}
            className="bg-aviator-dark/70 border-aviator-accent/30 text-white"
            required
          />
          <p className="text-xs text-gray-400">
            Your Betway ID is required to sync with live game data
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="deepseekApiKey" className="text-sm font-medium text-gray-200">
            DeepSeek API Key:
          </label>
          <Input
            id="deepseekApiKey"
            type="password"
            placeholder="Enter your DeepSeek API key"
            value={deepseekApiKey}
            onChange={(e) => setDeepseekApiKey(e.target.value)}
            className="bg-aviator-dark/70 border-aviator-accent/30 text-white"
            required
          />
          <p className="text-xs text-gray-400">
            Your DeepSeek API key is needed for AI-powered predictions
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-aviator-primary hover:bg-aviator-primary/80 text-white font-bold"
          disabled={loading}
        >
          {loading ? 'Activating...' : 'Activate & Connect to Betway'}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-xs text-gray-400">
        <p>Don't have a code? Sign up at one of our supported casinos:</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <span className="px-2 py-1 bg-aviator-dark/50 rounded text-gray-300">Betway</span>
          <span className="px-2 py-1 bg-aviator-dark/50 rounded text-gray-300">1win</span>
          <span className="px-2 py-1 bg-aviator-dark/50 rounded text-gray-300">1xBet</span>
          <span className="px-2 py-1 bg-aviator-dark/50 rounded text-gray-300">Bitcasino</span>
        </div>
      </div>
    </div>
  );
};

export default ActivationForm;
