import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalculatorForm from './components/CalculatorForm';
import WaterResults from './components/WaterResults';

const WaterCalculator = () => {
  const [farmSize, setFarmSize] = useState('');
  const [unit, setUnit] = useState('sqm');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState({});

  // Crop water requirements (liters per square meter per day)
  const cropWaterRequirements = {
    wheat: { min: 4, max: 6, name: 'Wheat' },
    rice: { min: 10, max: 15, name: 'Rice' },
    corn: { min: 5, max: 8, name: 'Corn (Maize)' },
    tomato: { min: 3, max: 5, name: 'Tomato' },
    potato: { min: 2.5, max: 4, name: 'Potato' },
    cotton: { min: 6, max: 9, name: 'Cotton' },
    soybean: { min: 4.5, max: 6.5, name: 'Soybean' },
    sugarcane: { min: 12, max: 18, name: 'Sugarcane' },
    barley: { min: 3.5, max: 5.5, name: 'Barley' },
    lettuce: { min: 2, max: 3.5, name: 'Lettuce' },
    carrot: { min: 2.5, max: 4, name: 'Carrot' },
    onion: { min: 3, max: 4.5, name: 'Onion' }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!farmSize || farmSize <= 0) {
      newErrors.farmSize = 'Please enter a valid farm size greater than 0';
    }

    if (!selectedCrop) {
      newErrors.crop = 'Please select a crop type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const calculateWaterRequirements = async () => {
    if (!validateInputs()) return;

    setIsCalculating(true);
    setErrors({});

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const sizeInSqm = unit === 'hectares' ? parseFloat(farmSize) * 10000 : parseFloat(farmSize);
      const cropData = cropWaterRequirements?.[selectedCrop];
      
      // Use average water requirement
      const dailyPerSqm = (cropData?.min + cropData?.max) / 2;
      const dailyTotal = Math.round(sizeInSqm * dailyPerSqm);
      
      const calculationResults = {
        daily: dailyTotal,
        weekly: dailyTotal * 7,
        monthly: dailyTotal * 30,
        cropName: cropData?.name,
        farmSize: farmSize,
        unit: unit === 'sqm' ? 'square meters' : 'hectares',
        sizeInSqm: sizeInSqm,
        waterPerSqm: dailyPerSqm
      };

      setResults(calculationResults);
    } catch (error) {
      setErrors({ general: 'An error occurred during calculation. Please try again.' });
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => {
    setFarmSize('');
    setUnit('sqm');
    setSelectedCrop('');
    setResults(null);
    setErrors({});
  };

  const navigateToRelatedTools = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="p-3 bg-primary rounded-xl">
                  <Icon name="Droplets" size={32} color="white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Water Calculator
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate precise daily water requirements for your crops based on farm size and crop type. 
                Make informed irrigation decisions with our smart agricultural tool.
              </p>
            </div>
          </div>
        </section>

        {/* Main Calculator Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <div className="order-2 lg:order-1">
                <CalculatorForm
                  farmSize={farmSize}
                  setFarmSize={setFarmSize}
                  unit={unit}
                  setUnit={setUnit}
                  selectedCrop={selectedCrop}
                  setSelectedCrop={setSelectedCrop}
                  errors={errors}
                  isCalculating={isCalculating}
                  onCalculate={calculateWaterRequirements}
                  onReset={resetForm}
                />
              </div>

              {/* Results Panel */}
              <div className="order-1 lg:order-2">
                <WaterResults 
                  results={results}
                  isCalculating={isCalculating}
                />
              </div>
            </div>

            {/* Error Display */}
            {errors?.general && (
              <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={20} className="text-error" />
                  <span className="text-error font-medium">{errors?.general}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Related Tools</h2>
              <p className="text-muted-foreground">
                Complete your farm planning with our other agricultural calculators
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Seed & Worker Estimator */}
              <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-agricultural">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Icon name="Calculator" size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Seed & Worker Estimator</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Calculate required seeds and labor for your farm size and crop type.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigateToRelatedTools('/seed-worker-estimator')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Calculate Now
                </Button>
              </div>

              {/* Farming Tips */}
              <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-agricultural">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon name="BookOpen" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Farming Tips</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Expert guidance on irrigation, planting seasons, and crop care.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigateToRelatedTools('/farming-tips')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Learn More
                </Button>
              </div>

              {/* Dashboard */}
              <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-agricultural">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Home" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Dashboard</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  View weather information and access all agricultural tools.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigateToRelatedTools('/home-dashboard')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Water Conservation Tips */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-success/5 rounded-2xl border border-success/20 p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Icon name="Leaf" size={28} className="text-success" />
                  <h2 className="text-2xl font-bold text-foreground">Water Conservation Tips</h2>
                </div>
                <p className="text-muted-foreground">
                  Maximize efficiency and minimize waste with these proven techniques
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Clock" size={20} className="text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Optimal Timing</h4>
                      <p className="text-sm text-muted-foreground">
                        Water early morning (5-9 AM) or evening (6-8 PM) to reduce evaporation
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Thermometer" size={20} className="text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Soil Monitoring</h4>
                      <p className="text-sm text-muted-foreground">
                        Use moisture sensors to avoid over-watering and ensure optimal soil conditions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Zap" size={20} className="text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Drip Irrigation</h4>
                      <p className="text-sm text-muted-foreground">
                        Install drip systems to deliver water directly to roots, saving 30-50%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Cloud" size={20} className="text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Rainwater Harvesting</h4>
                      <p className="text-sm text-muted-foreground">
                        Collect and store rainwater to supplement irrigation during dry periods
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Sprout" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">AgriMate</span>
            </div>
            <p className="text-muted-foreground">
              © {new Date()?.getFullYear()} AgriMate. Empowering farmers with smart agricultural tools.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WaterCalculator;