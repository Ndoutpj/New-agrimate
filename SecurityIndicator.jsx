import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicator = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Authentication',
      description: 'Your data is protected with industry-standard encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information with third parties'
    },
    {
      icon: 'Eye',
      title: 'Transparent Practices',
      description: 'Clear privacy policy and data usage guidelines'
    }
  ];

  return (
    <div className="mt-8 bg-muted/30 rounded-xl p-6 border border-border/50">
      <div className="text-center mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Your Security Matters
        </h3>
        <p className="text-sm text-muted-foreground">
          AgriMate is committed to protecting your agricultural data
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span>SSL Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicator;