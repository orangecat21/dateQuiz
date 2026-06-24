import { HistoricalEvent, QuizQuestion } from '../types';
import { historicalEvents } from '../data/events';

/** Перемешать массив (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Получить числовой год из строки типа "1689", "27 июня 1709", "Май 1703" */
function extractYear(str: string): number {
  const match = str.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 1800;
}

/** Форматировать правильный ответ на вопрос о дате */
function formatDateAnswer(ev: HistoricalEvent): string {
  if (ev.end) {
    return `${ev.start} — ${ev.end}`;
  }
  return ev.start;
}

/** Префикс для месяца — нужно сохранить, если он есть ("Май 1703" → "Май {year}") */
function hasMonthPrefix(str: string): string | null {
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  for (const m of months) {
    if (str.startsWith(m)) return m;
  }
  return null;
}

/** Префикс для дня — "27 июня 1709" → "27 июня" */
function hasDayPrefix(str: string): string | null {
  const match = str.match(/^(\d{1,2}\s+\w+)\s+\d{4}$/);
  return match ? match[1] : null;
}

/** Генерировать неверный вариант даты на основе правильного */
function generateFakeDate(ev: HistoricalEvent, usedAnswers: Set<string>): string {
  const offsets = [3, 5, 7, 10, 12, 15, 20, 25, 30];

  if (ev.end) {
    // Период: смещаем начало и конец
    const startYear = extractYear(ev.start);
    const endYear = extractYear(ev.end);
    const duration = endYear - startYear;

    for (let attempt = 0; attempt < 30; attempt++) {
      const offset = offsets[Math.floor(Math.random() * offsets.length)];
      const sign = Math.random() < 0.5 ? 1 : -1;
      const newStart = startYear + sign * offset;
      const newEnd = newStart + duration;
      const candidate = `${newStart} — ${newEnd}`;
      if (!usedAnswers.has(candidate)) {
        return candidate;
      }
    }
    // fallback
    const fb = `${startYear + 50} — ${startYear + 50 + duration}`;
    return fb;
  } else {
    // Одиночная дата
    const year = extractYear(ev.start);
    const dayPrefix = hasDayPrefix(ev.start);
    const monthPrefix = hasMonthPrefix(ev.start);

    for (let attempt = 0; attempt < 30; attempt++) {
      const offset = offsets[Math.floor(Math.random() * offsets.length)];
      const sign = Math.random() < 0.5 ? 1 : -1;
      const newYear = year + sign * offset;
      let candidate: string;

      if (dayPrefix) {
        candidate = `${dayPrefix} ${newYear}`;
      } else if (monthPrefix) {
        candidate = `${monthPrefix} ${newYear}`;
      } else {
        candidate = `${newYear}`;
      }

      if (!usedAnswers.has(candidate)) {
        return candidate;
      }
    }
    return `${year + 50}`;
  }
}

/** Генерировать один вопрос для события */
function generateQuestion(ev: HistoricalEvent): QuizQuestion {
  // Случайно выбираем тип вопроса
  const type = Math.random() < 0.5 ? 'event-to-date' : 'date-to-event';

  if (type === 'event-to-date') {
    // Вопрос: "Когда произошло событие?" → выбрать дату
    const correct = formatDateAnswer(ev);
    const usedAnswers = new Set<string>([correct]);
    const fakes: string[] = [];
    while (fakes.length < 3) {
      const fake = generateFakeDate(ev, usedAnswers);
      usedAnswers.add(fake);
      fakes.push(fake);
    }
    const options = shuffle([correct, ...fakes]);
    return { type, event: ev, correctAnswer: correct, options };
  } else {
    // Вопрос: "Что произошло в [дата]?" → выбрать событие
    const correct = ev.event;
    const otherEvents = historicalEvents.filter(e => e.id !== ev.id);
    const shuffledOthers = shuffle(otherEvents);
    const fakeEvents = shuffledOthers.slice(0, 3).map(e => e.event);
    const options = shuffle([correct, ...fakeEvents]);
    return { type, event: ev, correctAnswer: correct, options };
  }
}

/** Сгенерировать набор вопросов для квиза (все события, перемешанные) */
export function generateQuiz(): QuizQuestion[] {
  const shuffled = shuffle(historicalEvents);
  return shuffled.map(ev => generateQuestion(ev));
}
