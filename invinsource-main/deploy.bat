call npm install

call npm run build

aws s3 sync ./dist/invinsource s3://www.invinsource.com

aws cloudfront create-invalidation --distribution-id  EIPMKBIFZ3YLP --paths "/*"

echo Deployment is done...

pause