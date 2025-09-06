#!/bin/bash

echo "Building TypeScript..."
npx tsc

echo "Build complete. Files compiled to lib/ directory."
echo "Run 'serverless deploy' to deploy to AWS."
