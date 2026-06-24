import styles from './StartScreen.module.css';

interface Props {
  onStart: () => void;
}

export function StartScreen({ onStart }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🏛️</div>
      <h1 className={styles.title}>История России</h1>
      <p className={styles.subtitle}>Квиз по датам</p>
      <p className={styles.description}>
        Проверь знание ключевых исторических дат и событий России
        с XVII по начало XX века
      </p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>21</span>
          <span className={styles.statLabel}>событие</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>4</span>
          <span className={styles.statLabel}>варианта</span>
        </div>
      </div>
      <button className={styles.button} onClick={onStart}>
        Начать квиз
      </button>
    </div>
  );
}
