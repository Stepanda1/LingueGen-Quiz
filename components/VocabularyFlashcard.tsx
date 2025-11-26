import React, { useState, useEffect, useRef } from 'react';
import { VocabularyItem } from '../types';
import { Button } from './Button';
import { CheckCircle2, ArrowRight, RefreshCw, XCircle } from 'lucide-react';

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
  const [userInput, setUserInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [relevanceScore, setRelevanceScore] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when the item changes
  useEffect(() => {
    setUserInput('');
    setIsChecked(false);
    setRelevanceScore(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [item]);

  // Simple string similarity (Levenshtein distance based)
  const calculateSimilarity = (s1: string, s2: string): number => {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    
    const editDistance = (a: string, b: string) => {
      const costs = new Array();
      for (let i = 0; i <= a.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= b.length; j++) {
          if (i === 0) {
            costs[j] = j;
          } else {
            if (j > 0) {
              let newValue = costs[j - 1];
              if (a.charAt(i - 1) !== b.charAt(j - 1)) {
                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              }
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) {
          costs[b.length] = lastValue;
        }
      }
      return costs[b.length];
    }

    return (longerLength - editDistance(longer.toLowerCase(), shorter.toLowerCase())) / longerLength;
  };

  const handleCheck = () => {
    if (!userInput.trim()) return;

    const similarity = calculateSimilarity(userInput.trim(), item.word);
    const score = Math.round(similarity * 100);
    setRelevanceScore(score);
    setIsChecked(true);
  };

  const handleGiveUp = () => {
    setRelevanceScore(0);
    setIsChecked(true);
  };

  const handleNext = () => {
    onNext();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isChecked) {
        handleCheck();
      } else if (relevanceScore === 100 || isChecked) {
        handleNext();
      }
    }
  };

  const progress = (currentNumber / total) * 100;

  // Determine feedback color based on score
  const getScoreColor = (score: number) => {
    if (score === 100) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };
  
  const getScoreBg = (score: number) => {
    if (score === 100) return 'bg-emerald-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col animate-in fade-in zoom-in duration-300">
      
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Card {currentNumber} of {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col relative">
        
        {/* Card Header / Context */}
        <div className="p-8 pb-4">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Complete the sentence</h3>
          <p className="text-2xl text-slate-800 font-medium leading-relaxed">
            {item.sentenceWithBlank}
          </p>
        </div>

        {/* Interaction Area */}
        <div className="p-8 pt-0 flex-grow flex flex-col gap-6">
          
          {/* Input Field */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isChecked && relevanceScore === 100} // Disable if solved correctly
              placeholder="Type the missing word..."
              className={`w-full p-4 pl-5 text-xl rounded-xl border-2 outline-none transition-all ${
                isChecked 
                  ? relevanceScore === 100 
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-slate-50 text-slate-800'
                  : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
              }`}
            />
            {isChecked && relevanceScore === 100 && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
            )}
          </div>

          {/* Feedback Section */}
          {isChecked && relevanceScore !== null && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              
              {/* Score Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relevance / Accuracy</span>
                  <span className={`text-lg font-bold ${getScoreColor(relevanceScore)}`}>
                    {relevanceScore === 100 ? 'Perfect Match' : `${relevanceScore}%`}
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ease-out ${getScoreBg(relevanceScore)}`}
                    style={{ width: `${relevanceScore}%` }}
                  />
                </div>
              </div>

              {/* Translation Reveal */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
                <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Translation</span>
                <span className="text-lg text-slate-700">{item.translation}</span>
              </div>

              {/* Correct Answer Reveal (if incorrect) */}
              {relevanceScore < 100 && (
                 <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <span className="block text-xs text-indigo-400 font-bold uppercase mb-1">Correct Answer</span>
                    <span className="text-lg font-bold text-indigo-700">{item.word}</span>
                 </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-auto flex gap-3">
            {!isChecked ? (
              <>
                <Button 
                  onClick={handleCheck} 
                  className="flex-1"
                  disabled={!userInput.trim()}
                >
                  Check Relevance
                </Button>
                <Button 
                  onClick={handleGiveUp} 
                  variant="outline"
                  className="px-4"
                >
                  Reveal
                </Button>
              </>
            ) : (
              <div className="flex w-full gap-3">
                {relevanceScore !== 100 && (
                   <Button onClick={() => { setIsChecked(false); setRelevanceScore(null); setUserInput(''); inputRef.current?.focus(); }} variant="outline" className="flex-1">
                     <RefreshCw className="w-4 h-4 mr-2" />
                     Try Again
                   </Button>
                )}
                <Button onClick={handleNext} variant={relevanceScore === 100 ? 'primary' : 'secondary'} className="flex-1">
                  Next Card <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};