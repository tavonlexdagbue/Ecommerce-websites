import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ onNext, initialData = {}, className = '' }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    apartment: initialData?.apartment || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || 'United States'
  });

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData?.email || '')) newErrors.email = 'Email is invalid';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.address?.trim()) newErrors.address = 'Address is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.state?.trim()) newErrors.state = 'State is required';
    if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);

    if (validateForm()) {
      // Simulate address validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNext?.(formData);
    }

    setIsValidating(false);
  };

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Truck" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary">Shipping Information</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              First Name *
            </label>
            <Input
              type="text"
              value={formData?.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter first name"
              className={errors?.firstName ? 'border-error' : ''}
            />
            {errors?.firstName && (
              <p className="mt-1 text-sm text-error">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Last Name *
            </label>
            <Input
              type="text"
              value={formData?.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter last name"
              className={errors?.lastName ? 'border-error' : ''}
            />
            {errors?.lastName && (
              <p className="mt-1 text-sm text-error">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              className={errors?.email ? 'border-error' : ''}
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number *
            </label>
            <Input
              type="tel"
              value={formData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className={errors?.phone ? 'border-error' : ''}
            />
            {errors?.phone && (
              <p className="mt-1 text-sm text-error">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Street Address *
          </label>
          <Input
            type="text"
            value={formData?.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter street address"
            className={errors?.address ? 'border-error' : ''}
          />
          {errors?.address && (
            <p className="mt-1 text-sm text-error">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Apartment, suite, etc. (optional)
          </label>
          <Input
            type="text"
            value={formData?.apartment || ''}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
            placeholder="Apartment, suite, unit, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              City *
            </label>
            <Input
              type="text"
              value={formData?.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter city"
              className={errors?.city ? 'border-error' : ''}
            />
            {errors?.city && (
              <p className="mt-1 text-sm text-error">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              State *
            </label>
            <Input
              type="text"
              value={formData?.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="Enter state"
              className={errors?.state ? 'border-error' : ''}
            />
            {errors?.state && (
              <p className="mt-1 text-sm text-error">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ZIP Code *
            </label>
            <Input
              type="text"
              value={formData?.zipCode || ''}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="12345"
              className={errors?.zipCode ? 'border-error' : ''}
            />
            {errors?.zipCode && (
              <p className="mt-1 text-sm text-error">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button
            variant="primary"
            type="submit"
            loading={isValidating}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
            className="h-12"
          >
            {isValidating ? 'Validating Address...' : 'Continue to Payment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;