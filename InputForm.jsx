import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InputForm = ({ 
  farmSize, 
  setFarmSize, 
  unit, 
  setUnit, 
  cropType, 
  setCropType, 
  plantingMethod, 
  setPlantingMethod, 
  onCalculate, 
  isCalculating,
  errors 
}) => {
  const cropOptions = [
    { value: '', label: 'Select a crop type' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn (Maize)' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'onions', label: 'Onions' },
    { value: 'carrots', label: 'Carrots' },
    { value: 'lettuce', label: 'Lettuce' },
    { value: 'cabbage', label: 'Cabbage' }
  ];

  const unitOptions = [
    { value: 'sqm', label: 'Square Meters (m²)' },
    { value: 'hectares', label: 'Hectares (ha)' },
    { value: 'acres', label: 'Acres' }
  ];

  const plantingMethodOptions = [
    { value: 'direct', label: 'Direct Seeding' },
    { value: 'transplant', label: 'Transplanting' },
    { value: 'broadcast', label: 'Broadcasting' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 animate-grow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name="Calculator" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Seed & Worker Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Calculate seed quantities and labor requirements for your farm
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Farm Size Input */}
        <div className="space-y-4">
          <Input
            label="Farm Size"
            type="number"
            placeholder="Enter farm size"
            value={farmSize}
            onChange={(e) => setFarmSize(e?.target?.value)}
            error={errors?.farmSize}
            required
            min="0.1"
            step="0.1"
            description="Enter the total area of your farm"
          />
          
          <Select
            label="Unit"
            options={unitOptions}
            value={unit}
            onChange={setUnit}
            error={errors?.unit}
            required
          />
        </div>

        {/* Crop Selection */}
        <div className="space-y-4">
          <Select
            label="Crop Type"
            options={cropOptions}
            value={cropType}
            onChange={setCropType}
            error={errors?.cropType}
            required
            searchable
            description="Select the crop you want to plant"
          />
          
          <Select
            label="Planting Method"
            options={plantingMethodOptions}
            value={plantingMethod}
            onChange={setPlantingMethod}
            error={errors?.plantingMethod}
            required
            description="Choose your preferred planting technique"
          />
        </div>
      </div>
      {/* Calculate Button */}
      <div className="mt-8 flex justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={onCalculate}
          loading={isCalculating}
          iconName="Calculator"
          iconPosition="left"
          className="px-8"
        >
          Calculate Requirements
        </Button>
      </div>
    </div>
  );
};

export default InputForm;