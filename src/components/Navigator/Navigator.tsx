import classNames from 'classnames';
import styles from './Navigator.module.scss';
import { ArrowIcon } from '~/assets/ArrowIcon';

interface NavigatorProps {
  className?: string;
  onChange: (i: number) => void;
  currentIdx: number;
  maxIdx: number;
}

const format = (value: number) => (value < 10 ? `0${value}` : `${value}`);

export function Navigator({
  className,
  currentIdx,
  maxIdx,
  onChange,
}: NavigatorProps) {
  const handleNext = () => {
    const nextIdx = currentIdx + 1 <= maxIdx ? currentIdx + 1 : 0;
    onChange(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = currentIdx - 1 >= 0 ? currentIdx - 1 : maxIdx;
    onChange(prevIdx);
  };

  return (
    <div className={classNames(styles.Navigator, className)}>
      <div className={styles.display}>{`${format(currentIdx + 1)}/${format(
        maxIdx + 1,
      )}`}</div>
      <div className={styles.navBtnWrapper}>
        <button
          onClick={handlePrev}
          className={styles.navBtn}
          disabled={currentIdx === 0}
        >
          <ArrowIcon isRight={false} />
        </button>
        <button
          onClick={handleNext}
          className={styles.navBtn}
          disabled={currentIdx === maxIdx}
        >
          <ArrowIcon isRight={true} />
        </button>
      </div>
    </div>
  );
}
