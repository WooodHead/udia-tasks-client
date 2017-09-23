# Udia Client

[![Build Status](https://travis-ci.org/udia-software/udia-client.svg?branch=master)](https://travis-ci.org/udia-software/udia-client)
[![Dependency Status](https://img.shields.io/david/udia-software/udia-client.svg)](https://david-dm.org/udia-software/udia-client)
[![Dev-Dependency Status](https://img.shields.io/david/dev/udia-software/udia-client.svg)](https://david-dm.org/udia-software/udia-client#info=devDependencies)

![UDIA](logo.png)

**Universal Dream | Infinite Awareness**

* The public client can be found at [https://www.udia.ca](https://www.udia.ca)
* The public facing API is at [udia-software/udia-server](https://github.com/udia-software/udia-server) and can be found at [https://udia-server.herokuapp.com/](https://udia-server.herokuapp.com/).

## Quickstart (Development)

To start the client locally:

  * Ensure the server is up and running locally!
    * Server: [udia-software/udia-server](https://github.com/udia-software/udia-server)
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


## Production

To build the production instance of this application, run the following:

```bash
export REACT_APP_API_ENDPOINT="https://udia-server.herokuapp.com/" && yarn build
```

You can then serve the production site locally:
```bash
# then, to serve the production site locally
yarn global add serve
serve -s build --port 3000
```

The following script will deploy the application to AWS S3:
```bash
export REACT_APP_API_ENDPOINT="https://udia-server.herokuapp.com/api" && yarn build
aws s3 sync build/ s3://udia-client
```

## Testing

To test your react app:

  * Run the test with `yarn test`

## License

Udia Software Incorporated (UDIA)

Copyright (c) 2016-2017 Udia Software Incorporated. All Rights Reserved.

Common Public Attribution License Version 1.0 (CPAL-1.0)

Full license text can be found at [LICENSE](LICENSE)
