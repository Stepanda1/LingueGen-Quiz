import React, { useState } from 'react';
import { AppState, QuizConfig, QuizQuestion, TheoryContent } from './types';
import { generateQuiz } from './services/geminiService';
import { SetupScreen } from './components/SetupScreen';
import { TheoryScreen } from './components/TheoryScreen';
import { QuizCard } from './components/QuizCard';
import { ResultsScreen } from './components/ResultsScreen';
import { Button } from './components/Button';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Setup);
  const [config, setConfig] = useState<QuizConfig | null>(null);
  
  // State for content
  const [theory, setTheory] = useState<TheoryContent | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  // State for quiz progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startProcess = async (newConfig: QuizConfig) => {
    setConfig(newConfig);
    setAppState(AppState.Loading);
    setError(null);

    try {
      const content = await generateQuiz(newConfig.difficulty, newConfig.type, newConfig.topic);
      
      setTheory(content.theory);
      setQuestions(content.questions);
      
      // Reset quiz progress
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      
      // Go to Theory screen first
      setAppState(AppState.Theory);
    } catch (err) {
      console.error(err);
      setError("Failed to generate content. Please check your connection or try a different topic.");
      setAppState(AppState.Error);
    }
  };

  const handleStartQuiz = () => {
    setAppState(AppState.Quiz);
  };

  const handleQuestionSubmit = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setAppState(AppState.Results);
    }
  };

  const handleRetry = () => {
    if (config) {
      startProcess(config);
    } else {
      setAppState(AppState.Setup);
    }
  };

  const handleNew = () => {
    setAppState(AppState.Setup);
    setConfig(null);
    setQuestions([]);
    setTheory(null);
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        
        {appState === AppState.Setup && (
          <SetupScreen onStart={startProcess} />
        )}

        {appState === AppState.Loading && (
          <div className="text-center p-12">
             <div className="relative w-24 h-24 mx-auto mb-8">
               <div className="absolute inset-0 border-t-4 border-indigo-200 rounded-full"></div>
               <div className="absolute inset-0 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
             </div>
             <h2 className="text-2xl font-bold text-slate-700 mb-2">Preparing Lesson</h2>
             <p className="text-slate-500">Consulting the textbook & generating questions...</p>
          </div>
        )}

        {appState === AppState.Theory && theory && (
          <TheoryScreen 
            theory={theory} 
            onStartQuiz={handleStartQuiz} 
          />
        )}

        {appState === AppState.Quiz && questions.length > 0 && (
          <QuizCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            currentNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onSubmit={handleQuestionSubmit}
          />
        )}

        {appState === AppState.Results && config && (
          <ResultsScreen
            questions={questions}
            userAnswers={userAnswers}
            difficulty={config.difficulty}
            type={config.type}
            onRetry={handleRetry}
            onNew={handleNew}
          />
        )}

        {appState === AppState.Error && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-rose-100 max-w-md text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h3>
            <p className="text-slate-500 mb-6">{error}</p>
            <Button onClick={handleNew} variant="outline">Return to Home</Button>
          </div>
        )}

      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        Powered by Gemini 2.5 Flash • Built with React & Tailwind
      </footer>
    </div>
  );
};

export default App;