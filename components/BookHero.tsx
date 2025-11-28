import React from 'react';
import { Book } from '../types';
import StarRating from './StarRating';
import { BookOpenText, Heart, Share2 } from 'lucide-react';

interface BookHeroProps {
  book: Book;
}

const BookHero: React.FC<BookHeroProps> = ({ book }) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${book.coverUrl})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-[#0f172a] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
        
        {/* Cover Image */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blood-900 to-slate-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={book.coverUrl} 
              alt={book.title} 
              className="relative w-64 md:w-80 rounded-lg shadow-2xl border border-white/10"
            />
          </div>
          <div className="mt-6 flex justify-center gap-4">
             <button className="flex items-center gap-2 bg-blood-600 hover:bg-blood-500 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-blood-900/20">
                <BookOpenText size={18} />
                Want to Read
             </button>
             <button className="p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-blood-400 border border-white/5 transition-colors">
                <Heart size={20} />
             </button>
             <button className="p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 border border-white/5 transition-colors">
                <Share2 size={20} />
             </button>
          </div>
        </div>

        {/* Book Info */}
        <div className="flex-1 text-center md:text-left pt-2">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 leading-tight">
            {book.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300 font-light mb-6">
            by <span className="text-white font-medium border-b border-blood-500/50">{book.author}</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <StarRating rating={book.rating} size={20} />
              <span className="text-white font-bold text-lg">{book.rating}</span>
              <span>({book.ratingCount.toLocaleString()} ratings)</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded border border-slate-700 bg-slate-800/50">{book.pages} pages</span>
              <span className="px-2 py-0.5 rounded border border-slate-700 bg-slate-800/50">{book.publishDate}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
            {book.genres.map(genre => (
              <span key={genre} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-blood-500/50 transition-colors cursor-default">
                {genre}
              </span>
            ))}
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-slate-300 leading-relaxed opacity-90">
              {book.description.split('\n')[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHero;