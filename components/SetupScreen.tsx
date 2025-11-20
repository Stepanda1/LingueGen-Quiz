import React, { useState } from 'react';
import { Difficulty, QuizType, QuizConfig } from '../types';
import { Button } from './Button';
import { BookOpen, Brain, Zap, GraduationCap } from 'lucide-react';

interface SetupScreenProps {
  onStart: (config: QuizConfig) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.B1);
  const [type, setType] = useState<QuizType>(QuizType.Grammar);
  const [topic, setTopic] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({ difficulty, type, topic });
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-indigo-600 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-2xl mb-4 shadow-inner">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">LinguaGen Quiz</h1>
        <p className="text-indigo-100">AI-Powered English Assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
            Proficiency Level
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.values(Difficulty).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setDifficulty(lvl)}
                className={`p-3 text-sm font-medium rounded-xl border-2 transition-all ${
                  difficulty === lvl
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
            Focus Area
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { val: QuizType.Grammar, icon: <Brain size={18} /> },
              { val: QuizType.Vocabulary, icon: <BookOpen size={18} /> },
              { val: QuizType.Idioms, icon: <Zap size={18} /> },
              { val: QuizType.PhrasalVerbs, icon: <GraduationCap size={18} /> },
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => setType(item.val)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  type === item.val
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span className="text-xs font-semibold">{item.val}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
            Specific Topic (Optional)
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Present Perfect vs Past Simple, Travel Vocabulary..."
            className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white focus:ring-0 transition-all outline-none text-slate-700 placeholder-slate-400"
          />
        </div>

        <Button type="submit" className="w-full text-lg">
          Generate Quiz
        </Button>
      </form>
    </div>
  );
};