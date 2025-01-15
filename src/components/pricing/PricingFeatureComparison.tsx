import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureRow {
  feature: string;
  Basic: string;
  Standard: string;
  Premium: string;
}

interface PricingFeatureComparisonProps {
  headers: string[];
  rows: FeatureRow[];
}

export const PricingFeatureComparison = ({ headers, rows }: PricingFeatureComparisonProps) => {
  return (
    <Card className="overflow-x-auto">
      <div className="min-w-full p-6">
        <h3 className="text-2xl font-bold text-center mb-8">Feature Comparison</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 py-3 border-b">
            {headers.map((header, index) => (
              <div key={index} className={`font-medium ${index === 0 ? '' : 'text-center'}`}>
                {header}
              </div>
            ))}
          </div>
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b last:border-0">
              <div className="flex items-center">{row.feature}</div>
              <div className="text-center flex items-center justify-center">
                {typeof row.Basic === 'boolean' ? 
                  (row.Basic ? <Check className="text-primary" /> : <X className="text-red-500" />) : 
                  row.Basic}
              </div>
              <div className="text-center flex items-center justify-center">
                {typeof row.Standard === 'boolean' ? 
                  (row.Standard ? <Check className="text-primary" /> : <X className="text-red-500" />) : 
                  row.Standard}
              </div>
              <div className="text-center flex items-center justify-center">
                {typeof row.Premium === 'boolean' ? 
                  (row.Premium ? <Check className="text-primary" /> : <X className="text-red-500" />) : 
                  row.Premium}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};