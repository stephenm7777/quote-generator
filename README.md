# Getting Started

**IMPORTANT:** Without the AWS backend configured, you will probably see an error like this if you try to run the app as-is: `Module not found: Can't resolve '../src/aws-exports'` Please check out the [full tutorial on freeCodeCamp here](https://www.youtube.com/watch?v=FRmCxj9K7II) or scroll to the below section titled: "Instructions for Building the Project from Scratch" to get started building the project.

First, install the project dependencies from the root of the project:
```bash
npm i
# or
npm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Instructions for Deploying to AWS (Hosting)
To add hosting to your project, you will want to run `amplify add hosting` and then follow the instructions including:
- Amplify Managed Hosting (not S3/CloudFront)
- Git-Based deployments with CI/CD
- Creating a `prod` branch of your code in GitHub and hooking that into the Amplify CI/CD pipeline.

The Lambda script requires a special method for 1.) running in the cloud; and 2.) being built for public deployment on a website.

Because of this, we will need to make a specific update to the Lambda script's `package.json` file so that it compiles correctly.

Next, we will need to edit the `amplify.yml` file to change the build settings of the project in the AWS Amplify Build Settings console:

## **PART 1:** Lambda Script Update:

### BEFORE UPDATE:
```json
{
  "name": "inspirationalquotelambda",
  "author": "Tech Stack Playbook™️ ",
  "version": "2.0.0",
  "description": "Lambda function generated by Amplify",
  "main": "index.js",
  "license": "Apache-2.0",
  "devDependencies": {
    "@types/aws-lambda": "^8.10.92"
  },
  "dependencies": {
    "@types/node": "^18.13.0",
    "node-fetch": "^2.6.9",
    "path": "^0.12.7",
    "sharp": "^0.31.3"
  }
}

```

### ✅ AFTER UPDATE:
```json
{
  "name": "inspoquotelambda",
  "author": "Tech Stack Playbook™️ ",
  "version": "2.0.0",
  "description": "Lambda function generated by Amplify",
  "main": "index.js",
  "scripts": {
    "install:sharp": "npm i --arch=x64 --platform=linux sharp"
  },
  "license": "Apache-2.0",
  "devDependencies": {
    "@types/aws-lambda": "^8.10.92"
  },
  "dependencies": {
    "@types/node": "^20.1.0",
    "node-fetch": "^2.6.8",
    "path": "^0.12.7",
    "sharp": "^0.32.1"
  }
}
```

## **PART 2:** `amplify.yml` AWS Amplify Build Settings Update:
To find this page, go to the AWS Amplify app for your project in the AWS Management Console, then go to `App settings`, and then `Build settings`. On this page, you will see an editor with a title `App build specification`, to which you will edit the file with the following:

### BEFORE UPDATE:
```yml
version: 1
backend:
  phases:
    build:
      commands:
        - '# Execute Amplify CLI with the helper script'
        - amplifyPush --simple
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### ✅ AFTER UPDATE:
```yml
version: 1
backend:
  phases:
    build:
      commands:
        - npm run install:sharp --prefix ./amplify/backend/function/inspoquoteLambda/src
        - '# Execute Amplify CLI with the helper script'
        - amplifyPush --simple
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```