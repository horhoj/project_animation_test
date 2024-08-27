import classNames from 'classnames';
import styles from './HistoricalDatesTitle.module.scss';

interface HistoricalDatesTitleProps {
  className?: string;
}

export function HistoricalDatesTitle({ className }: HistoricalDatesTitleProps) {
  return (
    <div className={classNames(styles.HistoricalDatesTitle, className)}>
      <div className={styles.leftBorder}></div>
      <div className={styles.title}>
        <div>Исторические</div>
        <div>даты</div>
      </div>
    </div>
  );
}
