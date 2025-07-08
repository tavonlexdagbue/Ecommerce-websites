import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result?.success) {
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        onSuccess?.();
        navigate('/user-dashboard');
      } else {
        setErrors({ general: result?.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (formData.email) {
      // TODO: Implement password reset
      alert(`Password reset instructions would be sent to ${formData.email}`);
    } else {
      alert('Please enter your email address first.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-error-50 border border-error-200 rounded-md">
          <p className="text-sm text-error-600">{errors.general}</p>
        </div>
      )}
      
      {/* Demo Credentials Info */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-700 font-medium">Demo Credentials:</p>
        <p className="text-xs text-blue-600">Email: admin@example.com or customer@example.com</p>
        <p className="text-xs text-blue-600">Password: password123</p>
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
            placeholder="Enter your password"
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
        {errors.password && (
          <p className="mt-1 text-sm text-error-600">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <Input
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 mr-2"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;