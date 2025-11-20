import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Button } from './Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  currentNumber: number;
  totalQuestions: number;
  onSubmit: (answerIndex: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentNumber,
  totalQuestions,
  onSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    onSubmit(selectedOption);
  };

  const progressPercentage = ((currentNumber - 1) / totalQuestions) * 100;
  const isLastQuestion = currentNumber === totalQuestions;

  return (
    <div className="w-full max-w-2xl animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentNumber} of {totalQuestions}</span>
          <span>{Math.round(progressPercentage)}% Completed</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
            {question.questionText}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 font-medium text-lg flex justify-between items-center ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <CheckCircle className="text-indigo-600 w-6 h-6" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
            className="w-full md:w-auto flex items-center gap-2"
          >
            {isLastQuestion ? "Finish Quiz" : "Next Question"} 
            {!isLastQuestion && <ArrowRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};