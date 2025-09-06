import { streamifyResponse, ResponseStream } from 'lambda-stream';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ChatRequest } from './types';
import { invokeClaudeStreamToResponseStream } from './bedrockClient';

export const handler = streamifyResponse(async (event, responseStream, _context) => {
  try {
    if (!event.body) {
      responseStream.write('Error: Request body is required');
      responseStream.end();
      return;
    }

    const request: ChatRequest = JSON.parse(event.body);
    
    await invokeClaudeStreamToResponseStream(request, responseStream);
    
  } catch (error) {
    console.error('Error:', error);
    responseStream.write('Error: Internal server error');
    responseStream.end();
  }
});
