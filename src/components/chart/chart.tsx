import { useEffect, useState } from 'react';
import { Chart as PrimeReactChart } from 'primereact/chart';

import { ChartData } from 'chart.js';
import { TLaunches } from '../../Types/TLaunches';

import { getEnergyConsumption } from '../../utils/helpers';

const defaultChartData = {
    labels: [],
    datasets: [{ data: [] }]
};

const Chart = ({ data }: { data: TLaunches }) => {
    const [chartData, setChartData] = useState<ChartData>(defaultChartData);

    useEffect(() => {
        if (data) {
            const labels = data.map(launch => launch.mission_name);
            const energy = data.map(launch => getEnergyConsumption(launch.rocket.rocket.mass.kg));

            setChartData({
                labels,
                datasets: [
                    {
                        data: energy,
                        backgroundColor: [
                            '#37a3eb',
                            '#ff6385',
                            '#4bc0c0',
                            '#ffa040',
                            '#9967ff',
                            '#ffcd56',
                            '#cacbcf'
                        ],
                    }
                ],

            });
        }
    }, [data]);

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
    };

    return (
        <PrimeReactChart type='bar' data={chartData} options={options} />
    );
};

export default Chart;
