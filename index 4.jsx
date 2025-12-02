import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import TipsGrid from './components/TipsGrid';

const FarmingTips = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedTips, setBookmarkedTips] = useState([]);

  // Load bookmarked tips from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('agriMateBookmarks');
    if (savedBookmarks) {
      setBookmarkedTips(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarked tips to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem('agriMateBookmarks', JSON.stringify(bookmarkedTips));
  }, [bookmarkedTips]);

  const categories = [
    { id: 'all', name: 'All Tips', icon: 'Grid3X3' },
    { id: 'planting', name: 'Planting Seasons', icon: 'Sprout' },
    { id: 'pest', name: 'Pest Control', icon: 'Bug' },
    { id: 'soil', name: 'Soil Care', icon: 'Mountain' },
    { id: 'general', name: 'General Farming', icon: 'Tractor' }
  ];

  const farmingTips = [
    {
      id: 1,
      title: "Spring Planting Guide for Vegetables",
      description: "Learn the optimal timing and techniques for planting your favorite vegetables in spring season.",
      category: 'planting',
      difficulty: 'Beginner',
      season: 'Spring',
      image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg",
      tags: ['vegetables', 'timing', 'soil-prep'],
      instructions: [
        "Prepare soil by removing weeds and adding compost",
        "Check soil temperature - should be at least 50°F for most vegetables",
        "Plant seeds according to packet instructions for depth and spacing",
        "Water gently and consistently to maintain soil moisture",
        "Monitor for pests and diseases as plants emerge"
      ],
      bestTime: "Early spring after last frost date in your area",
      tools: ['Shovel', 'Rake', 'Watering can', 'Seeds', 'Compost'],
      relatedResources: [
        "USDA Planting Calendar",
        "Local Extension Office Guidelines"
      ]
    },
    {
      id: 2,
      title: "Natural Pest Control Methods",
      description: "Effective organic solutions to protect your crops from common pests without harmful chemicals.",
      category: 'pest',
      difficulty: 'Intermediate',
      season: 'Summer',
      image: "https://images.pixabay.com/photo/2016/08/09/21/54/yellow-1581540_1280.jpg",
      tags: ['organic', 'insects', 'prevention'],
      instructions: [
        "Identify the specific pests affecting your crops",
        "Introduce beneficial insects like ladybugs and lacewings",
        "Apply neem oil spray during early morning or evening",
        "Use companion planting with pest-repelling plants",
        "Install physical barriers like row covers when needed"
      ],
      bestTime: "Early morning or evening when beneficial insects are less active",
      tools: ['Spray bottle', 'Neem oil', 'Row covers', 'Magnifying glass'],
      relatedResources: [
        "Integrated Pest Management Guide",
        "Beneficial Insect Identification Chart"
      ]
    },
    {
      id: 3,
      title: "Soil pH Testing and Amendment",
      description: "Understanding and adjusting soil pH levels for optimal plant growth and nutrient absorption.",
      category: 'soil',
      difficulty: 'Intermediate',
      season: 'Fall',
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
      tags: ['pH', 'nutrients', 'testing'],
      instructions: [
        "Collect soil samples from different areas of your garden",
        "Use a pH testing kit or digital meter to measure acidity",
        "Add lime to raise pH or sulfur to lower pH as needed",
        "Mix amendments thoroughly into the top 6-8 inches of soil",
        "Retest soil pH after 2-3 months to monitor changes"
      ],
      bestTime: "Fall or early spring before planting season",
      tools: ['pH test kit', 'Soil auger', 'Lime or sulfur', 'Shovel'],
      relatedResources: [
        "Soil Testing Laboratory Directory",
        "pH Requirements by Crop Chart"
      ]
    },
    {
      id: 4,
      title: "Water Conservation Techniques",
      description: "Smart irrigation methods to reduce water usage while maintaining healthy crop growth.",
      category: 'general',
      difficulty: 'Advanced',
      season: 'Summer',
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
      tags: ['irrigation', 'conservation', 'efficiency'],
      instructions: [
        "Install drip irrigation systems for targeted watering",
        "Apply mulch around plants to retain soil moisture",
        "Water deeply but less frequently to encourage deep root growth",
        "Use rain gauges to monitor natural precipitation",
        "Collect rainwater in barrels for supplemental irrigation"
      ],
      bestTime: "Early morning to minimize evaporation losses",
      tools: ['Drip irrigation kit', 'Mulch', 'Rain gauge', 'Rain barrel'],
      relatedResources: [
        "Water-Wise Gardening Guide",
        "Drip Irrigation Installation Manual"
      ]
    },
    {
      id: 5,
      title: "Companion Planting Strategies",
      description: "Maximize garden productivity by planting complementary crops that benefit each other\'s growth.",
      category: 'planting',
      difficulty: 'Beginner',
      season: 'Spring',
      image: "https://images.pixabay.com/photo/2016/08/12/22/34/vegetables-1589099_1280.jpg",
      tags: ['companion', 'productivity', 'natural'],
      instructions: [
        "Research compatible plant combinations for your crops",
        "Plant nitrogen-fixing legumes near heavy feeders",
        "Use aromatic herbs to repel pests from vulnerable plants",
        "Arrange tall plants to provide shade for heat-sensitive crops",
        "Rotate companion plant locations each growing season"
      ],
      bestTime: "During regular planting season for each crop type",
      tools: ['Garden planner', 'Seeds', 'Measuring tape', 'Plant markers'],
      relatedResources: [
        "Companion Planting Chart",
        "Three Sisters Planting Guide"
      ]
    },
    {
      id: 6,
      title: "Composting for Healthy Soil",
      description: "Create nutrient-rich compost from kitchen scraps and yard waste to improve soil fertility.",
      category: 'soil',
      difficulty: 'Beginner',
      season: 'Fall',
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
      tags: ['compost', 'organic-matter', 'recycling'],
      instructions: [
        "Set up a compost bin in a partially shaded area",
        "Layer brown materials (leaves, paper) with green materials (food scraps)",
        "Maintain proper moisture levels - compost should feel like a wrung-out sponge",
        "Turn the pile every 2-3 weeks to provide oxygen",
        "Harvest finished compost after 3-6 months"
      ],
      bestTime: "Year-round activity, but fall provides abundant brown materials",
      tools: ['Compost bin', 'Pitchfork', 'Thermometer', 'Garden hose'],
      relatedResources: [
        "Home Composting Basics",
        "Troubleshooting Compost Problems"
      ]
    },
    {
      id: 7,
      title: "Winter Crop Protection",
      description: "Techniques to protect your crops from frost and cold weather damage during winter months.",
      category: 'general',
      difficulty: 'Intermediate',
      season: 'Winter',
      image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg",
      tags: ['frost-protection', 'winter', 'season-extension'],
      instructions: [
        "Monitor weather forecasts for frost warnings",
        "Cover sensitive plants with row covers or blankets",
        "Use water-filled containers to create thermal mass",
        "Apply thick mulch around plant bases for root protection",
        "Harvest remaining crops before hard freeze"
      ],
      bestTime: "Before first frost and throughout winter as needed",
      tools: ['Row covers', 'Blankets', 'Mulch', 'Water containers'],
      relatedResources: [
        "Frost Protection Methods",
        "Cold-Hardy Crop Varieties"
      ]
    },
    {
      id: 8,
      title: "Seed Starting Indoors",
      description: "Get a head start on the growing season by starting seeds indoors under controlled conditions.",
      category: 'planting',
      difficulty: 'Beginner',
      season: 'Winter',
      image: "https://images.pixabay.com/photo/2016/08/09/21/54/yellow-1581540_1280.jpg",
      tags: ['seeds', 'indoor', 'transplants'],
      instructions: [
        "Calculate planting dates based on last frost and transplant timing",
        "Use sterile seed starting mix in clean containers",
        "Provide adequate light with grow lights or sunny windows",
        "Maintain consistent moisture without overwatering",
        "Harden off seedlings gradually before transplanting outdoors"
      ],
      bestTime: "6-8 weeks before last expected frost date",
      tools: ['Seed trays', 'Seed starting mix', 'Grow lights', 'Heat mat'],
      relatedResources: [
        "Seed Starting Calendar",
        "Transplant Timing Guide"
      ]
    }
  ];

  // Filter tips based on category and search query
  const filteredTips = useMemo(() => {
    let filtered = farmingTips;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(tip => tip?.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(tip =>
        tip?.title?.toLowerCase()?.includes(query) ||
        tip?.description?.toLowerCase()?.includes(query) ||
        tip?.tags?.some(tag => tag?.toLowerCase()?.includes(query))
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const handleBookmarkToggle = (tipId) => {
    setBookmarkedTips(prev => {
      if (prev?.includes(tipId)) {
        return prev?.filter(id => id !== tipId);
      } else {
        return [...prev, tipId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="BookOpen" size={32} color="var(--color-primary)" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Expert Farming Tips & Guidance
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover proven agricultural techniques, seasonal advice, and best practices 
                to maximize your farming success throughout the year.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="Users" size={16} className="mr-2" />
                  <span>Expert Verified</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <span>Seasonal Guidance</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Leaf" size={16} className="mr-2" />
                  <span>Sustainable Methods</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Filters and Search */}
            <div className="mb-8">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {filteredTips?.length} tip{filteredTips?.length !== 1 ? 's' : ''}
                  {activeCategory !== 'all' && (
                    <span> in {categories?.find(cat => cat?.id === activeCategory)?.name}</span>
                  )}
                  {searchQuery && (
                    <span> for "{searchQuery}"</span>
                  )}
                </p>
                {bookmarkedTips?.length > 0 && (
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Icon name="Heart" size={16} className="mr-1 fill-current text-error" />
                    {bookmarkedTips?.length} bookmarked
                  </p>
                )}
              </div>
            </div>

            {/* Tips Grid */}
            <TipsGrid
              tips={filteredTips}
              bookmarkedTips={bookmarkedTips}
              onBookmarkToggle={handleBookmarkToggle}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Apply These Tips?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our farming calculators to plan your resources and get precise 
              estimates for water, seeds, and labor requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/water-calculator"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-agricultural"
              >
                <Icon name="Droplets" size={20} className="mr-2" />
                Water Calculator
              </a>
              <a
                href="/seed-worker-estimator"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-agricultural"
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Seed Estimator
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FarmingTips;