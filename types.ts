export enum Difficulty {
  A1 = 'A1 (Beginner)',
  A2 = 'A2 (Elementary)',
  B1 = 'B1 (Intermediate)',
  B2 = 'B2 (Upper Intermediate)',
  C1 = 'C1 (Advanced)',
  C2 = 'C2 (Proficiency)',
}

export enum QuizType {
  Grammar = 'Grammar',
  Vocabulary = 'Vocabulary',
  Idioms = 'Idioms',
  PhrasalVerbs = 'Phrasal Verbs',
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface TheoryContent {
  title: string;
  overview: string;
  keyPoints: string[];
  examples: string[];
}

export interface VocabularyItem {
  word: string;
  translation: string;
  sentenceWithBlank: string; // The sentence with the word masked
}

export interface GeneratedContent {
  theory?: TheoryContent;
  vocabulary?: VocabularyItem[];
  questions: QuizQuestion[];
}

export interface QuizConfig {
  difficulty: Difficulty;
  type: QuizType;
  topic?: string; // Optional specific focus, e.g., "Past Perfect"
}

export enum AppState {
  Setup = 'SETUP',
  Loading = 'LOADING',
  Theory = 'THEORY',
  Quiz = 'QUIZ',
  Results = 'RESULTS',
  Error = 'ERROR',
}