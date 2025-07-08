import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: 'text-error-500' };
    if (password.length < 8) return { strength: 'medium', color: 'text-warning-500' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return { strength: 'strong', color: 'text-success-500' };
    }
    return { strength: 'medium', color: 'text-warning-500' };
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        newsletter: formData.newsletter,
        role: 'customer'
      };

      const result = await signUp(formData.email, formData.password, userData);
      
      if (result?.success) {
        onSuccess?.();
        // Show success message for email confirmation
        alert('Please check your email to confirm your account before signing in.');
        navigate('/user-authentication?mode=login');
      } else {
        setErrors({ general: result?.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-error-50 border border-error-200 rounded-md">
          <p className="text-sm text-error-600">{errors.general}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-1">
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'border-error-500' : ''}
            required
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-1">
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'border-error-500' : ''}
            required
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'border-error-500' : ''}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'border-error-500 pr-10' : 'pr-10'}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {formData.password && (
          <div className="mt-1 flex items-center space-x-2">
            <span className="text-xs text-text-secondary">Password strength:</span>
            <span className={`text-xs font-medium ${passwordStrength.color}`}>
              {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
            </span>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-error-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={errors.confirmPassword ? 'border-error-500 pr-10' : 'pr-10'}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="flex items-start">
          <Input
            name="newsletter"
            type="checkbox"
            checked={formData.newsletter}
            onChange={handleInputChange}
            className="w-4 h-4 mt-0.5 mr-3 flex-shrink-0"
          />
          <span className="text-sm text-text-secondary">
            Subscribe to our newsletter for updates and exclusive offers
          </span>
        </label>
        
        <label className="flex items-start">
          <Input
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="w-4 h-4 mt-0.5 mr-3 flex-shrink-0"
            required
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary-700 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary-700 underline">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-sm text-error-600">{errors.agreeToTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;