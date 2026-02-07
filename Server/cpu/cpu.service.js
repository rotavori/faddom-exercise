import { DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { cloudWatchClient, ec2Client } from '../integrations/aws.js';
import { GetMetricStatisticsCommand } from '@aws-sdk/client-cloudwatch';


const fetchInstanceIdByIp = async (ip) => {
    const command = new DescribeInstancesCommand({
        Filters: [
            {
                Name: 'private-ip-address',
                Values: [ip]
            }
        ]
    });

    const resp = await ec2Client.send(command);

    return resp?.Reservations?.[0]?.Instances?.[0]?.InstanceId;
};

export const fetchCpuUsage = async (ip, timePeriod, interval) => {
    const instanceId = await fetchInstanceIdByIp(ip);
    if (!instanceId) {
        const error = new Error('Failed to fetch instance id');
        error.statusCode = 404;
        throw error;
    }

    const startTime = new Date(Date.now() - timePeriod * 1000);
    const endTime = new Date();
    const command = new GetMetricStatisticsCommand({
        Namespace: 'AWS/EC2',
        MetricName: 'CPUUtilization',
        Dimensions: [
            {
                Name: 'InstanceId',
                Value: instanceId
            }
        ],
        StartTime: startTime,
        EndTime: endTime,
        Period: interval,
        Statistics: ['Average']
    });

    const resp = await cloudWatchClient.send(command);
    return resp;
};