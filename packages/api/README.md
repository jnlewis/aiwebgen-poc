# API

A serverless API for the AI Web Builder that integrates with Amazon Bedrock Claude 3.7 Sonnet to generate React + Vite TypeScript applications.

## Features

- **Static Chat API**: Regular request/response endpoint
- **Streaming Chat API**: Streaming response endpoint  
- **Template Loading**: Loads base React + Vite template for new projects
- **Bedrock Integration**: Uses Claude 3.5 Sonnet for code generation
- **CORS Support**: Configured for frontend integration

## Endpoints

### POST /ChatStatic
Static chat endpoint that returns complete responses.

### POST /ChatStream  
Streaming chat endpoint for real-time responses.

## Request Format

```json
{
  "messages": [
    {
      "id": "unique-id",
      "role": "user",
      "content": "create a sample NFT marketplace",
      "rawContent": "create a sample NFT marketplace",
      "cache": false,
      "parts": []
    }
  ],
  "isFirstPrompt": true,
  "framework": "vite-react",
  "promptMode": "build",
  "projectId": "project-id"
}
```

## Response Format

The API returns responses with Artifact metadata that the frontend parses to create/modify files:

```json
{
  "content": "I'll create a beautiful NFT marketplace...\n\n<Artifact id=\"nft-marketplace\" title=\"Create NFT Marketplace\">\n<Action type=\"file\" filePath=\"src/App.tsx\" contentType=\"content\">...</Action>\n</Artifact>",
  "id": "response-id",
  "role": "assistant",
  "cache": false,
  "parts": [...]
}
```

## Deployment

```
cd packages/api
npm install
npm run build
serverless deploy
```

1. Install dependencies: `npm install`
2. Build TypeScript: `npm run build` or `./build.sh`
3. Deploy to AWS: `serverless deploy`

## Environment Variables

- `apiKey`: Demo API key for authentication (set in serverless.yml)

## AWS Permissions

The Lambda functions require permissions for:
- `bedrock:InvokeModel`
- `bedrock:InvokeModelWithResponseStream`
