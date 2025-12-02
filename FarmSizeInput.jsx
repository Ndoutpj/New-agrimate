import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FarmSizeInput = ({ 
  farmSize, 
  setFarmSize, 
  unit, 
  setUnit, 
  error 
}) => {
  const unitOptions = [
    { value: 'sqm', label: 'Square Meters (m²)' },
    { value: 'hectares', label: 'Hectares (ha)' }
  ];

  const handleSizeChange = (e) => {
    const value = e?.target?.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      setFarmSize(value);
    }
  };

  const getConversionText = () => {
    if (!farmSize || isNaN(farmSize)) return '';
    
    const size = parseFloat(farmSize);
    if (unit === 'sqm') {
      const hectares = (size / 10000)?.toFixed(4);
      return `≈ ${hectares} hectares`;
    } else {
      const sqm = (size * 10000)?.toLocaleString();
      return `≈ ${sqm} m²`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Ruler" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Farm Size</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          label="Size"
          placeholder="Enter farm size"
          value={farmSize}
          onChange={handleSizeChange}
          error={error}
          min="0"
          step="0.01"
          className="transition-agricultural"
        />
        
        <Select
          label="Unit"
          options={unitOptions}
          value={unit}
          onChange={setUnit}
          className="transition-agricultural"
        />
      </div>
      
      {farmSize && !isNaN(farmSize) && (
        <div className="p-3 bg-muted rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Calculator" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Conversion: {getConversionText()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmSizeInput;