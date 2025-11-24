import React from 'react';
import { Difficulty, QuizType, QuizQuestion, VocabularyItem } from '../types';
import { Button } from './Button';
import { RefreshCw, Home, CheckCircle2, XCircle, HelpCircle, BookOpen } from 'lucide-react';

interface ResultsScreenProps {
  questions: QuizQuestion[];
  userAnswers: number[];
  difficulty: Difficulty;
  type: QuizType;
  vocabulary?: VocabularyItem[] | null;
  onRetry: () => void;
  onNew: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  userAnswers,
  difficulty,
  type,
  vocabulary,
  onRetry,
  onNew,
}) => {
  
  // Handle Vocabulary Completion (No Score)
  if (type === QuizType.Vocabulary && vocabulary) {
    return (
      <div className="w-full max-w-3xl animate-in zoom-in duration-300 flex flex-col gap-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Session Complete!</h2>
          <p className="text-slate-500 text-lg mb-6">
            You have reviewed {vocabulary.length} new words.
          </p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
            <p className="text-sm text-slate-600">
              Great job! Repetition is key to language learning. Feel free to start another session to expand your vocabulary further.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onRetry} variant="primary" className="w-full sm:w-auto px-8">
              Study New Words
            </Button>
            <Button onClick={onNew} variant="outline" className="w-full sm:w-auto px-8">
              Main Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Quiz Logic
  const score = questions.reduce((acc, question, idx) => {
    return question.correctAnswerIndex === userAnswers[idx] ? acc + 1 : acc;
  }, 0);
  
  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  let feedback = "";
  let colorClass = "";
  
  if (percentage === 100) {
    feedback = "Perfect Score! You're a master!";
    colorClass = "text-emerald-600";
  } else if (percentage >= 80) {
    feedback = "Great job! Keep it up!";
    colorClass = "text-indigo-600";
  } else if (percentage >= 50) {
    feedback = "Good effort, but room for improvement.";
    colorClass = "text-amber-600";
  } else {
    feedback = "Don't give up! Practice makes perfect.";
    colorClass = "text-rose-600";
  }

  return (
    <div className="w-full max-w-3xl animate-in zoom-in duration-300 flex flex-col gap-6">
      
      {/* Score Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="mb-8 relative inline-block">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              className="text-slate-100"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
            <circle
              className={percentage >= 50 ? 'text-indigo-500' : 'text-rose-500'}
              strokeWidth="10"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * percentage) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
            <span className="text-4xl font-bold text-slate-800">{score}/{total}</span>
            <span className="text-sm text-slate-400 font-medium uppercase">Score</span>
          </div>
        </div>

        <h2 className={`text-2xl font-bold mb-2 ${colorClass}`}>{feedback}</h2>
        <p className="text-slate-500 mb-8">
          {difficulty} • {type}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-0 max-w-md mx-auto">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center justify-center gap-2 mb-1">
               <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               <span className="font-bold text-emerald-700 text-lg">{score}</span>
            </div>
            <span className="text-xs text-emerald-600 font-medium uppercase">Correct</span>
          </div>
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
            <div className="flex items-center justify-center gap-2 mb-1">
               <XCircle className="w-5 h-5 text-rose-500" />
               <span className="font-bold text-rose-700 text-lg">{total - score}</span>
            </div>
            <span className="text-xs text-rose-600 font-medium uppercase">Incorrect</span>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-700">Test Review</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {questions.map((q, idx) => {
            const userAnswer = userAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswerIndex;
            
            return (
              <div key={q.id} className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {idx + 1}
                  </span>
                  <div className="flex-grow">
                    <p className="text-lg font-semibold text-slate-800 mb-4">{q.questionText}</p>
                    
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        let style = "border-slate-100 text-slate-500";
                        let icon = null;

                        // Correct Answer
                        if (optIdx === q.correctAnswerIndex) {
                          style = "bg-emerald-50 border-emerald-200 text-emerald-800 font-medium ring-1 ring-emerald-200";
                          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
                        }
                        // User selected wrong answer
                        else if (optIdx === userAnswer && !isCorrect) {
                          style = "bg-rose-50 border-rose-200 text-rose-800 font-medium ring-1 ring-rose-200";
                          icon = <XCircle className="w-5 h-5 text-rose-600" />;
                        } 
                        
                        return (
                          <div key={optIdx} className={`p-3 rounded-lg border flex justify-between items-center ${style}`}>
                            <span>{opt}</span>
                            {icon}
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-indigo-800">
                        <span className="font-bold block mb-1">Explanation</span>
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pb-8">
        <Button onClick={onRetry} variant="primary" className="w-full flex items-center justify-center gap-2 py-4">
          <RefreshCw className="w-5 h-5" />
          Generate New Test (Same Topic)
        </Button>
        <Button onClick={onNew} variant="outline" className="w-full flex items-center justify-center gap-2 py-4">
          <Home className="w-5 h-5" />
          Return to Main Menu
        </Button>
      </div>
    </div>
  );
};