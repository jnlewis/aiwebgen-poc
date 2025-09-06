import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { loadTemplate, TemplateFile } from './templateLoader';

interface TemplateResponse {
  success: boolean;
  files: TemplateFile[];
  error?: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: ''
    };
  }

  try {
    const files = await loadTemplate();
    
    const response: TemplateResponse = {
      success: true,
      files
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error loading template:', error);
    
    const response: TemplateResponse = {
      success: false,
      files: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    };
  }
};
