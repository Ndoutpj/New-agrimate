import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportPanel = ({ results }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async (format) => {
    if (!results) return;

    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create export data
    const exportData = {
      timestamp: new Date()?.toISOString(),
      farmDetails: {
        size: results?.farmSize,
        unit: results?.unit,
        cropType: results?.cropType,
        plantingMethod: results?.plantingMethod
      },
      seedRequirements: results?.seeds,
      workerRequirements: results?.workers,
      totalEstimatedCost: results?.seeds?.seedCost + results?.workers?.totalCost
    };

    if (format === 'pdf') {
      // Simulate PDF generation
      console.log('Generating PDF report...', exportData);
    } else if (format === 'csv') {
      // Simulate CSV generation
      const csvContent = `Farm Size,${results?.farmSize} ${results?.unit}\nCrop Type,${results?.cropType}\nSeeds Required,${results?.seeds?.seedQuantity}\nWorkers Needed,${results?.workers?.totalWorkers}\nTotal Cost,$${(results?.seeds?.seedCost + results?.workers?.totalCost)?.toFixed(2)}`;
      console.log('Generating CSV report...', csvContent);
    }

    setIsExporting(false);
    setExportSuccess(true);
    
    setTimeout(() => setExportSuccess(false), 3000);
  };

  if (!results) return null;

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Download" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Export Results
          </h3>
          <p className="text-sm text-muted-foreground">
            Save your calculations for future reference
          </p>
        </div>
      </div>
      {exportSuccess && (
        <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Export completed successfully!</span>
          </div>
        </div>
      )}
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleExport('pdf')}
          loading={isExporting}
          iconName="FileText"
          iconPosition="left"
        >
          Export as PDF Report
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => handleExport('csv')}
          loading={isExporting}
          iconName="Table"
          iconPosition="left"
        >
          Export as CSV Data
        </Button>

        <Button
          variant="ghost"
          fullWidth
          onClick={() => navigator.share && navigator.share({
            title: 'Seed & Worker Estimation Results',
            text: `Farm planning results for ${results?.cropType}: ${results?.seeds?.seedQuantity} seeds, ${results?.workers?.totalWorkers} workers needed.`,
            url: window.location?.href
          })}
          iconName="Share2"
          iconPosition="left"
        >
          Share Results
        </Button>
      </div>
      {/* Quick Summary */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Farm Size:</span>
            <div className="font-medium">{results?.farmSize} {results?.unit}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Crop:</span>
            <div className="font-medium capitalize">{results?.cropType}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Seeds:</span>
            <div className="font-medium">{results?.seeds?.seedQuantity?.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Workers:</span>
            <div className="font-medium">{results?.workers?.totalWorkers}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;