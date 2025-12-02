import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WaterResults = ({ results, isCalculating }) => {
  const [animatedDaily, setAnimatedDaily] = useState(0);
  const [animatedWeekly, setAnimatedWeekly] = useState(0);
  const [animatedMonthly, setAnimatedMonthly] = useState(0);

  useEffect(() => {
    if (results) {
      // Animate numbers counting up
      const duration = 1000;
      const steps = 50;
      const dailyStep = results?.daily / steps;
      const weeklyStep = results?.weekly / steps;
      const monthlyStep = results?.monthly / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setAnimatedDaily(Math.round(dailyStep * currentStep));
        setAnimatedWeekly(Math.round(weeklyStep * currentStep));
        setAnimatedMonthly(Math.round(monthlyStep * currentStep));

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedDaily(results?.daily);
          setAnimatedWeekly(results?.weekly);
          setAnimatedMonthly(results?.monthly);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [results]);

  if (isCalculating) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="relative">
              <Icon name="Droplets" size={48} className="text-primary animate-pulse mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer rounded-full"></div>
            </div>
            <p className="text-muted-foreground">Calculating water requirements...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <Icon name="Calculator" size={48} className="text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Calculate</h3>
              <p className="text-muted-foreground">
                Enter your farm size and select a crop type to see water requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  const getEfficiencyTip = () => {
    const tips = [
      "Consider drip irrigation to reduce water usage by 30-50%",
      "Mulching can reduce water evaporation by up to 70%",
      "Water early morning or evening to minimize evaporation",
      "Install soil moisture sensors for precise irrigation timing",
      "Use rainwater harvesting to supplement irrigation needs"
    ];
    return tips?.[Math.floor(Math.random() * tips?.length)];
  };

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <div className="bg-card rounded-xl border border-border p-6 animate-grow">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Droplets" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">Water Requirements</h3>
            <p className="text-sm text-muted-foreground">
              For {results?.cropName} on {results?.farmSize} {results?.unit}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Daily Requirement */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Sun" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Daily</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(animatedDaily)}
                </div>
                <div className="text-sm text-muted-foreground">liters</div>
              </div>
            </div>
          </div>

          {/* Weekly Requirement */}
          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="text-secondary" />
                <span className="font-medium text-foreground">Weekly</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-secondary">
                  {formatNumber(animatedWeekly)}
                </div>
                <div className="text-sm text-muted-foreground">liters</div>
              </div>
            </div>
          </div>

          {/* Monthly Requirement */}
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="CalendarDays" size={20} className="text-accent" />
                <span className="font-medium text-foreground">Monthly</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">
                  {formatNumber(animatedMonthly)}
                </div>
                <div className="text-sm text-muted-foreground">liters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Efficiency Tip Card */}
      <div className="bg-success/5 rounded-xl border border-success/20 p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">💡 Water Efficiency Tip</h4>
            <p className="text-sm text-muted-foreground">{getEfficiencyTip()}</p>
          </div>
        </div>
      </div>
      {/* Cost Estimation */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="DollarSign" size={18} className="text-muted-foreground" />
          <h4 className="font-medium text-foreground">Estimated Water Cost</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Daily:</span>
            <span className="ml-2 font-medium">${(results?.daily * 0.001)?.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Monthly:</span>
            <span className="ml-2 font-medium">${(results?.monthly * 0.001)?.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          *Based on average water cost of $0.001 per liter
        </p>
      </div>
    </div>
  );
};

export default WaterResults;