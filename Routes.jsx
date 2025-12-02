import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import LoginPage from './pages/login';
import FarmingTips from './pages/farming-tips';
import SeedWorkerEstimator from './pages/seed-worker-estimator';
import WaterCalculator from './pages/water-calculator';
import Gallery from './pages/gallery';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/farming-tips" element={<FarmingTips />} />
        <Route path="/seed-worker-estimator" element={<SeedWorkerEstimator />} />
        <Route path="/water-calculator" element={<WaterCalculator />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
