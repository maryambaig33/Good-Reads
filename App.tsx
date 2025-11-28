import React from 'react';
import Navbar from './components/Navbar';
import BookHero from './components/BookHero';
import AIEnhancements from './components/AIEnhancements';
import ChatInterface from './components/ChatInterface';
import ReviewList from './components/ReviewList';
import { CURRENT_BOOK, MOCK_REVIEWS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blood-900 selection:text-white pb-20">
      <Navbar />
      
      <main>
        <BookHero book={CURRENT_BOOK} />
        
        <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column (Left/Center) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description (Extended) */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-blood-500 pl-3">Synopsis</h3>
              <p className="text-slate-300 leading-7 whitespace-pre-line text-lg">
                {CURRENT_BOOK.description}
              </p>
            </section>

            {/* AI Features */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-purple-500 pl-3">AI Deep Dive</h3>
              <AIEnhancements book={CURRENT_BOOK} />
            </section>

            {/* Reviews */}
            <section>
              <ReviewList reviews={MOCK_REVIEWS} />
            </section>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Chat Feature - Sticky on Desktop */}
            <div className="lg:sticky lg:top-24">
               <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">Speak to the Story</h3>
               <ChatInterface book={CURRENT_BOOK} />
               
               {/* Metadata Card */}
               <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
                 <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Book Details</h4>
                 <ul className="space-y-3 text-sm">
                   <li className="flex justify-between">
                     <span className="text-slate-500">Format</span>
                     <span className="text-slate-300">Kindle Edition</span>
                   </li>
                   <li className="flex justify-between">
                     <span className="text-slate-500">ISBN</span>
                     <span className="text-slate-300">978-1-23-456789-0</span>
                   </li>
                   <li className="flex justify-between">
                     <span className="text-slate-500">Language</span>
                     <span className="text-slate-300">English</span>
                   </li>
                    <li className="flex justify-between">
                     <span className="text-slate-500">Awards</span>
                     <span className="text-slate-300">Best Thriller 2024 (Nominee)</span>
                   </li>
                 </ul>
               </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-20 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>&copy; 2024 NextGen Reads. Not affiliated with Goodreads. Demo Purpose Only.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;