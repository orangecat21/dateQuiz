import styles from './ResultScreen.module.css';

interface Props {
  correct: number;
  total: number;
  onRestart: () => void;
}

function getEmoji(percent: number): string {
  if (percent >= 90) return '🏆';
  if (percent >= 70) return '🎉';
  if (percent >= 50) return '📚';
  return '💪';
}

function getMessage(percent: number): string {
  if (percent >= 90) return 'Отличное знание истории!';
  if (percent >= 70) return 'Хороший результат!';
  if (percent >= 50) return 'Есть куда расти';
  return 'Стоит повторить материал';
}

export function ResultScreen({ correct, total, onRestart }: Props) {
  const percent = Math.round((correct / total) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>{getEmoji(percent)}</div>
      <h1 className={styles.title}>Квиз завершён!</h1>
      <p className={styles.message}>{getMessage(percent)}</p>

      <div className={styles.scoreCard}>
        <div className={styles.scoreMain}>
          <span className={styles.scoreNumber}>{correct}</span>
          <span className={styles.scoreDivider}>/</span>
          <span className={styles.scoreTotal}>{total}</span>
        </div>
        <p className={styles.scorePercent}>{percent}% верных ответов</p>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <button className={styles.button} onClick={onRestart}>
        Пройти снова
      </button>
    </div>
  );
}
