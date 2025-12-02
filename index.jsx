import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import InputForm from './components/InputForm';
import SeedResultsPanel from './components/SeedResultsPanel';
import WorkerResultsPanel from './components/WorkerResultsPanel';
import ComparisonTool from './components/ComparisonTool';
import ExportPanel from './components/ExportPanel';
import Icon from '../../components/AppIcon';

const SeedWorkerEstimator = () => {
  const [farmSize, setFarmSize] = useState('');
  const [unit, setUnit] = useState('sqm');
  const [cropType, setCropType] = useState('');
  const [plantingMethod, setPlantingMethod] = useState('direct');
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock crop database with seed and worker requirements
  const cropDatabase = {
    wheat: {
      seedsPerSqm: 350,
      seedWeight: 0.045, // grams per seed
      plantingDensity: 300,
      seedCostPerKg: 2.5,
      workersPerHectare: 3,
      workingDaysPerHectare: 45,
      phases: [
        { name: 'Land Preparation', workers: 2, duration: 5, icon: 'Tractor', description: 'Plowing and soil preparation' },
        { name: 'Planting', workers: 4, duration: 3, icon: 'Sprout', description: 'Seed sowing and initial setup' },
        { name: 'Maintenance', workers: 2, duration: 30, icon: 'Wrench', description: 'Watering, weeding, fertilizing' },
        { name: 'Harvesting', workers: 6, duration: 7, icon: 'Scissors', description: 'Crop harvesting and collection' }
      ]
    },
    rice: {
      seedsPerSqm: 200,
      seedWeight: 0.025,
      plantingDensity: 180,
      seedCostPerKg: 3.0,
      workersPerHectare: 4,
      workingDaysPerHectare: 55,
      phases: [
        { name: 'Field Preparation', workers: 3, duration: 7, icon: 'Tractor', description: 'Flooding and soil preparation' },
        { name: 'Transplanting', workers: 6, duration: 4, icon: 'Sprout', description: 'Seedling transplantation' },
        { name: 'Water Management', workers: 2, duration: 35, icon: 'Droplets', description: 'Irrigation and pest control' },
        { name: 'Harvesting', workers: 8, duration: 9, icon: 'Scissors', description: 'Rice harvesting and drying' }
      ]
    },
    corn: {
      seedsPerSqm: 6,
      seedWeight: 0.3,
      plantingDensity: 5,
      seedCostPerKg: 4.5,
      workersPerHectare: 2,
      workingDaysPerHectare: 35,
      phases: [
        { name: 'Land Preparation', workers: 2, duration: 4, icon: 'Tractor', description: 'Soil tilling and preparation' },
        { name: 'Planting', workers: 3, duration: 2, icon: 'Sprout', description: 'Corn seed planting' },
        { name: 'Cultivation', workers: 2, duration: 25, icon: 'Wrench', description: 'Weeding and fertilizing' },
        { name: 'Harvesting', workers: 4, duration: 4, icon: 'Scissors', description: 'Corn harvesting' }
      ]
    },
    soybeans: {
      seedsPerSqm: 45,
      seedWeight: 0.15,
      plantingDensity: 40,
      seedCostPerKg: 3.8,
      workersPerHectare: 2,
      workingDaysPerHectare: 30,
      phases: [
        { name: 'Soil Preparation', workers: 2, duration: 3, icon: 'Tractor', description: 'Field preparation' },
        { name: 'Seeding', workers: 2, duration: 2, icon: 'Sprout', description: 'Soybean planting' },
        { name: 'Crop Care', workers: 1, duration: 20, icon: 'Wrench', description: 'Maintenance and care' },
        { name: 'Harvesting', workers: 3, duration: 5, icon: 'Scissors', description: 'Soybean harvesting' }
      ]
    },
    tomatoes: {
      seedsPerSqm: 4,
      seedWeight: 0.003,
      plantingDensity: 3,
      seedCostPerKg: 25.0,
      workersPerHectare: 8,
      workingDaysPerHectare: 80,
      phases: [
        { name: 'Bed Preparation', workers: 3, duration: 5, icon: 'Tractor', description: 'Raised bed preparation' },
        { name: 'Transplanting', workers: 6, duration: 3, icon: 'Sprout', description: 'Seedling transplantation' },
        { name: 'Daily Care', workers: 4, duration: 60, icon: 'Wrench', description: 'Watering, pruning, support' },
        { name: 'Harvesting', workers: 12, duration: 12, icon: 'Scissors', description: 'Continuous harvesting' }
      ]
    },
    potatoes: {
      seedsPerSqm: 3,
      seedWeight: 50, // seed potatoes are much heavier
      plantingDensity: 2.5,
      seedCostPerKg: 1.8,
      workersPerHectare: 5,
      workingDaysPerHectare: 40,
      phases: [
        { name: 'Field Preparation', workers: 3, duration: 4, icon: 'Tractor', description: 'Deep plowing and ridging' },
        { name: 'Planting', workers: 6, duration: 3, icon: 'Sprout', description: 'Seed potato planting' },
        { name: 'Cultivation', workers: 3, duration: 25, icon: 'Wrench', description: 'Hilling and pest control' },
        { name: 'Harvesting', workers: 8, duration: 8, icon: 'Scissors', description: 'Potato harvesting' }
      ]
    },
    onions: {
      seedsPerSqm: 80,
      seedWeight: 0.004,
      plantingDensity: 70,
      seedCostPerKg: 15.0,
      workersPerHectare: 6,
      workingDaysPerHectare: 60,
      phases: [
        { name: 'Bed Preparation', workers: 2, duration: 4, icon: 'Tractor', description: 'Fine soil preparation' },
        { name: 'Seeding', workers: 4, duration: 2, icon: 'Sprout', description: 'Direct seeding or transplanting' },
        { name: 'Maintenance', workers: 3, duration: 45, icon: 'Wrench', description: 'Weeding and irrigation' },
        { name: 'Harvesting', workers: 8, duration: 9, icon: 'Scissors', description: 'Onion harvesting and curing' }
      ]
    },
    carrots: {
      seedsPerSqm: 1000,
      seedWeight: 0.001,
      plantingDensity: 800,
      seedCostPerKg: 20.0,
      workersPerHectare: 4,
      workingDaysPerHectare: 50,
      phases: [
        { name: 'Soil Preparation', workers: 2, duration: 3, icon: 'Tractor', description: 'Deep, loose soil preparation' },
        { name: 'Seeding', workers: 3, duration: 2, icon: 'Sprout', description: 'Precision seeding' },
        { name: 'Thinning & Care', workers: 4, duration: 35, icon: 'Wrench', description: 'Thinning and maintenance' },
        { name: 'Harvesting', workers: 6, duration: 10, icon: 'Scissors', description: 'Carrot harvesting' }
      ]
    },
    lettuce: {
      seedsPerSqm: 16,
      seedWeight: 0.001,
      plantingDensity: 12,
      seedCostPerKg: 30.0,
      workersPerHectare: 7,
      workingDaysPerHectare: 35,
      phases: [
        { name: 'Bed Preparation', workers: 2, duration: 2, icon: 'Tractor', description: 'Fine bed preparation' },
        { name: 'Transplanting', workers: 6, duration: 2, icon: 'Sprout', description: 'Seedling transplantation' },
        { name: 'Daily Care', workers: 3, duration: 25, icon: 'Wrench', description: 'Watering and pest control' },
        { name: 'Harvesting', workers: 10, duration: 6, icon: 'Scissors', description: 'Continuous harvesting' }
      ]
    },
    cabbage: {
      seedsPerSqm: 2,
      seedWeight: 0.003,
      plantingDensity: 1.8,
      seedCostPerKg: 18.0,
      workersPerHectare: 5,
      workingDaysPerHectare: 65,
      phases: [
        { name: 'Field Preparation', workers: 2, duration: 3, icon: 'Tractor', description: 'Soil preparation and fertilizing' },
        { name: 'Transplanting', workers: 4, duration: 3, icon: 'Sprout', description: 'Cabbage seedling transplanting' },
        { name: 'Cultivation', workers: 3, duration: 50, icon: 'Wrench', description: 'Weeding and pest management' },
        { name: 'Harvesting', workers: 6, duration: 9, icon: 'Scissors', description: 'Cabbage harvesting' }
      ]
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!farmSize || parseFloat(farmSize) <= 0) {
      newErrors.farmSize = 'Please enter a valid farm size';
    }

    if (!unit) {
      newErrors.unit = 'Please select a unit';
    }

    if (!cropType) {
      newErrors.cropType = 'Please select a crop type';
    }

    if (!plantingMethod) {
      newErrors.plantingMethod = 'Please select a planting method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const convertToSquareMeters = (size, unit) => {
    switch (unit) {
      case 'hectares':
        return size * 10000;
      case 'acres':
        return size * 4047;
      default:
        return size;
    }
  };

  const calculateRequirements = async () => {
    if (!validateForm()) return;

    setIsCalculating(true);
    
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const sizeInSqm = convertToSquareMeters(parseFloat(farmSize), unit);
    const sizeInHectares = sizeInSqm / 10000;
    const cropData = cropDatabase?.[cropType];

    if (!cropData) {
      setIsCalculating(false);
      return;
    }

    // Calculate seed requirements
    const baseSeeds = Math.ceil(sizeInSqm * cropData?.seedsPerSqm);
    const methodMultiplier = plantingMethod === 'broadcast' ? 1.2 : plantingMethod === 'transplant' ? 0.8 : 1.0;
    const seedQuantity = Math.ceil(baseSeeds * methodMultiplier);
    const seedWeightKg = (seedQuantity * cropData?.seedWeight) / 1000;
    const seedCost = Math.ceil(seedWeightKg * cropData?.seedCostPerKg);

    // Calculate worker requirements
    const totalWorkers = Math.ceil(sizeInHectares * cropData?.workersPerHectare);
    const workingDays = Math.ceil(sizeInHectares * cropData?.workingDaysPerHectare);
    const dailyWage = 50; // $50 per day per worker
    const totalCost = Math.ceil(totalWorkers * workingDays * dailyWage * 0.7); // 0.7 factor for efficiency

    const calculatedResults = {
      farmSize,
      unit,
      cropType,
      plantingMethod,
      seeds: {
        seedQuantity,
        seedWeight: seedWeightKg?.toFixed(1),
        plantingDensity: cropData?.plantingDensity,
        seedCost,
        coverage: 95
      },
      workers: {
        totalWorkers,
        workingDays,
        phases: cropData?.phases,
        totalCost,
        efficiency: Math.min(95, 70 + Math.floor(Math.random() * 25))
      }
    };

    setResults(calculatedResults);
    setIsCalculating(false);
  };

  const handleCompare = (compareWithCrop) => {
    // Mock comparison logic
    console.log(`Comparing ${cropType} with ${compareWithCrop}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
                  <Icon name="Calculator" size={32} color="var(--color-primary)" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Seed & Worker Estimator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate precise seed quantities and labor requirements for your farming operations. 
                Plan efficiently with our dual estimation tool.
              </p>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-cloud" />
              <div className="absolute top-40 right-20 w-16 h-16 bg-accent/5 rounded-full animate-cloud" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-success/5 rounded-full animate-cloud" style={{ animationDelay: '4s' }} />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Input Form */}
            <div className="mb-8">
              <InputForm
                farmSize={farmSize}
                setFarmSize={setFarmSize}
                unit={unit}
                setUnit={setUnit}
                cropType={cropType}
                setCropType={setCropType}
                plantingMethod={plantingMethod}
                setPlantingMethod={setPlantingMethod}
                onCalculate={calculateRequirements}
                isCalculating={isCalculating}
                errors={errors}
              />
            </div>

            {/* Results Section */}
            {results && (
              <div className="space-y-8">
                {/* Dual Results Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SeedResultsPanel results={results} isVisible={!!results} />
                  <WorkerResultsPanel results={results} isVisible={!!results} />
                </div>

                {/* Additional Tools */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ComparisonTool currentResults={results} onCompare={handleCompare} />
                  <ExportPanel results={results} />
                </div>

                {/* Success Message */}
                <div className="bg-success/5 border border-success/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={24} color="var(--color-success)" />
                    <div>
                      <h3 className="text-lg font-semibold text-success">
                        Calculations Complete!
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your seed and worker requirements have been calculated successfully. 
                        Review the results above and export them for your records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isCalculating && (
              <div className="bg-card rounded-xl p-12 text-center elevation-2">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin">
                    <Icon name="Calculator" size={32} color="var(--color-primary)" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Calculating Requirements...
                </h3>
                <p className="text-muted-foreground">
                  Processing your farm data and generating precise estimates
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-12 bg-muted/30 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={20} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    How to Use This Tool
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• Enter your farm size in square meters, hectares, or acres</p>
                    <p>• Select the crop you want to plant from our comprehensive database</p>
                    <p>• Choose your preferred planting method for accurate calculations</p>
                    <p>• Click calculate to get both seed quantities and worker requirements</p>
                    <p>• Use the comparison tool to evaluate different crop options</p>
                    <p>• Export your results as PDF or CSV for future reference</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SeedWorkerEstimator;