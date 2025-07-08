import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Profile Information</h2>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                iconName="Check"
                iconPosition="left"
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            ) : (
              <p className="text-text-secondary">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            ) : (
              <p className="text-text-secondary">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            ) : (
              <p className="text-text-secondary">{user.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date of Birth
            </label>
            {isEditing ? (
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            ) : (
              <p className="text-text-secondary">{user.dateOfBirth}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Gender
            </label>
            {isEditing ? (
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            ) : (
              <p className="text-text-secondary capitalize">{user.gender || 'Not specified'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Account Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={20} className="text-text-secondary" />
              <div>
                <h3 className="font-medium text-text-primary">Password</h3>
                <p className="text-sm text-text-secondary">Last changed 3 months ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-text-secondary" />
              <div>
                <h3 className="font-medium text-text-primary">Two-Factor Authentication</h3>
                <p className="text-sm text-text-secondary">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Account Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{user.totalOrders}</div>
            <div className="text-sm text-text-secondary">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">${user.totalSpent}</div>
            <div className="text-sm text-text-secondary">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{user.wishlistCount}</div>
            <div className="text-sm text-text-secondary">Wishlist Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{user.reviewsCount}</div>
            <div className="text-sm text-text-secondary">Reviews Written</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;