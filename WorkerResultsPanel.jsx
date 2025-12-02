import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkerResultsPanel = ({ results, isVisible }) => {
  if (!isVisible || !results) return null;

  const { totalWorkers, workingDays, phases, totalCost, efficiency } = results?.workers;

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 animate-grow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
          <Icon name="Users" size={24} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Worker Requirements
          </h3>
          <p className="text-sm text-muted-foreground">
            Labor estimates for {results?.cropType} cultivation
          </p>
        </div>
      </div>
      {/* Main Worker Count */}
      <div className="bg-accent/5 rounded-lg p-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-accent mb-2">
            {totalWorkers}
          </div>
          <div className="text-sm text-muted-foreground">
            Workers Needed
          </div>
        </div>
      </div>
      {/* Phase Breakdown */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Work Phase Breakdown:</h4>
        
        {phases?.map((phase, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={phase?.icon} size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm font-medium text-foreground">{phase?.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {phase?.workers} workers
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {phase?.duration} days • {phase?.description}
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">Duration</span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {workingDays} days
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">Est. Cost</span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            ${totalCost}
          </div>
        </div>
      </div>
      {/* Efficiency Indicator */}
      <div className="bg-secondary/5 rounded-lg p-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} color="var(--color-secondary)" />
            <span className="text-sm font-medium text-foreground">Efficiency Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-lg font-semibold text-secondary">{efficiency}%</div>
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary transition-all duration-500"
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Worker Animation */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2 text-accent">
          <Icon name="User" size={16} className="animate-pulse" />
          <Icon name="User" size={20} className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Icon name="User" size={16} className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <span className="text-sm font-medium ml-2">Working...</span>
        </div>
      </div>
      {/* Labor Tips */}
      <div className="p-4 bg-warning/5 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Labor Management Tips:</p>
            <p>• Plan for 10% extra workers during peak seasons</p>
            <p>• Consider local wage rates and availability</p>
            <p>• Schedule work phases to avoid weather delays</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerResultsPanel;