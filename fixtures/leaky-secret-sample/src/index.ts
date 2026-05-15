import { config } from './config'
import { s3, BUCKET_NAME } from './aws-client'

async function main() {
  console.log(`Starting service with model: ${config.openai.model}`)
  console.log(`Configured S3 bucket: ${BUCKET_NAME}`)
  console.log(`S3 client region: ${(await s3.config.region()).valueOf()}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
