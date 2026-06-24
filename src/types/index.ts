export interface HistoricalEvent {
  id: number;
  start: string;       // "1689", "27 июня 1709", "Май 1703"
  end: string | null;  // "1725" или null если одиночная дата
  event: string;
}

export type QuestionType = 'date-to-event' | 'event-to-date';

export interface QuizQuestion {
  type: QuestionType;
  event: HistoricalEvent;
  correctAnswer: string;
  options: string[];   // 4 варианта, перемешанных
}

export type AnswerState = 'unanswered' | 'correct' | 'wrong';

export interface QuizResult {
  total: number;
  correct: number;
}
