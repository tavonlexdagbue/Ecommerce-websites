import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ reviews = [], averageRating = 0, totalReviews = 0 }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={14}
          className={i <= rating ? 'text-accent fill-current' : 'text-border'}
        />
      );
    }
    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sortedReviews = [...displayedReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  if (reviews.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Customer Reviews</h2>
        <div className="text-center py-8 text-text-muted">
          <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="bg-surface-secondary rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-text-primary">
              {averageRating.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center space-x-1 mb-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-text-secondary">
                Based on {totalReviews} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-3">
              <span className="text-sm text-text-secondary w-8">{rating}</span>
              <Icon name="Star" size={14} className="text-accent" />
              <div className="flex-1 bg-border rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full"
                  style={{
                    width: `${totalReviews > 0 ? (ratingDistribution[rating] / totalReviews) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-text-secondary w-8">
                {ratingDistribution[rating]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">Reviews</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-border rounded-md text-sm bg-surface"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">
                    {review.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-text-primary">{review.author}</div>
                  <div className="text-sm text-text-secondary">
                    {formatDate(review.date)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
            </div>

            {review.title && (
              <h4 className="font-medium text-text-primary mb-2">{review.title}</h4>
            )}

            <p className="text-text-secondary leading-relaxed mb-3">
              {review.comment}
            </p>

            {review.verified && (
              <div className="flex items-center space-x-1 text-sm text-success">
                <Icon name="CheckCircle" size={14} />
                <span>Verified Purchase</span>
              </div>
            )}

            {review.helpful > 0 && (
              <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-border">
                <span className="text-sm text-text-secondary">
                  {review.helpful} people found this helpful
                </span>
                <button className="text-sm text-text-secondary hover:text-text-primary">
                  Helpful
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;