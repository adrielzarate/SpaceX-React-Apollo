import { Suspense, useState } from 'react';
import { useSuspenseQuery } from "@apollo/client";
import { LAUNCHES_QUERY } from './queries/launches';

import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { ProgressSpinner } from 'primereact/progressspinner';
import { VirtualScrollerLazyEvent } from 'primereact/virtualscroller';
import { Card } from 'primereact/card';

import { TLaunches } from './Types/TLaunches';

import Chart from './components/chart';
import Details from './components/details';

const MAX_LAUNCHES = 200;
const STEP = 50;
let limit = STEP;

export default function App() {
  const [selectedLaunches, setSelectedLaunches] = useState<TLaunches | []>([]);
  const { data, error, refetch } = useSuspenseQuery(LAUNCHES_QUERY, { variables: { limit } });

  const onLazyLoad = (e: VirtualScrollerLazyEvent): void => {
    if (limit < MAX_LAUNCHES && e.last === limit) {
      limit += STEP;
      refetch({ limit });
    }
  }

  const onMultiSelectChange = (e: MultiSelectChangeEvent): void => {
    setSelectedLaunches(e.value);
  };

  if (error) return <pre>{error.message}</pre>

  return (
    <Suspense fallback={<ProgressSpinner />}>
      <h1 className="text-900 font-bold text-6xl my-4 text-center">SpaceX Launches</h1>

      <div className="grid">
        <div className="col-12 lg:col-8" style={{ height: '800px' }}>
          <div className="p-3 h-full">
            <Card title="Energy consumption per launch in Jules" className="shadow-2 h-full">
              <MultiSelect
                className="w-full mb-4"
                placeholder="Select Launches"
                value={selectedLaunches}
                onChange={onMultiSelectChange}
                virtualScrollerOptions={{
                  itemSize: STEP,
                  lazy: true,
                  onLazyLoad: onLazyLoad
                }}
                options={data.launches}
                optionLabel="mission_name"
                showSelectAll={false}
                display="chip"
              />
              <Chart data={selectedLaunches} />
            </Card>
          </div>
        </div>

        <div className="col-12 lg:col-4" style={{ height: '800px' }}>
          <div className="p-3 h-full">
            <Details launches={selectedLaunches} />
          </div>
        </div>
      </div>
    </Suspense >
  );
}