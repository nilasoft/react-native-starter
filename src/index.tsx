import 'react-native-gesture-handler';

import {registerRootComponent} from 'expo';
import {preventAutoHideAsync} from 'expo-splash-screen';
import React, {ReactElement, useMemo} from 'react';
import {enableScreens} from 'react-native-screens';
import {Provider as ReduxProvider} from 'react-redux';
import AppComponent from './main/app/app.component';
import {createStore} from './core/state/state.api';

(async () => {
  // Use native screens to optimize rendering.
  enableScreens();
  // Prevent splash screen from hiding before main is ready.
  if (!__DEV__)
    await preventAutoHideAsync();
})();

function Root(): ReactElement {

  const store = useMemo(createStore, []);

  return (
    <ReduxProvider store={store}>
      <AppComponent/>
    </ReduxProvider>
  );

}

registerRootComponent(Root);
