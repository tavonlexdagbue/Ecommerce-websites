import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    'iPhone 15 Pro',
    'Samsung Galaxy S24',
    'MacBook Air M2',
    'AirPods Pro',
    'iPad Pro',
    'Apple Watch Series 9',
    'Sony WH-1000XM5',
    'Nintendo Switch',
    'PlayStation 5',
    'Xbox Series X'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const filteredSuggestions = mockSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 6));
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
          />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10 w-full"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-surface-secondary transition-colors duration-200 flex items-center space-x-3"
            >
              <Icon name="Search" size={16} className="text-text-muted" />
              <span className="text-sm text-text-primary">{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showSuggestions && searchQuery && suggestions.length === 0 && !isLoading && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-lg z-50"
        >
          <div className="px-4 py-3 text-sm text-text-muted text-center">
            No suggestions found
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;