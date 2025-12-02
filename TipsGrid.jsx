import React from 'react';
import TipCard from './TipCard';

const TipsGrid = ({ tips, bookmarkedTips, onBookmarkToggle }) => {
  if (tips?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">No tips found</div>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tips?.map((tip) => (
        <TipCard
          key={tip?.id}
          tip={tip}
          isBookmarked={bookmarkedTips?.includes(tip?.id)}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  );
};

export default TipsGrid;