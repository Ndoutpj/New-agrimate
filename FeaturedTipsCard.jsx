import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedTipsCard = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const featuredTips = [
    {
      id: 1,
      title: "Optimal Planting Season",
      description: "Spring planting ensures maximum crop yield with proper soil temperature and moisture conditions.",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Planting",
      icon: "Sprout",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Natural Pest Control",
      description: "Companion planting with marigolds and basil naturally repels harmful insects while attracting beneficial ones.",
      image: "https://images.pixabay.com/photo/2016/08/12/22/34/agriculture-1589923_960_720.jpg",
      category: "Pest Control",
      icon: "Bug",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Soil Health Management",
      description: "Regular composting and crop rotation maintain soil fertility and prevent nutrient depletion.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
      category: "Soil Care",
      icon: "Mountain",
      readTime: "4 min read"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % featuredTips?.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredTips?.length]);

  const currentTip = featuredTips?.[currentTipIndex];

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev - 1 + featuredTips?.length) % featuredTips?.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev + 1) % featuredTips?.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden elevation-2 group">
      <div className="relative h-48 overflow-hidden">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
          <Image 
            src={currentTip?.image} 
            alt={currentTip?.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-agricultural-slow"
          />
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Navigation buttons */}
        <button 
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-agricultural touch-target"
          aria-label="Previous tip"
        >
          <Icon name="ChevronLeft" size={16} />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-agricultural touch-target"
          aria-label="Next tip"
        >
          <Icon name="ChevronRight" size={16} />
        </button>

        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <Icon name={currentTip?.icon} size={12} />
          <span>{currentTip?.category}</span>
        </div>
      </div>
      <div className="p-6">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-agricultural">
            {currentTip?.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {currentTip?.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{currentTip?.readTime}</span>
            </span>
            
            <div className="flex items-center space-x-1">
              {featuredTips?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentTipIndex(index);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`w-2 h-2 rounded-full transition-agricultural ${
                    index === currentTipIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  aria-label={`Go to tip ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTipsCard;