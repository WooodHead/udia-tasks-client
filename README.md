# Udia Tasks Client

![UDIA](logo.png)

**Universal Dream | Infinite Awareness**

* The public client can be found at [https://tasks.udia.ca](https://tasks.udia.ca)
* The public facing API is at [udia-software/udia-tasks-server](https://github.com/udia-software/udia-tasks-server) and can be found at [https://udia-tasks-server.herokuapp.com/](https://udia-tasks-server.herokuapp.com/).

## Quickstart (Development)

To start the client locally:

  * Ensure the server is up and running locally!
    * Server: [udia-software/udia-tasks-server](https://github.com/udia-software/udia-tasks-server)
  * Install dependencies with `yarn install`
  * Run the client with `yarn start`

Now you can visit [`localhost:3000`](http://localhost:3000) from your browser.

## Environment Variables

The environment variables are embedded during the build time. For more information, please refer to the [docs](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables).

| Environment Variable      | Default Value                 | Description                     |
| ------------------------- |:-----------------------------:| -------------------------------:|
| `REACT_APP_API_ENDPOINT`  | `"http://localhost:5000/api"` | Server API endpoint             |
| `REACT_APP_REDUX_LOGGING` | ` `                           | Set any value for Redux logging |
| `REACT_APP_API_TIMEOUT`   | `10000`                       | API call milliseconds timeout   |
| `REACT_APP_GA_CODE`       | `UA-81872410-1`               | Google Analytics Tracking Code  |

## Production

To build the production instance of this application, run the following:

```bash
export REACT_APP_API_ENDPOINT="https://udia-tasks-server.herokuapp.com/api" && yarn build
```

You can then serve the production site locally:
```bash
# then, to serve the production site locally
yarn global add serve
serve -s build --port 3000
```

The following script will deploy the contents of `/build` to AWS S3:
```bash
aws s3 sync build/ s3://udia-tasks-client --delete
```
* the `--delete` flag removes the old minified js files that are no longer used.

## Testing

To test your react app:

  * Run the test with `yarn test`

## License

Udia Software Incorporated (UDIA)

Copyright (c) 2016-2017 Udia Software Incorporated. All Rights Reserved.

Common Public Attribution License Version 1.0 (CPAL-1.0)

Full license text can be found at [LICENSE](LICENSE)
