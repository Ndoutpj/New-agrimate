import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageLightbox = ({ image, images, isOpen, onClose, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (image && images) {
      const index = images?.findIndex(img => img?.id === image?.id);
      setCurrentIndex(index);
    }
  }, [image, images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images?.length - 1;
    setCurrentIndex(newIndex);
    onNavigate(images?.[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images?.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onNavigate(images?.[newIndex]);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image?.src;
    link.download = `${image?.title?.replace(/\s+/g, '_')}.jpg`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image?.title,
          text: image?.description,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">{image?.title}</h2>
            <div className="flex items-center space-x-2 text-sm opacity-75">
              <span>{currentIndex + 1} of {images?.length}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsZoomed(!isZoomed)}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-white hover:bg-white/20"
            >
              <Icon name="Share" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="text-white hover:bg-white/20"
            >
              <Icon name="Download" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Main Image */}
      <div className="flex items-center justify-center h-full p-4 pt-20 pb-20">
        <div className={`relative max-w-full max-h-full transition-transform duration-300 ${
          isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
        }`}>
          <Image
            src={image?.src}
            alt={image?.title}
            className="max-w-full max-h-full object-contain"
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>
      </div>
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
        disabled={images?.length <= 1}
      >
        <Icon name="ChevronLeft" size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
        disabled={images?.length <= 1}
      >
        <Icon name="ChevronRight" size={24} />
      </Button>
      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
        <div className="text-white max-w-4xl mx-auto">
          <p className="text-sm opacity-90 mb-2">{image?.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {image?.tags?.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm opacity-75">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Icon name="Eye" size={14} />
                <span>{image?.views} views</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Heart" size={14} />
                <span>{image?.likes} likes</span>
              </span>
            </div>
            <span>Category: {image?.category}</span>
          </div>
        </div>
      </div>
      {/* Mobile Touch Areas */}
      <div className="lg:hidden">
        <div 
          className="absolute left-0 top-20 bottom-20 w-20 cursor-pointer"
          onClick={handlePrevious}
        />
        <div 
          className="absolute right-0 top-20 bottom-20 w-20 cursor-pointer"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default ImageLightbox;