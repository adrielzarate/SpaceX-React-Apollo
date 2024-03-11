import { Suspense, useState } from 'react';
import { useSuspenseQuery } from "@apollo/client";

import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { ProgressSpinner } from 'primereact/progressspinner';
import { VirtualScrollerLazyEvent } from 'primereact/virtualscroller';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';

import { TIdToken, TLaunches, TRole } from './Types/TLaunches';

import Chart from './components/chart';
import Details from './components/details';
import { queries } from './utils/roleQuery';

const decodedIdToken: TIdToken = {
  'iss': 'http://my-domain.auth0.com',
  'sub': 'auth0|123456',
  'aud': 'my_client_id',
  'exp': 1311281970,
  'iat': 1311280970,
  'name': 'Jane Doe',
  'email': 'janedoe@example.com',
  'roles': ['admin', 'guest']
};

const MAX_LAUNCHES = 200;
const STEP = 50;
let limit = STEP;

export default function App() {
  const [selectedLaunches, setSelectedLaunches] = useState<TLaunches | []>([]);
  const [role, setRole] = useState<TRole>(decodedIdToken.roles[0]);
  const { data, error, refetch } = useSuspenseQuery(queries[role], { variables: { limit } });

  const onLazyLoad = (e: VirtualScrollerLazyEvent): void => {
    if (limit < MAX_LAUNCHES && e.last === limit) {
      limit += STEP;
      refetch({ limit });
    }
  }

  const onMultiSelectChange = (e: MultiSelectChangeEvent): void => {
    setSelectedLaunches(e.value);
  };

  const setSelectedRole = (role: TRole): void => {
    limit = STEP;
    setRole(role);
  }

  if (error) return <pre>{error.message}</pre>

  return (
    <Suspense fallback={<ProgressSpinner />}>

      <div className="grid">
        <div className="col-6">
          <h1 className="text-900 font-bold text-5xl m-4">SpaceX Launches</h1>
        </div>
        <div className="col-6">
          <div className="flex justify-content-end align-items-center">
            <strong>Role</strong>
            <Dropdown
              value={role}
              onChange={(e) => setSelectedRole(e.value)}
              options={decodedIdToken.roles}
              placeholder="Select a City"
              className="w-full md:w-14rem m-4"
            />
          </div>
        </div>
      </div>

      <div className="grid">

        <div className="col-12 lg:col-8 card-height">
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

        <div className="col-12 lg:col-4 card-height">
          <div className="p-3 h-full">
            <Details launches={selectedLaunches} />
          </div>
        </div>

      </div>
    </Suspense >
  );
}
