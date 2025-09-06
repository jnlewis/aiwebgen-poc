# AIWEBGEN POC


## Upload the Base Template

This uploads the React boilerplate app to S3. The web frontend will download these files via the backend API, and load it into the WebContainer library in memory. This template is important so the AI doesn't need to generate the whole project from scratch, and you have more control over what initial styling and components the template has. Then the AI only needs to extend from it.

1. Create a new bucket and upload the folder and all files in templates/app-template-base. The bucket folder name should be 'app-template-base', example: template-bucket/app-template-base

## Deploy the Backend API

This creates an API Gateway > Lambda > Bedrock architecture.

1. Replace TODO_API_KEY and TODO_BUCKET_NAME in packages/api/serverless
    Note: You can pick any API key. This just gives your frontend access to your API. You will configure frontend later.
2. Replace TODO_YOUR_S3_BUCKET_NAME in packages/api/src/templateLoader.ts

3. Build and deploy the Serverless API. Important, this uses the SAM IAC so ensure that SAM and AWS CLI is configured to the correct account.

```
cd packages/api
npm i
npm run build
npm run deploy
```

## Run the Frontend

The web frontend for the POC is vibe coded with bolt.new. 

1. Replace the following in packages/web/services/ApiService.ts

```
  private readonly API_KEY = '<TODO_API_KEY>';
  private readonly TEMPLATE_URL = '<TODO_TEMPLATE_API_URL>' // Eg: https://ip6c7bfrslyuke6nsq0ctelb.lambda-url.us-east-1.on.aws/;
  private readonly STREAMING_URL = '<TODO_STREAMING_API_URL>' // Eg: https://3e7vnnqpxnsww3tbu0zjkaq.lambda-url.us-east-1.on.aws/;
```

2. Build and run the app locally

```
cd packages/web
npm i
npm run dev
```
