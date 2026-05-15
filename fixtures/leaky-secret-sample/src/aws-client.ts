// ⚠️ Workshop fixture only — these are FAKE AWS test credentials.
// AKIAEXAMPLE* is a documented example pattern; this value will not authenticate.
// Real production code should NEVER hard-code AWS credentials.

import { S3Client } from '@aws-sdk/client-s3'

const AWS_ACCESS_KEY_ID = 'AKIAEXAMPLE12345'
const AWS_SECRET_ACCESS_KEY = 'fake/secret/value/for/workshop/only'

export const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

export const BUCKET_NAME = 'sample-uploads-bucket'
