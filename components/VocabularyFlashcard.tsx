import React, { useState, useEffect } from 'react';
import { VocabularyItem } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface VocabularyFlashcardProps {
  item: VocabularyItem;
  currentNumber: number;
  total: number;
  onNext: () => void;
}

export const VocabularyFlashcard: React.FC<VocabularyFlashcardProps> = ({
  item,
  currentNumber,
  total,
  onNext,
}) => {
  // 0: Word only, 1: + Translation, 2: + Context
  const [step, setStep] = useState(0);

  // Reset state when the word changes
  useEffect(() => {
    setStep(0);
  }, [item]);

  const handleClick = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const progress = (currentNumber / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col animate-in fade-in zoom-in duration-300">
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Word {currentNumber} of {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div 
        onClick={handleClick}
        className="relative bg-white h-[450px] rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center justify-center p-8 cursor-pointer hover:border-indigo-200 transition-all duration-200 select-none active:scale-[0.98]"
      >
        <div className="absolute top-6 right-6 text-xs font-bold tracking-widest text-slate-300 uppercase">
          {step === 0 ? 'Tap to Translate' : step === 1 ? 'Tap for Context' : 'Tap for Next'}
        </div>

        {/* Word */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">{item.word}</h2>
        </div>

        {/* Translation */}
        <div className={`transition-all duration-500 transform ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-2xl text-indigo-600 font-medium text-center mb-8">{item.translation}</p>
        </div>

        {/* Context */}
        <div className={`w-full transition-all duration-500 transform ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
            <div className="absolute -top-3 left-6 bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Context
            </div>
            <p className="text-lg text-slate-600 italic text-center leading-relaxed">
              "{item.context}"
            </p>
          </div>
        </div>

        {/* Instruction / Indicator */}
        <div className="absolute bottom-8 text-slate-300 text-sm font-medium animate-pulse">
          {step < 2 ? "Tap card to reveal" : "Tap to continue"}
        </div>
        
        {step === 2 && (
          <div className="absolute bottom-8 right-8">
             <CheckCircle2 className="w-8 h-8 text-emerald-400 opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
};
