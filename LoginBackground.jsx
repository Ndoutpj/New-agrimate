import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      
      {/* Animated Elements */}
      <div className="absolute inset-0">
        {/* Floating Clouds */}
        <div className="absolute top-20 left-10 animate-cloud opacity-30">
          <Icon name="Cloud" size={60} color="var(--color-muted-foreground)" />
        </div>
        <div className="absolute top-32 right-20 animate-cloud opacity-20" style={{ animationDelay: '5s' }}>
          <Icon name="Cloud" size={80} color="var(--color-muted-foreground)" />
        </div>
        <div className="absolute top-60 left-1/4 animate-cloud opacity-25" style={{ animationDelay: '10s' }}>
          <Icon name="Cloud" size={50} color="var(--color-muted-foreground)" />
        </div>

        {/* Growing Plants */}
        <div className="absolute bottom-20 left-16 animate-grow opacity-20" style={{ animationDelay: '2s' }}>
          <Icon name="Sprout" size={40} color="var(--color-primary)" />
        </div>
        <div className="absolute bottom-32 right-16 animate-grow opacity-15" style={{ animationDelay: '4s' }}>
          <Icon name="TreePine" size={60} color="var(--color-secondary)" />
        </div>
        <div className="absolute bottom-40 left-1/3 animate-grow opacity-25" style={{ animationDelay: '6s' }}>
          <Icon name="Flower" size={35} color="var(--color-accent)" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 opacity-10">
          <Icon name="Sun" size={100} color="var(--color-accent)" />
        </div>
        <div className="absolute bottom-1/4 left-8 opacity-15">
          <Icon name="Wheat" size={45} color="var(--color-secondary)" />
        </div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
    </div>
  );
};

export default LoginBackground;