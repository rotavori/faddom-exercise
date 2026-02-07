import { EC2Client } from '@aws-sdk/client-ec2';
import { CloudWatch } from '@aws-sdk/client-cloudwatch';

const config = {
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
};

export const ec2Client = new EC2Client(config);

export const cloudWatchClient = new CloudWatch(config);