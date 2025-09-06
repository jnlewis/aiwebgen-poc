import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ChatRequest, ChatResponse } from './types';
import { invokeClaudeStatic } from './bedrockClient';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, aiwebgen-poc-key'
        },
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const request: ChatRequest = JSON.parse(event.body);
    const content = await invokeClaudeStatic(request);
    
    const response: ChatResponse = {
      content,
      id: generateId(),
      role: 'assistant'
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, aiwebgen-poc-key'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, aiwebgen-poc-key'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
