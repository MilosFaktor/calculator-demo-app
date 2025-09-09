
# builds /dist folder of .env.dev 
npm run build -- --mode dev
# builds /dist folder of .env.prod
npm run build -- --mode prod

# deploys to s3 bucket:dev
aws s3 sync dist/ s3://calculator-demo-app.cloudnecessities.com/dev/ --delete
# deploys to s3 bucket:prod
aws s3 sync dist/ s3://calculator-demo-app.cloudnecessities.com/prod/ --delete

### Invalidate cloudfront cache
# lists distributions in table
aws cloudfront list-distributions --query "DistributionList.Items[*].[Id,DomainName,Comment]" --output table
# invalidates given path
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"


