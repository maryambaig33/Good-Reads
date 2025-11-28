import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';
import { ThumbsUp } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Reader Reviews</h3>
      {reviews.map(review => (
        <div key={review.id} className="bg-slate-900/40 border-b border-white/5 pb-6 last:border-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full border border-white/10" />
              <div>
                <p className="font-bold text-slate-200 text-sm">{review.user}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} size={12} />
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {review.content}
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-white transition-colors">
              <ThumbsUp size={14} />
              Helpful ({review.likes})
            </button>
            <button className="text-xs font-medium text-slate-500 hover:text-white transition-colors">
              Comment
            </button>
          </div>
        </div>
      ))}
      <button className="w-full py-3 rounded-lg border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition-colors">
        Read all 12,453 reviews
      </button>
    </div>
  );
};

export default ReviewList;