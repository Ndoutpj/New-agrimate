import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import WeatherCard from './components/WeatherCard';
import ActionCard from './components/ActionCard';
import FeaturedTipsCard from './components/FeaturedTipsCard';
import QuickStatsCard from './components/QuickStatsCard';
import GalleryPreview from './components/GalleryPreview';
import Icon from '../../components/AppIcon';

const HomeDashboard = () => {
  useEffect(() => {
    // Add growing animation to page elements on load
    const elements = document.querySelectorAll('.animate-grow');
    elements?.forEach((el, index) => {
      el.style.animationDelay = `${index * 200}ms`;
    });
  }, []);

  const actionCards = [
    {
      title: "Water Calculator",
      description: "Calculate precise irrigation requirements based on your crop type and farm size for optimal water usage.",
      icon: "Droplets",
      route: "/water-calculator",
      color: "primary",
      stats: { label: "Avg. Savings", value: "30%" }
    },
    {
      title: "Seed Estimator",
      description: "Determine the exact amount of seeds needed for your planting area with our intelligent estimation tool.",
      icon: "Sprout",
      route: "/seed-worker-estimator",
      color: "success",
      stats: { label: "Accuracy Rate", value: "95%" }
    },
    {
      title: "Worker Estimator",
      description: "Plan your labor requirements efficiently by calculating the optimal number of workers needed.",
      icon: "Users",
      route: "/seed-worker-estimator",
      color: "secondary",
      stats: { label: "Time Saved", value: "2 hrs" }
    },
    {
      title: "Farming Tips",
      description: "Access expert agricultural guidance covering planting seasons, pest control, and soil management.",
      icon: "BookOpen",
      route: "/farming-tips",
      color: "accent",
      stats: { label: "Tips Available", value: "150+" }
    }
  ];

  return (
    <>
      <Helmet>
        <title>Home Dashboard - AgriMate | Smart Farming Assistant</title>
        <meta name="description" content="Your agricultural command center with weather updates, calculation tools, and farming insights for optimal crop management." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section with Weather */}
          <section className="px-4 lg:px-6 py-8 bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 animate-grow">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Welcome to AgriMate
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your intelligent farming companion for smarter agriculture. Get weather updates, 
                  calculate resources, and access expert guidance all in one place.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <WeatherCard />
                </div>
                <div className="animate-grow" style={{ animationDelay: '400ms' }}>
                  <QuickStatsCard />
                </div>
              </div>
            </div>
          </section>

          {/* Action Cards Section */}
          <section className="px-4 lg:px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 animate-grow">
                  Smart Farming Tools
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Powerful calculators and estimators designed to optimize your farming operations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {actionCards?.map((card, index) => (
                  <div 
                    key={card?.title}
                    className="animate-grow"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <ActionCard {...card} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Content Section */}
          <section className="px-4 lg:px-6 py-8 bg-muted/20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Featured Content
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover expert tips and inspiring agricultural moments from our community
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="animate-grow" style={{ animationDelay: '200ms' }}>
                  <FeaturedTipsCard />
                </div>
                <div className="animate-grow" style={{ animationDelay: '400ms' }}>
                  <GalleryPreview />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Access Section */}
          <section className="px-4 lg:px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-4 left-8 animate-cloud opacity-20">
                  <Icon name="Sprout" size={32} />
                </div>
                <div className="absolute bottom-4 right-8 animate-cloud opacity-20" style={{ animationDelay: '10s' }}>
                  <Icon name="Tractor" size={28} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Smart Farming?</h3>
                  <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                    Join thousands of farmers who are already using AgriMate to optimize their 
                    agricultural operations and increase their yields.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="/water-calculator"
                      className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-agricultural flex items-center space-x-2 touch-target"
                    >
                      <Icon name="Calculator" size={20} />
                      <span>Start Calculating</span>
                    </a>
                    <a
                      href="/farming-tips"
                      className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-agricultural flex items-center space-x-2 touch-target"
                    >
                      <Icon name="BookOpen" size={20} />
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-4 lg:px-6 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Sprout" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">AgriMate</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date()?.getFullYear()} AgriMate. Empowering farmers with smart agricultural solutions.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeDashboard;