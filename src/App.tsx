import { useState, useCallback } from 'react';
import { generateQuiz } from './utils/quiz';
import { QuizQuestion } from './types';
import { StartScreen } from './components/StartScreen/StartScreen';
import { Question } from './components/Question/Question';
import { ResultScreen } from './components/ResultScreen/ResultScreen';
import styles from './App.module.css';

type Screen = 'start' | 'quiz' | 'result';

export function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleStart = useCallback(() => {
    const newQuestions = generateQuiz();
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setCorrectCount(0);
    setScreen('quiz');
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    const nextCorrect = isCorrect ? correctCount + 1 : correctCount;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
      setCorrectCount(nextCorrect);
      setScreen('result');
    } else {
      setCorrectCount(nextCorrect);
      setCurrentIndex(nextIndex);
    }
  }, [correctCount, currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setScreen('start');
  }, []);

  return (
    <div className={styles.app}>
      {screen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      {screen === 'quiz' && questions.length > 0 && (
        <Question
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          correctCount={correctCount}
          onAnswer={handleAnswer}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          correct={correctCount}
          total={questions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
