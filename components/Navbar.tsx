import React from 'react';
import { BookOpen, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-16 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2 text-white cursor-pointer hover:text-blood-500 transition-colors">
        <BookOpen size={24} className="text-blood-500" />
        <span className="font-serif font-bold text-xl tracking-tight">NextGen<span className="text-blood-500">Reads</span></span>
      </div>
      
      <div className="hidden md:flex items-center bg-slate-800 rounded-full px-4 py-1.5 border border-white/10 w-96">
        <Search size={16} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search books, authors, genres..." 
          className="bg-transparent border-none outline-none text-sm text-white ml-2 w-full placeholder-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-slate-300 hover:text-white hidden sm:block">My Books</button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blood-900 to-slate-700 flex items-center justify-center border border-white/10 cursor-pointer">
          <User size={16} className="text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;