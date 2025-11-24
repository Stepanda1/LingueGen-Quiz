import React from 'react';
import { TheoryContent, VocabularyItem } from '../types';
import { Button } from './Button';
import { BookOpen, Lightbulb, ArrowRight, Check } from 'lucide-react';

interface TheoryScreenProps {
  theory: TheoryContent | null;
  vocabulary: VocabularyItem[] | null;
  onStartQuiz: () => void;
}

export const TheoryScreen: React.FC<TheoryScreenProps> = ({ theory, onStartQuiz }) => {
  // Note: Vocabulary flow now skips TheoryScreen entirely, so we only render Theory here.
  
  if (theory) {
    return (
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="bg-emerald-50 p-8 border-b border-emerald-100">
          <div className="flex items-center gap-3 text-emerald-600 mb-3">
            <BookOpen className="w-6 h-6" />
            <span className="uppercase tracking-wider text-sm font-bold">Study Guide</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{theory.title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">{theory.overview}</p>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Key Rules Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
              Key Rules
            </h3>
            <ul className="space-y-3">
              {theory.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
              Examples
            </h3>
            <div className="bg-slate-800 text-slate-200 rounded-xl p-6 shadow-inner">
              <div className="flex items-center gap-2 text-amber-400 mb-4 font-semibold uppercase tracking-wide text-xs">
                <Lightbulb className="w-4 h-4" />
                In Practice
              </div>
              <ul className="space-y-4">
                {theory.examples.map((ex, idx) => (
                  <li key={idx} className="font-mono text-sm md:text-base border-l-2 border-slate-600 pl-4">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
          <Button onClick={onStartQuiz} className="w-full md:w-auto flex items-center gap-2 text-lg">
            I'm Ready to Practice <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};