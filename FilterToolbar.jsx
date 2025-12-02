import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterToolbar = ({ categories, activeCategory, onCategoryChange, viewMode, onViewModeChange }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center">
            <Icon name="Filter" size={16} className="mr-1" />
            Filter by:
          </span>
          {categories?.map((category) => (
            <Button
              key={category?.value}
              variant={activeCategory === category?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category?.value)}
              className="transition-agricultural"
            >
              {category?.label}
              {category?.count && (
                <span className="ml-1 text-xs opacity-75">
                  ({category?.count})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">View:</span>
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="px-3 py-1"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'masonry' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('masonry')}
              className="px-3 py-1"
            >
              <Icon name="LayoutGrid" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;