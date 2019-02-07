## Running it

Simply install and start with [Yarn](https://yarnpkg.com/en/)

```
yarn
yarn start
```

### Or one-line-it
```
yarn && yarn start
```

And browse to http://localhost:3000 if it doesn't open your browser automatically.

/give-consent
![screenshot](https://i.imgur.com/8jPYkDo.png)


/consents
![screenshot](https://i.imgur.com/bsIQBzd.png)
## Running tests

```
yarn test
```

Styles and tests are very basic. Also eventually this could be improved by using [Sagas](https://github.com/redux-saga/redux-saga) instead of [Thunks](https://github.com/reduxjs/redux-thunk).

The app is using [fake-fetch](https://www.npmjs.com/package/fake-fetch) to mock the `fetch` requests from the browser and avoid doing them.

Enjoy.