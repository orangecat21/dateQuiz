import styles from './ProgressBar.module.css';

interface Props {
  current: number;
  total: number;
  correctCount: number;
}

export function ProgressBar({ current, total, correctCount }: Props) {
  const progress = (current / total) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.counter}>
          Вопрос {current} из {total}
        </span>
        <span className={styles.score}>
          ✓ {correctCount}
        </span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
