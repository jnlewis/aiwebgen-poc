import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

export interface TemplateFile {
  path: string;
  content: string;
}

const s3Client = new S3Client({ region: 'us-east-1' });
const BUCKET_NAME = '<TODO_YOUR_S3_BUCKET_NAME>';
const TEMPLATE_PREFIX = 'app-template-base/';

export async function loadTemplate(): Promise<TemplateFile[]> {
  const files: TemplateFile[] = [];
  
  const listCommand = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: TEMPLATE_PREFIX
  });
  
  const listResponse = await s3Client.send(listCommand);
  
  if (listResponse.Contents) {
    for (const object of listResponse.Contents) {
      if (object.Key) {
        const getCommand = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: object.Key
        });
        
        const response = await s3Client.send(getCommand);
        const content = await response.Body?.transformToString() || '';
        
        files.push({
          path: object.Key.replace(TEMPLATE_PREFIX, ''),
          content
        });
      }
    }
  }
  
  return files;
}
