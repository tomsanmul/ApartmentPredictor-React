import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Reviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    // Generate mock data based on the apartment ID
    const generateMockApartment = (apartmentId) => {
      const baseReviews = [
        {
          id: "a31a9482-3e47-4ec9-b8c9-9f3d3884c487",
          title: "Nice Apartment in Great Location",
          content: "This apartment exceeded my expectations. The location is perfect and the amenities are top-notch. Highly recommended for anyone looking for a comfortable stay.",
          rating: 5,
          reviewDate: "2025-12-12",
          reviewer: null
        },
        {
          id: "b32a9482-3e47-4ec9-b8c9-9f3d3884c488",
          title: "Great value for money",
          content: "Good apartment with all necessary amenities. The area is quiet and safe. Would recommend to families.",
          rating: 4,
          reviewDate: "2025-11-15",
          reviewer: null
        }
      ];

      // Randomly decide if this apartment has reviews
      const hasReviews = Math.random() > 0.3; // 70% chance of having reviews
      const numberOfReviews = hasReviews ? Math.floor(Math.random() * 3) + 1 : 0; // 1-3 reviews or 0

      return {
        id: apartmentId,
        price: Math.floor(Math.random() * 500000) + 100000,
        area: Math.floor(Math.random() * 2000) + 500,
        bedrooms: Math.floor(Math.random() * 4) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        stories: Math.floor(Math.random() * 3) + 1,
        mainroad: Math.random() > 0.5 ? "yes" : "no",
        guestroom: Math.random() > 0.5 ? "yes" : "no",
        basement: Math.random() > 0.5 ? "yes" : "no",
        hotwaterheating: Math.random() > 0.5 ? "yes" : "no",
        airconditioning: Math.random() > 0.5 ? "yes" : "no",
        parking: Math.random() > 0.5 ? 1 : 0,
        prefarea: Math.random() > 0.5 ? "yes" : "no",
        furnishingstatus: ["none", "semi-furnished", "furnished"][Math.floor(Math.random() * 3)],
        reviews: hasReviews ? baseReviews.slice(0, numberOfReviews) : []
      };
    };

    // Simulate API call
    setTimeout(() => {
      const mockApartment = generateMockApartment(id);
      setApartment(mockApartment);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="reviews-container">
        <div className="loading">Loading reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-container">
        <div className="error">{error}</div>
        <button onClick={handleBackClick} className="back-btn">Go Back</button>
      </div>
    );
  }

  if (!apartment.reviews || apartment.reviews.length === 0) {
    return (
      <div className="reviews-container">
        <div className="reviews-header">
          <button onClick={handleBackClick} className="back-btn">← Back</button>
          <h2>Reviews for Apartment {apartment.id}</h2>
        </div>
        <div className="no-reviews">
          <p>No reviews yet for this apartment.</p>
          <button className="add-first-review-btn">Be the first to review!</button>
        </div>
      </div>
    );
  }

  const totalReviews = apartment.reviews.length;
  const averageRating = apartment.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <button onClick={handleBackClick} className="back-btn">← Back</button>
        <h2>Reviews for Apartment {apartment.id}</h2>
      </div>
      
      <div className="reviews-summary">
        <div className="summary-card">
          <div className="average-rating">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <span className="rating-stars">{renderStars(Math.round(averageRating))}</span>
          </div>
          <div className="review-count">
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {apartment.reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3 className="review-title">{review.title}</h3>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
            </div>
            <div className="review-content">
              <p>{review.content}</p>
            </div>
            <div className="review-footer">
              <span className="review-date">
                {new Date(review.reviewDate).toLocaleDateString()}
              </span>
              {review.reviewer && (
                <span className="reviewer">by {review.reviewer}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="add-review-btn">Add a Review</button>
    </div>
  );
};

export default Reviews;