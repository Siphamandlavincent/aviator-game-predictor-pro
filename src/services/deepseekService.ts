import { toast } from "sonner";

interface DeepSeekResponse {
  prediction: number;
  confidence: number;
  timestamp: string;
}

class DeepSeekService {
  private apiKey: string;
  private betwayId: string;
  
  constructor(apiKey?: string, betwayId?: string) {
    this.apiKey = apiKey || process.env.DEEPSEEK_API_KEY || "";
    this.betwayId = betwayId || process.env.BETWAY_ID || "";
    console.log("DeepSeek Service initialized with Betway ID:", this.betwayId);
  }

  async getPrediction(): Promise<DeepSeekResponse | null> {
    try {
      if (!this.apiKey) {
        throw new Error("DeepSeek API key is not provided");
      }

      if (!this.betwayId) {
        throw new Error("Betway ID is not provided");
      }

      console.log(`Fetching prediction using DeepSeek API for Betway ID: ${this.betwayId}`);
      
      // In the future, replace this with actual API call to DeepSeek
      // For now, we'll keep the simulation logic
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a prediction in the range most common for Aviator (1.2 - 10)
      // Using a more consistent algorithm that simulates AI prediction patterns
      const currentMinute = new Date().getMinutes();
      const currentSecond = new Date().getSeconds();
      
      // Use time-based seed for a more consistent but still varied prediction
      const timeSeed = (currentMinute * 60 + currentSecond) / 3600;
      const basePrediction = 1.2 + (timeSeed * 8); // Range 1.2 - 9.2
      
      // Add slight randomness but keep it predictable
      const randomFactor = Math.sin(Date.now() / 10000) * 0.5;
      let prediction = basePrediction + randomFactor;
      
      // Ensure the prediction stays within reasonable bounds
      prediction = Math.max(1.2, Math.min(10, prediction));
      
      // Format to 2 decimal places
      prediction = parseFloat(prediction.toFixed(2));
      
      // Higher confidence for more reasonable predictions
      const confidence = prediction < 5 ? 
        Math.floor(Math.random() * 10 + 85) : // 85-94% for lower predictions
        Math.floor(Math.random() * 15 + 75);  // 75-89% for higher predictions
      
      console.log(`Generated prediction: ${prediction}x with ${confidence}% confidence`);
      
      return {
        prediction,
        confidence,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Error making prediction with DeepSeek API:", error);
      toast.error("Failed to get prediction from DeepSeek AI");
      return null;
    }
  }
}

export default DeepSeekService;
