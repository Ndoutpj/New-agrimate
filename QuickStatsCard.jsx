import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = () => {
  const stats = [
    {
      id: 1,
      label: "Active Farms",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: "Tractor",
      color: "text-success"
    },
    {
      id: 2,
      label: "Water Saved",
      value: "2.3M L",
      change: "+8%",
      changeType: "positive",
      icon: "Droplets",
      color: "text-blue-500"
    },
    {
      id: 3,
      label: "Seeds Planted",
      value: "45.2K",
      change: "+15%",
      changeType: "positive",
      icon: "Sprout",
      color: "text-primary"
    },
    {
      id: 4,
      label: "Tips Shared",
      value: "892",
      change: "+23%",
      changeType: "positive",
      icon: "BookOpen",
      color: "text-accent"
    }
  ];

  return (
    <div className="bg-card rounded-2xl p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Community Impact</h3>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>This month</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat) => (
          <div key={stat?.id} className="text-center group">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3 group-hover:scale-110 transition-agricultural ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground animate-grow">
                {stat?.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.label}
              </div>
              <div className={`text-xs flex items-center justify-center space-x-1 ${
                stat?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>{stat?.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Join thousands of farmers making a difference with smart agriculture
        </p>
      </div>
    </div>
  );
};

export default QuickStatsCard;