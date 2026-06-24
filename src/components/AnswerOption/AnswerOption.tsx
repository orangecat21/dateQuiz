import styles from './AnswerOption.module.css';

interface Props {
  text: string;
  state: 'default' | 'correct' | 'wrong' | 'disabled';
  onClick: () => void;
}

export function AnswerOption({ text, state, onClick }: Props) {
  const className = [
    styles.button,
    state === 'correct' ? styles.correct : '',
    state === 'wrong' ? styles.wrong : '',
    state === 'disabled' ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={state === 'disabled' || state === 'correct' || state === 'wrong'}
    >
      <span className={styles.text}>{text}</span>
      {state === 'correct' && <span className={styles.icon}>✓</span>}
      {state === 'wrong' && <span className={styles.icon}>✗</span>}
    </button>
  );
}
