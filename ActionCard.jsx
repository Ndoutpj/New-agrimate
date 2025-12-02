import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ActionCard = ({ title, description, icon, route, color = "primary", stats }) => {
  const navigate = useNavigate();

  const colorClasses = {
    primary: "from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
    secondary: "from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70",
    accent: "from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70",
    success: "from-success to-success/80 hover:from-success/90 hover:to-success/70"
  };

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-gradient-to-br ${colorClasses?.[color]} rounded-2xl p-6 text-white cursor-pointer transition-agricultural-slow hover:scale-105 hover:shadow-lg elevation-1 touch-target group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:scale-105 transition-agricultural">
            {title}
          </h3>
          <p className="text-sm opacity-90 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="ml-4 group-hover:scale-110 group-hover:rotate-12 transition-agricultural animate-grow">
          <Icon name={icon} size={32} color="white" />
        </div>
      </div>
      {stats && (
        <div className="flex items-center justify-between text-sm opacity-90 mt-4 pt-4 border-t border-white border-opacity-20">
          <span>{stats?.label}</span>
          <span className="font-semibold">{stats?.value}</span>
        </div>
      )}
      <div className="flex items-center justify-end mt-4">
        <div className="flex items-center space-x-1 text-sm opacity-90 group-hover:opacity-100 transition-agricultural">
          <span>Get Started</span>
          <Icon name="ArrowRight" size={16} color="white" className="group-hover:translate-x-1 transition-agricultural" />
        </div>
      </div>
    </div>
  );
};

export default ActionCard;