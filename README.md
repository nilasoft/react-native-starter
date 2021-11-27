# React Native Starter

- Clone repository.
- Open command line in the project folder.
- Install packages `yarn` or `npm i`.
- Start development server `yarn start` or `npm start`.

## Commands

- `yarn start` Start development server.
- `yarn android` Build a standalone APK for Android.
- `yarn ios` Build a standalone IPA for iOS.
- `yarn lint` Check code quality.

## Project Structure

- `/assets`
- `/src`
    - `core`
    - `/app`
      - `/common`
      - `/feature1`
      - `/feature2`
      - `/feature3`
    - `shared`
    - `index.ts`
- `app.json`
- `package.json`

## `/assets`

Put static resources like image, video, font and... in this folder.

Usage example: [Adding an image](https://docs.expo.io/tutorial/image/)

## `app.json`

App configurations that will be used by Expo (name, icon, splash image...).

See [properties](https://docs.expo.io/workflow/configuration/).

## `package.json`

Project scripts and dependencies go here.

Use [Yarn](https://yarnpkg.com/) package manager instead of NPM.

Install a package `yarn add <pkg_name>`.

Remove a package `yarn remove <pkg_name>`.

## `index.ts`

This is the entry point of project.

It can be set in `package.json`:

```json
{
  "main": "src/index.ts"
}
```

## `/main/app`

This folder contains root component and configurations...

### `app.store.ts`

Creates and configures a Redux store with middlewares (like Saga).

> Refer to code for more details...

### `app.reducer.ts`

Root reducer of the application.

> Add all the other reducers in here to combine them...

### `app.saga.ts`

Root saga of the application.

> Fork all the other sagas in here to run them in parallel...

### `app.model.ts`

Basic types and interfaces for using with redux states.

> There are some basic models for async action and error handling
> which you can use for features state.

> Refer to code for more details...

### `app.hook.ts`

App start up hook that runs initial actions and notifies when ready...

> Refer to code for more details...

### `app.style.ts`

App global theme and styles.

> Refer to code for more details...

### `app.(component/screen).ts`

Application root component and screen.

It does:

- Add Redux provider.
- Add [Appearance](https://docs.expo.io/versions/latest/sdk/appearance/) provider (for color scheme detection).
- Make app ready.
- Add [SafeArea](https://docs.expo.io/versions/latest/sdk/safe-area-context/) provider.
- Add app theme provider.
- Add Paper provider (the UI kit) and configure its theme.
- Add Navigation container and configure its theme.
- Change status bar style.
- Configure navigators and screens.

> Be aware that hooks, components and apis are only available in their providers.
> For example you can't use Paper components outside the `PaperProvider`.

> Use stack navigator for screens that need a header.

> Create separate navigator instances for screens that are related to each other.

## `/core/common`

If you have a code that will be used everywhere in the project, add it here...

### `client.ts`

Basic http client that can be used for calling back-end apis.

> Refer to code for more details...

### `utils.ts`

Simple utility functions that will be used all across the app.

> Refer to code for more details...

## `main/feature`

Every part of the application should be added to the project as a separate module or feature,
like Preferences, I18n, Authentication and...

> Keep everything that is related to a feature in its own folder as much as possible,
> to make it portable and easy to copy.

> Use kebab-case for file naming (lower case separated by dash).

Features can have different parts, for adding a new feature,
create a folder with the feature name in `src` and add these files:

### `*.model.ts`

Put every type and interface that related to the feature in here.

> If you have a model which has a data with multiple actions,
> in its interface add a property for the data,
> and a property for each action with `AsyncState<void>`
> type that has no data and only keeps status and error.
> See `auth.model.ts` for example.

Example `home.model.ts`:

```typescript
// Imports...

export type Status = 'pending' | 'published';

export interface Post {

  id: number;

  name: string;

  body: string;

  status: Status;

}

export interface Home {

  posts: AsyncState<Post[]>;

}
```

### `*.action.ts`

Define feature actions in here.

Redux states are readonly data, to change their values you have to define actions.

Example `home.action.ts`:

```typescript
// Imports...

export const homePostsRequest = createAction('home/posts/request');

export const homePostsSuccess = createAction<Post[]>('home/posts/success');

export const homePostsFailure = createAction('home/posts/failure', failure());
```

### `*.reducer.ts`

Reducer is a pure function (with no async calls) that manipulates state value according to actions.

> After defining the reducer, add it to `/app/app.reducer.ts`.

> Redux Toolkit configures [Immer](https://immerjs.github.io/immer/docs/introduction) library under the hood,
> so you can directly mutate (manipulate) states in the reducer which basically is not allowed in Redux.

Example `home.reducer.ts`:

```typescript
// Imports...

const initialState: Home = {
  posts: {}
};

export default createReducer(initialState, {
  [homePostsRequest.type]: state => {
    state.posts.status = 'request';
    state.posts.error = null;
  },
  [homePostsSuccess.type]: (state, action: PayloadAction<Post[]>) => {
    state.posts.status = 'success';
    state.posts.data = action.payload;
  },
  [homePostsFailure.type]: (state, action: FailureAction) => {
    state.posts.status = 'failure';
    state.posts.error = action.error;
  }
});
```

### `*.selector.ts`

Selectors are simple functions that take the root state and give specific parts.

They can be used in components or sagas.

> If the selection has a heavy flow use [reselect](https://redux-toolkit.js.org/api/createSelector) library
> to cache the data, because selectors will be called in every ui render and may slow the app.

Example `home.selector.ts`:

```typescript
// Imports...

export const selectHome = selector(state => state.home)();

export const selectHomePosts = selector(state => state.home.posts)();
```

### `*.api.ts`

Put your logics like calling device apis, working with storage, fetching data from the server and... in here.

> Use `async/await` for your functions.

Example `home.api.ts`:

```typescript
// Imports...

// Defin constant values here...

export async function getPosts(): Promise<Post[]> {
  let {data} = await client.get<Post[]>('/posts');
  return data;
}
```

### `*.saga.ts`

Saga is a generator function that watches async redux actions and runs some tasks in the background to handle them.

> After defining the saga, fork it in `/app/app.saga.ts`.

> Refer to [Saga](https://redux-saga.js.org/) document for more information...

Example `home.saga.ts`:

```typescript
// Imports...

export default function* (): SagaIterator {
  yield takeLatest(homePostsRequest, handlePosts);
}

function* handlePosts(): SagaIterator {
  try {
    let posts: Post[] = yield call(getPosts);
    yield put(homePostsSuccess(posts));
  } catch (err) {
    yield put(homePostsFailure(err));
  }
}
```

### `*.(component/screen).ts`

Application views.

> Use [Tailwind](https://tvke.github.io/react-native-tailwindcss/) for styling your components.

> Remember that React function components will be executed entirely in every ui rendering.
> So if there is a heavy computation in the component,
> cache them by `useMemo()` [hook](https://reactjs.org/docs/hooks-reference.html#usememo).

> Use `.screen.ts` extension for navigation components.

> Get theme context by `useTheme()` hook from Paper.

> Always use `function` keyword for declaring handlers.

Example `home.component.ts`:

```typescript jsx
// Imports...

// Define constant values here...

// Add cutom styles here...
// Put your styles in a seperate `*.style.ts` file if it got larger.
const styles = StyleSheet.create({
  // ...
});

export default function HomeScreen(): ReactElement {

  const dispatch = useDispatch();
  const home = useSelector(selectHome);
  // Other hooks...
  // `useState()` hooks...
  // Variables...
  // Prefer `const` over `let`
  const posts = home.posts;

  // Effects...
  useEffect(() => {
    // ...
    dispatch(homePostsRequest());
    // ...
  }, []);

  // Event handlers...
  function onEvent(...args: any[]): void {
    // ...
    // Dispatch actions...
    // ...
  }

  // Show posts...
  return (
    <View/>
  );

}

// Write local components, types, interfaces and utility functions here...
```

## Default Features

Some default features have been added to the project that can be used.

### `/core/prefs`

This module contains states, actions and views for persisting user preferences (like theme).

> Refer to code for more details...

### `/core/i18n`

This module brings localization to the app.

Add messages in `/i18n/res` folder, then you can get translation in your components like this:

```typescript jsx
const {t} = useTranslation();

// ...

<Text>{t('key')}</Text>
```

> Its powered by [i18next](https://react.i18next.com/).

> Refer to code for more details...

### `/core/nav`

This module persists navigation history in the development mode to use it in the app reloads.

See [Navigation State Persistence](https://reactnavigation.org/docs/state-persistence/).

> Refer to code for more details...

### `/core/auth`

This module contains states, actions and views for user authentication.

> Refer to code for more details...

## Accounts
### google
`email:` `reactnativenilasoft@gmail.com`

`password:` `nilasoft12345678`

###sentry
There is a sentry account with that gmail

## Notices

> Don't invent the wheel! Before you write a code, search for similar cases,
> maybe there is a library for your needs. Libraries like [Lodash](https://lodash.com/)
> have a lot of functions that make your life easier.

> Since we are using Typescript, please don't leave any type unknown.
> Try to explicitly specify types for variables, function params, return types and...

```typescript
// Not good
function name(param) { /* */ }
// Good
function name(param: string | number | any): void | string | number | any { /* */ }
```

> Use [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) approach
> for calling async functions in sync scopes:

```typescript
// None async scope
(async () => {
  // Use `await`...
})();
// None async scope
```

> Use `Ctrl+Alt+O` in WebStorm and VSCode to sort imports.

> Keep every thing simple and clean, thank you ;)

## Tools

[Expo](https://expo.io/)
React Native build tools.

[React Native Paper](https://reactnativepaper.com/)
Default UI Kit.

[React Navigation](https://reactnavigation.org/)
For routing and navigation.

[Redux](https://redux.js.org/)
State management.

[Redux Toolkit](https://redux-toolkit.js.org/)
Redux helper functions.

[Redux Saga](https://redux-saga.js.org/)
Redux side effects (async actions).

[Formik](https://formik.org/)
Form builder.

[Typography](https://github.com/hectahertz/react-native-typography)
Standard styles for texts.

[Axois](https://github.com/axios/axios)
HTTP client.

[Lodash](https://lodash.com/)
Utility functions.

[React Native TailwindCSS](https://github.com/TVke/react-native-tailwindcss)
A react-native styling system, based on [TailwindCSS](https://tailwindcss.com/docs/what-is-tailwind/).

[ESLint](https://eslint.org/)
Find and fix problems in your JavaScript code.

[Lint-staged](https://github.com/okonet/lint-staged)
Run linters on git staged files.

## Resources

- [React Hooks](https://reactjs.org/docs/hooks-reference.html)
- [Handling platform differences](https://docs.expo.io/tutorial/platform-differences/)
- [App Debugging](https://docs.expo.io/workflow/debugging/)
- [Best libraries for React Native](https://github.com/jondot/awesome-react-native)
- [Navigation State Persistence](https://reactnavigation.org/docs/state-persistence/)
- [Navigation Auth Flow](https://reactnavigation.org/docs/auth-flow)
- [ESLint Config](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community)
