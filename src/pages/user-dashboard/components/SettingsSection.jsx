import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsSection = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggle = (key) => {
    const newSettings = {
      ...localSettings,
      [key]: !localSettings[key]
    };
    setLocalSettings(newSettings);
    onUpdateSettings(newSettings);
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      icon: 'Bell',
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive order updates and promotional emails',
          value: localSettings.emailNotifications
        },
        {
          key: 'smsNotifications',
          label: 'SMS Notifications',
          description: 'Get text messages for order status updates',
          value: localSettings.smsNotifications
        },
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Receive browser notifications for important updates',
          value: localSettings.pushNotifications
        },
        {
          key: 'marketingEmails',
          label: 'Marketing Emails',
          description: 'Receive promotional offers and product recommendations',
          value: localSettings.marketingEmails
        }
      ]
    },
    {
      title: 'Privacy',
      icon: 'Shield',
      settings: [
        {
          key: 'profileVisibility',
          label: 'Public Profile',
          description: 'Make your profile visible to other users',
          value: localSettings.profileVisibility
        },
        {
          key: 'dataCollection',
          label: 'Data Collection',
          description: 'Allow collection of usage data for personalization',
          value: localSettings.dataCollection
        },
        {
          key: 'thirdPartySharing',
          label: 'Third-party Sharing',
          description: 'Share data with trusted partners for better experience',
          value: localSettings.thirdPartySharing
        }
      ]
    },
    {
      title: 'Shopping Preferences',
      icon: 'ShoppingBag',
      settings: [
        {
          key: 'savePaymentMethods',
          label: 'Save Payment Methods',
          description: 'Securely store payment methods for faster checkout',
          value: localSettings.savePaymentMethods
        },
        {
          key: 'autoReorder',
          label: 'Auto-reorder Suggestions',
          description: 'Get suggestions to reorder frequently bought items',
          value: localSettings.autoReorder
        },
        {
          key: 'priceAlerts',
          label: 'Price Drop Alerts',
          description: 'Get notified when items in your wishlist go on sale',
          value: localSettings.priceAlerts
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {settingsGroups.map((group) => (
        <div key={group.title} className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon name={group.icon} size={20} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">{group.title}</h2>
          </div>

          <div className="space-y-4">
            {group.settings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-1">{setting.label}</h3>
                  <p className="text-sm text-text-secondary">{setting.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(setting.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    setting.value ? 'bg-primary' : 'bg-secondary-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      setting.value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Account Actions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-error-50 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">Account Actions</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
            <div>
              <h3 className="font-medium text-text-primary mb-1">Export Account Data</h3>
              <p className="text-sm text-text-secondary">
                Download a copy of all your account data and order history
              </p>
            </div>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export Data
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
            <div>
              <h3 className="font-medium text-text-primary mb-1">Deactivate Account</h3>
              <p className="text-sm text-text-secondary">
                Temporarily disable your account while keeping your data
              </p>
            </div>
            <Button variant="outline" size="sm" iconName="UserX" iconPosition="left">
              Deactivate
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-error-50 border border-error-200 rounded-lg">
            <div>
              <h3 className="font-medium text-error mb-1">Delete Account</h3>
              <p className="text-sm text-error-600">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="danger" size="sm" iconName="Trash2" iconPosition="left">
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
            <Icon name="HelpCircle" size={20} className="text-accent" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">Help & Support</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 h-16"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Contact Support
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 h-16"
            iconName="FileText"
            iconPosition="left"
          >
            View FAQ
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 h-16"
            iconName="Book"
            iconPosition="left"
          >
            User Guide
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 h-16"
            iconName="Shield"
            iconPosition="left"
          >
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;