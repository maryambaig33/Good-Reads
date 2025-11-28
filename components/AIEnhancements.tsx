import React, { useState } from 'react';
import { Book, AIAnalysisResult } from '../types';
import { generateBookAnalysis } from '../services/geminiService';
import { Sparkles, BrainCircuit, Layers, ArrowRight } from 'lucide-react';

interface AIEnhancementsProps {
  book: Book;
}

const AIEnhancements: React.FC<AIEnhancementsProps> = ({ book }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await generateBookAnalysis(book);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!analysis && !loading) {
    return (
      <div className="w-full bg-slate-800/30 border border-white/5 rounded-2xl p-8 text-center my-8">
        <Sparkles className="w-12 h-12 text-blood-500 mx-auto mb-4" />
        <h3 className="text-2xl font-serif text-white mb-2">Unlock Deep Insights</h3>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto">
          Use our AI model to uncover hidden themes, mood analysis, and personalized recommendations based on this book's DNA.
        </p>
        <button 
          onClick={handleAnalyze}
          className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2 mx-auto"
        >
          <BrainCircuit size={20} />
          Analyze Book
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-64 bg-slate-800/30 border border-white/5 rounded-2xl flex items-center justify-center my-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blood-500 mb-4"></div>
          <p className="text-slate-400 animate-pulse">Reading between the lines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 space-y-6 animate-fade-in">
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-amber-400" />
                <h3 className="font-bold text-lg text-white">AI Synopsis</h3>
            </div>
            <p className="text-slate-300 italic text-lg leading-relaxed">"{analysis?.summary}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Themes & Mood */}
            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Layers size={20} className="text-blue-400" />
                    Themes & Atmosphere
                </h3>
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dominant Mood</span>
                        <p className="text-xl font-serif text-blood-400">{analysis?.mood}</p>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Themes</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {analysis?.themes.map(t => (
                                <span key={t} className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-200 border border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <ArrowRight size={20} className="text-green-400" />
                    If you liked this...
                </h3>
                <div className="space-y-3">
                    {analysis?.similarBooks.map((b, idx) => (
                        <div key={idx} className="group p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/5">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors">{b.title}</h4>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{b.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AIEnhancements;