# Setup


##### 1. Install node using nvm.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
nvm install 6.10.0
nvm use 6.10.0
```

##### 2. Install dependencies.
```
npm install
```

##### 3. Add your hostclass access to *in-app-admin* from [music growth AWS console](https://access.amazon.com/aws/accounts/show_user?account=music-growth&user=in-app-admin).


##### 4. Obtain your AWS Access Key ID and Secret Access Key. Run the following command from your Cloud Desktop:
```
/apollo/env/envImprovement/bin/odin-get com.amazon.access.music-growth-in-app-admin-1
``` 

First line of output is your *access key ID*. Second line is your *secret access key*.


##### 5. Back in your project directory, install serverless.
```
npm install -g serverless
```

##### 6. Then, run this command to set up your serverless credentials, using your AWS keys.
```
serverless config credentials --provider aws --key <your-access-key-id> --secret <your-secret-access-key> --profile iam
```

##### 7. Install gulp.
```
npm install --global gulp-cli
```

##### 8. Run this command to see your code run locally.
```
sls offline
```

##### 9. Run this command to deploy your code.
```
sls deploy

```

To deploy to production:
```
sls deploy --stage production
```

