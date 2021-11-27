import {NavigationContainer, NavigationContainerRef, NavigationState} from '@react-navigation/native';
import Constants from 'expo-constants';
import {StatusBar} from 'expo-status-bar';
import _ from 'lodash';
import React, {ReactElement, useEffect, useMemo, useRef} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {save as saveNav} from '../../core/nav/nav.api';
import {selectNav} from '../../core/nav/nav.selector';
import {useAppDispatch, useAppSelector} from '../../core/state/state.hook';
import {selectThemeNav, selectThemePaper} from '../../core/theme/theme.selector';
import {appInitRequest} from './app.action';
import AppNavigator from './app.navigator';
import {selectApp} from './app.selector';
import SplashComponent from './splash.component';
import {sentryNavigation} from "../../core/sentry/sentry.service";
import {useTheme} from "../../core/theme/theme.hook";

export default function AppComponent(): ReactElement {

  const dispatch = useAppDispatch();
  const app = useAppSelector(selectApp);

  useEffect(() => {
    dispatch(appInitRequest());
  }, []);

  if (app.init.status !== 'success')
    return null;

  return (
    <SafeAreaProvider>
      <Container/>
    </SafeAreaProvider>
  );

}

function Container(): ReactElement {
  const nav = useAppSelector(selectNav);
  const {colors} = useTheme();
  const paperTheme = useAppSelector(selectThemePaper);
  const navTheme = useAppSelector(selectThemeNav);
  const onNavChange = useMemo(() => _.debounce(saveNav, 500), []);
  const navigationRef = useRef<NavigationContainerRef>();
  const routeNameRef = useRef<any>();


  function onStateChange(state: NavigationState): void {

    //save navigation state
    onNavChange(state);

    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    if (previousRouteName !== currentRouteName) {
      //Add breadcrumb
      sentryNavigation(previousRouteName, currentRouteName);
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar backgroundColor={colors.grayscale.bg}/>
      <NavigationContainer theme={navTheme}
                           initialState={nav.data}
                           ref={navigationRef}
                           onStateChange={onStateChange}>
        <AppNavigator/>
      </NavigationContainer>
      <SplashComponent/>
    </PaperProvider>
  );

}
