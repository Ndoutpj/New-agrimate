import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CropSelector = ({ selectedCrop, setSelectedCrop, error }) => {
  const cropOptions = [
    { 
      value: 'wheat', 
      label: 'Wheat',
      description: 'Winter cereal crop - 400-600L per m² daily'
    },
    { 
      value: 'rice', 
      label: 'Rice',
      description: 'Water-intensive crop - 1000-1500L per m² daily'
    },
    { 
      value: 'corn', 
      label: 'Corn (Maize)',
      description: 'Summer crop - 500-800L per m² daily'
    },
    { 
      value: 'tomato', 
      label: 'Tomato',
      description: 'Vegetable crop - 300-500L per m² daily'
    },
    { 
      value: 'potato', 
      label: 'Potato',
      description: 'Root vegetable - 250-400L per m² daily'
    },
    { 
      value: 'cotton', 
      label: 'Cotton',
      description: 'Cash crop - 600-900L per m² daily'
    },
    { 
      value: 'soybean', 
      label: 'Soybean',
      description: 'Legume crop - 450-650L per m² daily'
    },
    { 
      value: 'sugarcane', 
      label: 'Sugarcane',
      description: 'High water requirement - 1200-1800L per m² daily'
    },
    { 
      value: 'barley', 
      label: 'Barley',
      description: 'Cereal crop - 350-550L per m² daily'
    },
    { 
      value: 'lettuce', 
      label: 'Lettuce',
      description: 'Leafy vegetable - 200-350L per m² daily'
    },
    { 
      value: 'carrot', 
      label: 'Carrot',
      description: 'Root vegetable - 250-400L per m² daily'
    },
    { 
      value: 'onion', 
      label: 'Onion',
      description: 'Bulb vegetable - 300-450L per m² daily'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Wheat" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Crop Type</h3>
      </div>
      <Select
        label="Select Crop"
        placeholder="Choose your crop type"
        options={cropOptions}
        value={selectedCrop}
        onChange={setSelectedCrop}
        error={error}
        searchable
        description="Select the primary crop you want to calculate water requirements for"
        className="transition-agricultural"
      />
      {selectedCrop && (
        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {cropOptions?.find(crop => crop?.value === selectedCrop)?.label} Information
              </h4>
              <p className="text-sm text-muted-foreground">
                {cropOptions?.find(crop => crop?.value === selectedCrop)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropSelector;