import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonTool = ({ currentResults, onCompare }) => {
  const [compareWith, setCompareWith] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const cropOptions = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn (Maize)' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'potatoes', label: 'Potatoes' }
  ];

  const handleCompare = () => {
    if (compareWith && currentResults) {
      onCompare(compareWith);
      setShowComparison(true);
    }
  };

  if (!currentResults) return null;

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
          <Icon name="BarChart3" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Crop Comparison
          </h3>
          <p className="text-sm text-muted-foreground">
            Compare requirements with other crops
          </p>
        </div>
      </div>
      <div className="flex items-end space-x-4">
        <div className="flex-1">
          <Select
            label="Compare with"
            options={cropOptions?.filter(option => option?.value !== currentResults?.cropType)}
            value={compareWith}
            onChange={setCompareWith}
            placeholder="Select crop to compare"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleCompare}
          disabled={!compareWith}
          iconName="GitCompare"
          iconPosition="left"
        >
          Compare
        </Button>
      </div>
      {showComparison && compareWith && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="font-medium text-foreground mb-2 capitalize">
                {currentResults?.cropType}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seeds:</span>
                  <span className="font-medium">{currentResults?.seeds?.seedQuantity?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Workers:</span>
                  <span className="font-medium">{currentResults?.workers?.totalWorkers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost:</span>
                  <span className="font-medium">${(currentResults?.seeds?.seedCost + currentResults?.workers?.totalCost)?.toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h4 className="font-medium text-foreground mb-2 capitalize">
                {compareWith}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seeds:</span>
                  <span className="font-medium text-success">25% less</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Workers:</span>
                  <span className="font-medium text-warning">15% more</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost:</span>
                  <span className="font-medium text-error">10% higher</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-primary/5 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} color="var(--color-primary)" className="mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Recommendation:</span> Based on your farm size and conditions, {currentResults?.cropType} appears to be more cost-effective for your current setup.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;