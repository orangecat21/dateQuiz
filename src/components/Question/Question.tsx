import { useState } from 'react';
import { QuizQuestion } from '../../types';
import { AnswerOption } from '../AnswerOption/AnswerOption';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styles from './Question.module.css';

interface Props {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  correctCount: number;
  onAnswer: (isCorrect: boolean) => void;
}

export function Question({ question, questionNumber, totalQuestions, correctCount, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const isAnswered = selected !== null;

  function handleSelect(option: string) {
    if (isAnswered) return;
    setSelected(option);
    const correct = option === question.correctAnswer;
    // Задержка перед переходом к следующему вопросу
    setTimeout(() => {
      onAnswer(correct);
      setSelected(null);
    }, 1200);
  }

  function getOptionState(option: string): 'default' | 'correct' | 'wrong' | 'disabled' {
    if (!isAnswered) return 'default';
    if (option === question.correctAnswer) return 'correct';
    if (option === selected) return 'wrong';
    return 'disabled';
  }

  const questionText = question.type === 'event-to-date'
    ? `Когда произошло?`
    : `Что произошло?`;

  const contextText = question.type === 'event-to-date'
    ? question.event.event
    : (question.event.end
      ? `${question.event.start} — ${question.event.end}`
      : question.event.start);

  return (
    <div className={styles.wrapper}>
      <ProgressBar
        current={questionNumber}
        total={totalQuestions}
        correctCount={correctCount}
      />

      <div className={styles.content}>
        <div className={styles.questionBlock}>
          <p className={styles.questionLabel}>{questionText}</p>
          <h2 className={styles.questionText}>{contextText}</h2>
        </div>

        <div className={styles.options}>
          {question.options.map((option) => (
            <AnswerOption
              key={option}
              text={option}
              state={getOptionState(option)}
              onClick={() => handleSelect(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
