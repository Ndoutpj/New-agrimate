import React from 'react';
import Icon from '../../../components/AppIcon';

const SeedResultsPanel = ({ results, isVisible }) => {
  if (!isVisible || !results) return null;

  const { seedQuantity, seedWeight, plantingDensity, seedCost, coverage } = results?.seeds;

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 animate-grow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
          <Icon name="Sprout" size={24} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Seed Requirements
          </h3>
          <p className="text-sm text-muted-foreground">
            Calculated for {results?.cropType} on {results?.farmSize} {results?.unit}
          </p>
        </div>
      </div>
      {/* Main Seed Quantity */}
      <div className="bg-success/5 rounded-lg p-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-success mb-2">
            {seedQuantity?.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Seeds Required
          </div>
        </div>
      </div>
      {/* Detailed Breakdown */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Weight" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm font-medium text-foreground">Weight</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {seedWeight} kg
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Grid3X3" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm font-medium text-foreground">Density</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {plantingDensity}/m²
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="DollarSign" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm font-medium text-foreground">Est. Cost</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              ${seedCost}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm font-medium text-foreground">Coverage</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {coverage}%
            </div>
          </div>
        </div>
      </div>
      {/* Growing Animation */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-2 text-success animate-pulse">
          <Icon name="Sprout" size={20} />
          <Icon name="Sprout" size={24} />
          <Icon name="Sprout" size={20} />
          <span className="text-sm font-medium ml-2">Growing...</span>
        </div>
      </div>
      {/* Additional Info */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Planting Tips:</p>
            <p>• Add 10-15% extra seeds for potential losses</p>
            <p>• Store seeds in cool, dry conditions</p>
            <p>• Check germination rate before planting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedResultsPanel;