import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TipCard = ({ tip, isBookmarked, onBookmarkToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success text-success-foreground';
      case 'Intermediate':
        return 'bg-warning text-warning-foreground';
      case 'Advanced':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSeasonColor = (season) => {
    switch (season) {
      case 'Spring':
        return 'bg-green-100 text-green-800';
      case 'Summer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fall':
        return 'bg-orange-100 text-orange-800';
      case 'Winter':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden elevation-1 hover:elevation-2 transition-agricultural-slow transform hover:scale-105 animate-grow">
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tip?.image}
          alt={tip?.title}
          className="w-full h-full object-cover"
        />
        
        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onBookmarkToggle(tip?.id)}
        >
          <Icon 
            name={isBookmarked ? "Heart" : "Heart"} 
            size={20} 
            color={isBookmarked ? "#DC2626" : "#6B7280"}
            className={isBookmarked ? "fill-current" : ""}
          />
        </Button>

        {/* Difficulty Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip?.difficulty)}`}>
          {tip?.difficulty}
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4">
        {/* Title and Season */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {tip?.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getSeasonColor(tip?.season)}`}>
            {tip?.season}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {tip?.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tip?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
            >
              #{tag}
            </span>
          ))}
          {tip?.tags?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{tip?.tags?.length - 3} more
            </span>
          )}
        </div>

        {/* Expand Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="w-full"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </Button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-grow">
            <div className="space-y-4">
              {/* Detailed Instructions */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="List" size={16} className="mr-2" />
                  Step-by-Step Instructions
                </h4>
                <div className="space-y-2">
                  {tip?.instructions?.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <p className="text-sm text-muted-foreground">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Time */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Clock" size={16} className="mr-2" />
                  Best Time
                </h4>
                <p className="text-sm text-muted-foreground">{tip?.bestTime}</p>
              </div>

              {/* Tools Needed */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Wrench" size={16} className="mr-2" />
                  Tools Needed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tip?.tools?.map((tool, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Resources */}
              {tip?.relatedResources && tip?.relatedResources?.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Related Resources
                  </h4>
                  <div className="space-y-1">
                    {tip?.relatedResources?.map((resource, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-sm text-primary hover:text-primary/80 transition-agricultural block"
                      >
                        • {resource}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipCard;