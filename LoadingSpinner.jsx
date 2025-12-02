import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Loading more images..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin">
          <Icon name="Loader2" size={32} className="text-primary" />
        </div>
      </div>
      <p className="text-muted-foreground text-sm mt-4">{message}</p>
    </div>
  );
};

export default LoadingSpinner;