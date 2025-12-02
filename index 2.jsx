import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/ui/Header';
import ImageCard from './components/ImageCard';
import FilterToolbar from './components/FilterToolbar';
import ImageLightbox from './components/ImageLightbox';
import LoadingSpinner from './components/LoadingSpinner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('masonry');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock gallery data
  const mockImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg",
      title: "Golden Wheat Field at Sunset",
      description: "A beautiful golden wheat field during harvest season, showcasing the beauty of sustainable agriculture and the rewards of hard work.",
      category: "Crops",
      tags: ["wheat", "harvest", "sunset", "golden hour"],
      views: 1247,
      likes: 89,
      isFavorited: false
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
      title: "Modern Greenhouse Technology",
      description: "State-of-the-art greenhouse facility demonstrating modern agricultural technology and controlled environment farming techniques.",
      category: "Technology",
      tags: ["greenhouse", "technology", "modern farming", "controlled environment"],
      views: 892,
      likes: 67,
      isFavorited: true
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg",
      title: "Organic Vegetable Garden",
      description: "Thriving organic vegetable garden showcasing sustainable farming practices and healthy crop rotation methods.",
      category: "Organic",
      tags: ["organic", "vegetables", "sustainable", "garden"],
      views: 1156,
      likes: 94,
      isFavorited: false
    },
    {
      id: 4,
      src: "https://images.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg",
      title: "Mountain Valley Farm",
      description: "Scenic mountain valley farm demonstrating how agriculture adapts to different geographical conditions and terrains.",
      category: "Landscape",
      tags: ["mountain", "valley", "scenic", "terrain"],
      views: 2341,
      likes: 156,
      isFavorited: false
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg",
      title: "Precision Agriculture Drone",
      description: "Agricultural drone technology being used for crop monitoring, pest detection, and precision farming applications.",
      category: "Technology",
      tags: ["drone", "precision agriculture", "monitoring", "technology"],
      views: 987,
      likes: 73,
      isFavorited: true
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
      title: "Corn Field Irrigation",
      description: "Efficient irrigation system in a corn field, demonstrating water conservation techniques and modern farming methods.",
      category: "Irrigation",
      tags: ["corn", "irrigation", "water management", "efficiency"],
      views: 1423,
      likes: 108,
      isFavorited: false
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/1595105/pexels-photo-1595105.jpeg",
      title: "Soil Health Testing",
      description: "Agricultural scientist testing soil health and nutrient levels to optimize crop growth and sustainable farming practices.",
      category: "Science",
      tags: ["soil testing", "science", "nutrients", "analysis"],
      views: 756,
      likes: 52,
      isFavorited: false
    },
    {
      id: 8,
      src: "https://images.pixabay.com/photo/2016/11/21/16/05/apples-1846137_1280.jpg",
      title: "Apple Orchard Harvest",
      description: "Traditional apple orchard during harvest season, showcasing fruit farming techniques and seasonal agricultural activities.",
      category: "Fruits",
      tags: ["apples", "orchard", "harvest", "fruit farming"],
      views: 1834,
      likes: 127,
      isFavorited: true
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      title: "Sustainable Farming Infographic",
      description: "Educational infographic explaining sustainable farming practices, crop rotation, and environmental conservation methods.",
      category: "Infographics",
      tags: ["infographic", "sustainable", "education", "conservation"],
      views: 2156,
      likes: 189,
      isFavorited: false
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/1595107/pexels-photo-1595107.jpeg",
      title: "Livestock and Pasture Management",
      description: "Well-managed pasture with healthy livestock, demonstrating integrated farming systems and animal husbandry practices.",
      category: "Livestock",
      tags: ["livestock", "pasture", "animal husbandry", "integrated farming"],
      views: 1267,
      likes: 85,
      isFavorited: false
    },
    {
      id: 11,
      src: "https://images.pixabay.com/photo/2017/05/09/03/46/sunflowers-2297149_1280.jpg",
      title: "Sunflower Field in Bloom",
      description: "Magnificent sunflower field in full bloom, representing the beauty of agricultural landscapes and crop diversity.",
      category: "Crops",
      tags: ["sunflowers", "bloom", "landscape", "diversity"],
      views: 3421,
      likes: 234,
      isFavorited: true
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
      title: "Hydroponic Growing System",
      description: "Modern hydroponic growing system showcasing soilless agriculture and water-efficient farming technologies.",
      category: "Technology",
      tags: ["hydroponics", "soilless", "water efficient", "modern"],
      views: 1089,
      likes: 76,
      isFavorited: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Images', count: mockImages?.length },
    { value: 'Crops', label: 'Crops', count: mockImages?.filter(img => img?.category === 'Crops')?.length },
    { value: 'Technology', label: 'Technology', count: mockImages?.filter(img => img?.category === 'Technology')?.length },
    { value: 'Organic', label: 'Organic', count: mockImages?.filter(img => img?.category === 'Organic')?.length },
    { value: 'Irrigation', label: 'Irrigation', count: mockImages?.filter(img => img?.category === 'Irrigation')?.length },
    { value: 'Livestock', label: 'Livestock', count: mockImages?.filter(img => img?.category === 'Livestock')?.length },
    { value: 'Infographics', label: 'Infographics', count: mockImages?.filter(img => img?.category === 'Infographics')?.length }
  ];

  // Initialize images on component mount
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setImages(mockImages?.slice(0, 8));
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter images based on active category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images?.filter(image => image?.category === activeCategory));
    }
  }, [images, activeCategory]);

  // Handle infinite scroll
  const loadMoreImages = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const nextImages = mockImages?.slice(images?.length, images?.length + 4);
      if (nextImages?.length > 0) {
        setImages(prev => [...prev, ...nextImages]);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [images?.length, isLoading, hasMore]);

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement?.scrollTop >= document.documentElement?.offsetHeight - 1000) {
        loadMoreImages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreImages]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const handleLightboxNavigate = (image) => {
    setSelectedImage(image);
  };

  const handleFavoriteToggle = (imageId, isFavorited) => {
    setImages(prev => prev?.map(img => 
      img?.id === imageId ? { ...img, isFavorited } : img
    ));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon name="Images" size={32} className="text-primary" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Agricultural Gallery
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover inspiring farm photos, educational infographics, and visual stories that showcase the beauty and innovation of modern agriculture.
              </p>
              <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Image" size={16} />
                  <span>{mockImages?.length} Images</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={16} />
                  <span>{categories?.length - 1} Categories</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={16} />
                  <span>Free Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Filter Toolbar */}
            <FilterToolbar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />

            {/* Images Grid */}
            <div className={`${
              viewMode === 'masonry' ?'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4' :'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            }`}>
              {filteredImages?.map((image) => (
                <div key={image?.id} className={viewMode === 'masonry' ? 'break-inside-avoid' : ''}>
                  <ImageCard
                    image={image}
                    onImageClick={handleImageClick}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                </div>
              ))}
            </div>

            {/* Loading Spinner */}
            {isLoading && <LoadingSpinner />}

            {/* No More Images Message */}
            {!hasMore && !isLoading && (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  You've seen all images!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Check back later for new agricultural content and inspiration.
                </p>
                <Button
                  variant="outline"
                  onClick={scrollToTop}
                  iconName="ArrowUp"
                  iconPosition="left"
                >
                  Back to Top
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredImages?.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <Icon name="ImageOff" size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No images found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try selecting a different category or check back later for new content.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveCategory('all')}
                >
                  Show All Images
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      {/* Image Lightbox */}
      <ImageLightbox
        image={selectedImage}
        images={filteredImages}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
      {/* Scroll to Top Button */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 z-40 shadow-lg"
        onClick={scrollToTop}
        style={{ display: 'block' }}
      >
        <Icon name="ArrowUp" size={20} />
      </Button>
    </div>
  );
};

export default Gallery;