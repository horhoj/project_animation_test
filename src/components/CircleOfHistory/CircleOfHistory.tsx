import classNames from 'classnames';
import { memo, useMemo, useRef } from 'react';
import styles from './CircleOfHistory.module.scss';
import { DataItem } from '~/data/data.types';

interface CircleOfHistoryProps {
  className?: string;
  data: DataItem[];
  selectedDataItemIdx: number;
  setSelectedDataItemIdx: (id: number) => void;
}

const DEGREES_IN_A_FULL_CIRCLE = 360;
const START_ANGLE = 120;

function CircleOfHistoryComponent({
  className,
  data,
  selectedDataItemIdx,
  setSelectedDataItemIdx,
}: CircleOfHistoryProps) {
  const segmentDeg = useMemo(
    () => DEGREES_IN_A_FULL_CIRCLE / data.length,
    [data.length],
  );

  const currentIdx = useRef(0);
  const currentAngle = useRef(START_ANGLE);

  const { angle, transitionSpeed } = useMemo(() => {
    const halfLength = Math.ceil(data.length / 2);

    let offset = selectedDataItemIdx - currentIdx.current;
    if (offset >= halfLength) {
      offset = offset - data.length;
    }
    if (offset < -halfLength) {
      offset = offset + data.length;
    }
    const result = {
      angle: currentAngle.current - offset * segmentDeg,
      transitionSpeed: Math.abs(offset) * 1000,
    };
    currentIdx.current = selectedDataItemIdx;
    currentAngle.current = result.angle;

    return result;
  }, [selectedDataItemIdx, segmentDeg, data]);

  const handleClick = (idx: number) => {
    setSelectedDataItemIdx(idx);
  };

  return (
    <div className={classNames(styles.CircleOfHistory, className)}>
      <div className={styles.circle}>
        {data.map((el, i) => (
          <div
            className={styles.element}
            key={el.id}
            style={{
              transform: `rotateZ(${angle + segmentDeg * i}deg)`,
              transition: `transform ${transitionSpeed}ms`,
            }}
          >
            <button
              className={classNames(
                styles.elementBtn,
                i === selectedDataItemIdx && styles.activeBtn,
              )}
              style={{
                transform: `rotateZ(${-angle - segmentDeg * i}deg)`,
                transition: `transform ${transitionSpeed}ms`,
              }}
              onClick={() => handleClick(i)}
            >
              <span className={styles.btnIdx}>{i + 1}</span>
              <span
                className={styles.btnTitle}
                style={{
                  transition: `transform ${transitionSpeed}ms, opacity ${transitionSpeed}ms`,
                }}
              >
                {el.title}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CircleOfHistory = memo(CircleOfHistoryComponent);
