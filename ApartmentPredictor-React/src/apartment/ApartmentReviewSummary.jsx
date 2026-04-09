import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApartmentReviewSummary = ({ apartment }) => {
  const navigate = useNavigate();

  if (!apartment || !apartment.reviews || apartment.reviews.length === 0) {
    return null;
  }

  const reviews = apartment.reviews;
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const handleClick = () => {
    navigate(`/reviews/apartment/${apartment.id}`);
  };

  return (
    <div className="apartment-review-summary" onClick={handleClick}>
      <span className="star-icon">⭐</span>
      <span>{averageRating.toFixed(1)} ({totalReviews} review{totalReviews > 1 ? 's' : ''})</span>
      <a href="#" onClick={(e) => { e.preventDefault(); handleClick(); }}>View all</a>
    </div>
  );
};

export default ApartmentReviewSummary;