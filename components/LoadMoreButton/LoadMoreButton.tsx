import styles from './LoadMoreButton.module.css';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <button onClick={onClick} disabled={loading} className={styles.btn}>
      {loading ? 'Loading...' : 'Load more'}
    </button>
  );
}
