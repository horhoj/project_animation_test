import { useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import styles from './App.module.scss';
import { CircleOfHistory } from '~/components/CircleOfHistory/CircleOfHistory';
import { HistoricalDatesTitle } from '~/components/HistoricalDatesTitle';
import { Navigator } from '~/components/Navigator';
import { data } from '~/data/data';
import { VeryBigYear } from '~/components/VeryBigYear';
import { SliderBlock } from '~/components/SliderBlock';

export function App() {
  const windowSize = useWindowSize();
  const [selectedDataItemIdx, setSelectedDataItemIdx] = useState(0);

  const isMobile = windowSize.width !== null && windowSize.width <= 700;

  return (
    <div className={styles.App}>
      {!isMobile && <div className={styles.verticalLine} />}
      {!isMobile && <div className={styles.horizontalLine} />}
      <HistoricalDatesTitle className={styles.historicalDatesTitlePosition} />
      {!isMobile && (
        <CircleOfHistory
          className={styles.circleOfHistoryPosition}
          data={data}
          selectedDataItemIdx={selectedDataItemIdx}
          setSelectedDataItemIdx={setSelectedDataItemIdx}
        />
      )}
      <div className={styles.veryBigYearsWrapper}>
        <VeryBigYear
          type={'startYear'}
          year={data[selectedDataItemIdx].startYear}
        />
        <VeryBigYear
          type={'endYear'}
          year={data[selectedDataItemIdx].endYear}
        />
      </div>
      {!isMobile && (
        <Navigator
          className={styles.navigatorPosition}
          onChange={(i) => setSelectedDataItemIdx(i)}
          currentIdx={selectedDataItemIdx}
          maxIdx={data.length - 1}
        />
      )}
      <SliderBlock
        className={styles.sliderBlockPosition}
        isMobile={isMobile}
        slideListData={data[selectedDataItemIdx].info}
        title={data[selectedDataItemIdx].title}
      >
        {isMobile && (
          <Navigator
            className={styles.navigatorPosition}
            onChange={(i) => setSelectedDataItemIdx(i)}
            currentIdx={selectedDataItemIdx}
            maxIdx={data.length - 1}
          />
        )}
      </SliderBlock>
    </div>
  );
}
