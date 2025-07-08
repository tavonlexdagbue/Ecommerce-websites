import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep = 1, className = '' }) => {
  const steps = [
    { id: 1, label: 'Shipping', icon: 'Truck' },
    { id: 2, label: 'Payment', icon: 'CreditCard' },
    { id: 3, label: 'Review', icon: 'CheckCircle' }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                  currentStep >= step.id
                    ? 'bg-primary border-primary text-white' :'bg-surface border-border text-text-muted'
                }`}
              >
                <Icon name={step.icon} size={20} />
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-primary' : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors duration-200 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;