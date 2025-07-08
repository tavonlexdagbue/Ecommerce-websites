import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressesSection = ({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress, onSetDefault }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'home',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (editingId) {
      onUpdateAddress(editingId, formData);
      setEditingId(null);
    } else {
      onAddAddress(formData);
      setIsAddingNew(false);
    }
    resetForm();
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: ''
    });
  };

  const addressTypes = [
    { value: 'home', label: 'Home', icon: 'Home' },
    { value: 'work', label: 'Work', icon: 'Building' },
    { value: 'other', label: 'Other', icon: 'MapPin' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Saved Addresses</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddingNew(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add New Address
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(isAddingNew || editingId) && (
          <div className="mb-6 p-4 bg-surface-secondary rounded-lg border border-border">
            <h3 className="font-medium text-text-primary mb-4">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Address Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {addressTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Street Address
                </label>
                <Input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  City
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  State
                </label>
                <Input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  ZIP Code
                </label>
                <Input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="Enter ZIP code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="primary"
                onClick={handleSave}
                iconName="Check"
                iconPosition="left"
              >
                {editingId ? 'Update Address' : 'Save Address'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Addresses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => {
            const addressType = addressTypes.find(type => type.value === address.type);
            return (
              <div key={address.id} className="p-4 bg-surface-secondary rounded-lg border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={addressType?.icon || 'MapPin'} size={16} className="text-primary" />
                    <span className="font-medium text-text-primary capitalize">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteAddress(address.id)}
                      className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-text-primary space-y-1">
                  <p className="font-medium">{address.name}</p>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                  <p>{address.phone}</p>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSetDefault(address.id)}
                    className="mt-3"
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-8">
            <Icon name="MapPin" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No addresses saved</h3>
            <p className="text-text-secondary">
              Add your first address to make checkout faster
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesSection;