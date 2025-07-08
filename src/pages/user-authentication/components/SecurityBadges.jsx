import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: 'Your data is encrypted and secure'
    },
    {
      icon: 'Lock',
      text: 'Privacy Protected',
      description: 'We never share your personal information'
    },
    {
      icon: 'CheckCircle',
      text: 'Trusted Platform',
      description: 'Thousands of satisfied customers'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-center sm:text-left">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-success-50 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} size={16} className="text-success-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary">{feature.text}</p>
              <p className="text-xs text-text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;