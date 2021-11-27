import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {LinearGradient} from 'expo-linear-gradient';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageBackground, View} from 'react-native';
import {Title} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {authLogoutRequest} from '../auth/auth.action';
import {useAuth} from '../auth/auth.hook';
import AuthNavigator from '../auth/auth.navigator';
import BlogNavigator from '../blog/blog.navigator';
import HomeNavigator from '../home/home.navigator';
import PrefsNavigator from '../prefs/prefs.navigator';
import {useAppDispatch} from '../../core/state/state.hook';
import {useTheme} from '../../core/theme/theme.hook';
import {AppNavParams, MainNavParams} from './app.model';
import Avatar from '../../../assets/svg/svg.svg';
import SvgIcon from '../../shared/components/base/svg.icon.component';

const Stack = createStackNavigator<AppNavParams>();
const Drawer = createDrawerNavigator<MainNavParams>();

export default function AppNavigator(): ReactElement {

  const auth = useAuth();

  return (
    <Stack.Navigator headerMode='none'>
      {auth ? (
        <Stack.Screen name='Main'
                      component={MainNavigator}/>
      ) : (
        <Stack.Screen name='Auth'
                      component={AuthNavigator}/>
      )}
    </Stack.Navigator>
  );

}

export function MainNavigator(): ReactElement {

  const dispatch = useAppDispatch();
  const {colors, fonts} = useTheme();
  const {t} = useTranslation();

  function onLogout(): void {
    dispatch(authLogoutRequest());
  }

  return (
    <Drawer.Navigator initialRouteName='Blog'
                      drawerContent={props => (
                        <DrawerContentScrollView {...props} style={tw._mT1}>
                          <ImageBackground source={{uri: 'https://picsum.photos/300/200'}}
                                           style={[tw.h48, tw.mB2, tw.resizeCover]}>
                            <LinearGradient style={[tw.p4, tw.flex1]}
                                            colors={[
                                              'rgba(0, 0, 0, 0.5)',
                                              'transparent'
                                            ]}>
                              <View style={[tw.flexRow, tw.itemsCenter]}>

                                <View
                                  style={[
                                    tw.justifyCenter,
                                    tw.itemsCenter,
                                    tw.roundedFull,
                                    tw.w16, tw.h16,
                                    tw.mE2,
                                    {backgroundColor: colors.grayscale.bg}]}>
                                  <SvgIcon height={44} width={44} style={[tw.roundedFull]}>
                                    <Avatar/>
                                  </SvgIcon>
                                </View>

                                <Title style={tw.textWhite}>{t('appName')}</Title>
                              </View>
                            </LinearGradient>
                          </ImageBackground>
                          <DrawerItemList {...props} labelStyle={[fonts.Subtitle1, {color: colors.grayscale.active}]}/>
                          <DrawerItem label={t('logout')}
                                      labelStyle={[fonts.Subtitle1, {color: colors.warning.dark}]}
                                      onPress={onLogout}/>
                        </DrawerContentScrollView>
                      )}>
      <Drawer.Screen name='Home'
                     component={HomeNavigator}
                     options={{title: t('home')}}/>
      <Drawer.Screen name='Blog'
                     component={BlogNavigator}
                     options={{title: t('blog.blog')}}/>
      <Drawer.Screen name='Prefs'
                     component={PrefsNavigator}
                     options={{title: t('preferences')}}/>
    </Drawer.Navigator>
  );

}
