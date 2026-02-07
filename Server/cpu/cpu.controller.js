import net from 'net';
import { fetchCpuUsage } from './cpu.service.js';

const MAX_DATAPOINTS = 1440;
const MIN_DATAPOINTS = 2;
const MIN_TIME_PERIOD = 600;
const MIN_INTERVAL = 300;

export const getCpuUsage = async (req, res) => {
    try {
        const { ip, timePeriod, interval } = req.validatedParams;

        const data = await fetchCpuUsage(ip, timePeriod, interval);
        res.json({ ip, timePeriod, interval, cpu: data });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const validateCpuUsageQuery = (req, res, next) => {
    const { ip, timePeriod, interval } = req.query;

    if (!ip || !timePeriod || !interval) {
        return res.status(400).json({ error: 'Ip, time period and interval are required.' });
    }

    const timePeriodInt = parseInt(timePeriod);
    const intervalInt = parseInt(interval);
    if (isNaN(timePeriodInt) || isNaN(intervalInt)) {
        return res.status(400).json({ error: 'Time period and interval must be valid Integers.' });
    }

    if (!net.isIP(ip)) {
        return res.status(400).json({ error: 'Ip is not valid.' });
    }

    if (intervalInt > timePeriodInt) {
        return res.status(400).json({ error: 'Interval cannot be bigger than time period.' });
    }

    if (timePeriodInt / intervalInt > MAX_DATAPOINTS) {
        return res.status(400).json({ error: 'Too many data points requested.' });
    }

    if (timePeriodInt / intervalInt < MIN_DATAPOINTS) {
        return res.status(400).json({ error: 'Not enough data points requested.' });
    }

    if (interval % MIN_INTERVAL !== 0) {
        return res.status(400).json({ error: 'Interval must be in steps of 5 minutes.' });
    }

    if (timePeriod < MIN_TIME_PERIOD) {
        return res.status(400).json({ error: 'Time period minimum is 10 minutes.' });
    }

    req.validatedParams = {
        ip: ip,
        timePeriod: timePeriodInt,
        interval: intervalInt
    };

    next();
};