import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ImageCard = ({ image, onImageClick, onFavoriteToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(image?.isFavorited || false);

  const handleFavoriteClick = (e) => {
    e?.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavoriteToggle(image?.id, !isFavorited);
  };

  const handleImageClick = () => {
    onImageClick(image);
  };

  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-card elevation-1 hover:elevation-2 transition-agricultural"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleImageClick}
    >
      <div className="relative overflow-hidden">
        <Image
          src={image?.src}
          alt={image?.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{image?.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {image?.tags?.slice(0, 2)?.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span>{image?.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} />
                  <span>{image?.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 touch-target ${
            isFavorited 
              ? 'bg-red-500 text-white' :'bg-white/20 text-white hover:bg-white/30'
          }`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isFavorited ? 'fill-current' : ''} 
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            {image?.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;