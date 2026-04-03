import React from 'react';

interface Feature {
  icon: string;
  label: string;
  description?: string;
}

interface ProductFeaturesProps {
  features: Feature[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, idx) => (
        <div key={idx} className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 text-center">
          <span className="text-4xl">{feature.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">{feature.label}</h3>
          {feature.description && (
            <p className="text-sm text-gray-600">{feature.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;