import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={size} fill="currentColor" />;
        } else if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} size={size} fill="currentColor" />;
        } else {
          return <Star key={i} size={size} className="text-slate-600" />;
        }
      })}
    </div>
  );
};

export default StarRating;