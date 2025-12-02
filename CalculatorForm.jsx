import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import FarmSizeInput from './FarmSizeInput';
import CropSelector from './CropSelector';

const CalculatorForm = ({
  farmSize,
  setFarmSize,
  unit,
  setUnit,
  selectedCrop,
  setSelectedCrop,
  errors,
  isCalculating,
  onCalculate,
  onReset
}) => {
  const canCalculate = farmSize && selectedCrop && !isCalculating;

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Calculator" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Water Calculator</h2>
          <p className="text-sm text-muted-foreground">
            Calculate precise water requirements for your crops
          </p>
        </div>
      </div>
      <FarmSizeInput
        farmSize={farmSize}
        setFarmSize={setFarmSize}
        unit={unit}
        setUnit={setUnit}
        error={errors?.farmSize}
      />
      <CropSelector
        selectedCrop={selectedCrop}
        setSelectedCrop={setSelectedCrop}
        error={errors?.crop}
      />
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onCalculate}
          disabled={!canCalculate}
          loading={isCalculating}
          iconName="Droplets"
          iconPosition="left"
          className="transition-agricultural"
        >
          {isCalculating ? 'Calculating...' : 'Calculate Water Needs'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          disabled={isCalculating}
          iconName="RotateCcw"
          iconPosition="left"
          className="transition-agricultural sm:w-auto"
        >
          Reset
        </Button>
      </div>
      {/* Quick Tips */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Quick Tips</span>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
          <li>• Water requirements vary by season and climate</li>
          <li>• Consider soil type and drainage in your planning</li>
          <li>• Monitor weather forecasts to adjust irrigation</li>
          <li>• These are baseline estimates - adjust for local conditions</li>
        </ul>
      </div>
    </div>
  );
};

export default CalculatorForm;