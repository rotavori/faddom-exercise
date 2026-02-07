import { useMemo } from 'react';
import styled from 'styled-components';
import Graph from '../general/Graph';
import { cpuDataNormalize } from '../../utils/cpuDataHelper';
import { primaryColor, secondaryColor } from '../../utils/colors';

const GraphWrapper = styled.div`
    height: 350px;
    width: 600px;
`;

function CpuGraph({ cpuData }) {
    const { dates, averages } = useMemo(() => cpuDataNormalize(cpuData), [cpuData]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `CPU usage over time - ${cpuData?.ip}`,
            },
        },
    };

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'CPU Usage (%)',
                data: averages,
                borderColor: secondaryColor,
                backgroundColor: primaryColor,
            },
        ],
    };

    return (
        <GraphWrapper>
            <Graph data={data} options={options} />
        </GraphWrapper>
    );
}

export default CpuGraph;