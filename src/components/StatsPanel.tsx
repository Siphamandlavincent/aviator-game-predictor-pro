
import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, BarChart3, Activity, Percent } from 'lucide-react';

const StatsPanel = () => {
  // Sample stats data
  const stats = {
    accuracy: 94,
    totalPredictions: 1328,
    successRate: 92,
    averageMultiplier: 2.46
  };
  
  // Sample multiplier history
  const multiplierHistory = [
    2.34, 1.89, 3.45, 1.54, 2.12, 4.56, 2.23, 1.78, 2.87, 3.12
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border border-aviator-accent/20 col-span-1 md:col-span-2">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <LineChart className="mr-2 text-aviator-primary" size={20} />
          Algorithm Performance
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-aviator-dark/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Prediction Accuracy</div>
            <div className="flex items-end mt-1">
              <span className="text-2xl font-bold text-aviator-accent">{stats.accuracy}%</span>
              <span className="text-green-400 text-xs ml-2 mb-1">+2.1%</span>
            </div>
          </div>
          
          <div className="bg-aviator-dark/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Total Predictions</div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-white">{stats.totalPredictions}</span>
            </div>
          </div>
          
          <div className="bg-aviator-dark/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Success Rate</div>
            <div className="flex items-end mt-1">
              <span className="text-2xl font-bold text-green-400">{stats.successRate}%</span>
            </div>
          </div>
          
          <div className="bg-aviator-dark/50 p-3 rounded-lg">
            <div className="text-gray-400 text-sm">Avg. Multiplier</div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-white">{stats.averageMultiplier}x</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border border-aviator-accent/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <BarChart3 className="mr-2 text-aviator-primary" size={20} />
          Recent Multipliers
        </h2>
        
        <div className="h-36 flex items-end justify-between gap-1">
          {multiplierHistory.map((value, index) => {
            // Calculate bar height based on value (normalized)
            const maxHeight = 100; // maximum height in percentage
            const normalizedHeight = (value / 5) * maxHeight; // normalized to max of 5x
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-6 bg-gradient-to-t from-aviator-primary to-aviator-accent rounded-t`}
                  style={{ height: `${normalizedHeight}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-1">{value.toFixed(2)}x</span>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Card className="p-4 bg-aviator-secondary/80 backdrop-blur-sm border border-aviator-accent/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Activity className="mr-2 text-aviator-primary" size={20} />
          Prediction Quality
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Algorithm Confidence</span>
              <span className="text-sm text-aviator-accent">High</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-aviator-accent h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Data Reliability</span>
              <span className="text-sm text-green-400">Excellent</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Pattern Recognition</span>
              <span className="text-sm text-yellow-400">Good</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '76%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatsPanel;
