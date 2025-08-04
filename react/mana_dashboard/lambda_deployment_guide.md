It looks like your Lambda function is failing because it can't find the `mongoose` package. This is a common issue when deploying Node.js functions to AWS Lambda. The execution environment for your Lambda function is a clean slate, and it doesn't have any of your project's dependencies pre-installed.

To fix this, you need to create a deployment package that includes both your Lambda function code and all of its dependencies (in this case, `mongoose`).

Here's a step-by-step guide on how to do this:

### 1. Create a New Directory for Your Deployment Package

On your local machine, create a new, empty directory. This will be where you assemble your deployment package.

```bash
mkdir mana_ai_lambda
cd mana_ai_lambda
```

### 2. Create a `package.json` File

Inside the `mana_ai_lambda` directory, create a `package.json` file with the following content. This file tells `npm` which dependencies to install.

```json
{
  "name": "mana_ai_lambda",
  "version": "1.0.0",
  "description": "Lambda function for Mana AI",
  "main": "index.mjs",
  "dependencies": {
    "mongoose": "^8.16.2"
  }
}
```

### 3. Install the Dependencies

Now, run `npm install` in the `mana_ai_lambda` directory. This will download `mongoose` and all of its dependencies into a `node_modules` directory.

```bash
npm install
```

### 4. Add Your Lambda Function Code

Copy the code from the `updated_lambda_function.js` file that I created for you and save it as `index.mjs` inside the `mana_ai_lambda` directory.

**Important:** Make sure the file is named `index.mjs`, as this is what you specified as the `main` file in your `package.json`.

### 5. Create the Deployment Package (a .zip file)

Now you need to create a .zip file that contains the `index.mjs` file and the `node_modules` directory.

**On macOS or Linux:**

```bash
zip -r mana_ai_lambda.zip .
```

**On Windows:**

You can use the File Explorer to create the .zip file. Select the `index.mjs` file and the `node_modules` directory, right-click, and choose "Send to" > "Compressed (zipped) folder". Name the file `mana_ai_lambda.zip`.

### 6. Upload the Deployment Package to AWS Lambda

1.  Go to the AWS Lambda console and navigate to your `handleManaAiCalls` function.
2.  In the "Code source" section, click the "Upload from" button.
3.  Select ".zip file".
4.  Upload the `mana_ai_lambda.zip` file you just created.
5.  Click "Save".

After you've done this, your Lambda function will have access to the `mongoose` library, and the error should be resolved.
