import axios from 'axios';

const URL = 'http://localhost:3000';

export const fetchCpuUsage = async (cpuFormData) => {
    try {
        const resp = await axios.get(`${URL}/cpu`, {
            params: {
                ip: cpuFormData?.ip,
                timePeriod: cpuFormData?.timePeriodValue * cpuFormData?.timePeriodUnit,
                interval: cpuFormData?.intervalValue * cpuFormData?.intervalUnit
            }
        });

        return resp?.data;
    } catch (error) {
        throw error;
    }
};