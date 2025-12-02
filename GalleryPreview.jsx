import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GalleryPreview = () => {
  const navigate = useNavigate();

  const previewImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400",
      alt: "Healthy corn field",
      category: "Crops"
    },
    {
      id: 2,
      src: "https://images.pixabay.com/photo/2016/08/12/22/34/agriculture-1589923_960_720.jpg",
      alt: "Modern farming equipment",
      category: "Equipment"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80",
      alt: "Irrigation system in action",
      category: "Irrigation"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400",
      alt: "Fresh vegetables harvest",
      category: "Harvest"
    },
    {
      id: 5,
      src: "https://images.pixabay.com/photo/2017/05/12/13/25/agriculture-2306830_960_720.jpg",
      alt: "Sustainable farming practices",
      category: "Sustainability"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
      alt: "Greenhouse cultivation",
      category: "Greenhouse"
    }
  ];

  const handleViewGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="bg-card rounded-2xl p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Farm Gallery</h3>
          <p className="text-sm text-muted-foreground">Inspiring agricultural moments</p>
        </div>
        <button
          onClick={handleViewGallery}
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-agricultural text-sm font-medium touch-target"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {previewImages?.slice(0, 6)?.map((image, index) => (
          <div 
            key={image?.id}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            onClick={handleViewGallery}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Image
              src={image?.src}
              alt={image?.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-agricultural-slow animate-grow"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-agricultural flex items-center justify-center">
              <div className="text-white text-center">
                <Icon name="Eye" size={20} className="mx-auto mb-1" />
                <span className="text-xs font-medium">{image?.category}</span>
              </div>
            </div>

            {/* Growing plant animation for first image */}
            {index === 0 && (
              <div className="absolute bottom-2 right-2 text-white animate-grow">
                <Icon name="Sprout" size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleViewGallery}
          className="w-full bg-muted hover:bg-muted/80 text-foreground py-3 rounded-lg transition-agricultural flex items-center justify-center space-x-2 touch-target"
        >
          <Icon name="Images" size={18} />
          <span className="font-medium">Explore Full Gallery</span>
        </button>
      </div>
    </div>
  );
};

export default GalleryPreview;