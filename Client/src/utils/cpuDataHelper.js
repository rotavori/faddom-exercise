import isIP from 'validator/lib/isIP';

const MAX_DATAPOINTS = 1440;
const MIN_DATAPOINTS = 2;
const MIN_TIME_PERIOD = 600;
const MIN_INTERVAL = 300;

export const timeUnitOptions = [
    { value: 60, label: 'Minutes' },
    { value: 60 * 60, label: 'Hours' },
    { value: 60 * 60 * 24, label: 'Days' },
    { value: 60 * 60 * 24 * 7, label: 'Weeks' },
];

export const initialCpuFormData = {
    ip: '',
    timePeriodValue: '',
    timePeriodUnit: null,
    intervalValue: '',
    intervalUnit: null,
};

const dateNormalize = (timeStamp) => {
    const dateObj = new Date(timeStamp);

    const date = dateObj.toLocaleDateString();

    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    const time = `${hours}:${minutes}`;

    return `${date} ${time}`;
};

const averageNormalize = (average) => {
    return Number(average.toFixed(3)) * 100;
};

export const cpuDataNormalize = (cpuData) => {
    const dates = [];
    const averages = [];

    cpuData?.cpu?.Datapoints
        ?.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp))
        ?.map((dataPoint) => {
            dates.push(dateNormalize(dataPoint?.Timestamp));
            averages.push(averageNormalize(dataPoint?.Average));
        });

    return { dates, averages };
};

export const validateCpuForm = (cpuFormData) => {
    const { ip, timePeriodValue, timePeriodUnit, intervalValue, intervalUnit } = cpuFormData;

    if (!ip || !timePeriodValue || !timePeriodUnit || !intervalValue || !intervalUnit) {
        return { isValid: false, error: '' };
    }

    const timePeriod = timePeriodValue * timePeriodUnit;
    const interval = intervalValue * intervalUnit;

    if (interval > timePeriod) {
        return { isValid: false, error: 'Interval cannot be bigger than time period.' };
    }

    if (timePeriod / interval > MAX_DATAPOINTS) {
        return { isValid: false, error: 'Too many data points requested.' };
    }

    if (timePeriod / interval < MIN_DATAPOINTS) {
        return { isValid: false, error: 'Not enough data points requested.' };
    }

    if (interval % MIN_INTERVAL !== 0) {
        return { isValid: false, error: '' };
    }

    if (timePeriod < MIN_TIME_PERIOD) {
        return { isValid: false, error: '' };
    }

    if (!isIP(ip)) {
        return { isValid: false, error: 'IP address is not valid.' };
    }

    return { isValid: true, error: '' };
};