import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import React, {ReactElement, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useStackOptions} from '../../app/app.hook';
import {useAppSelector} from '../../../core/state/state.hook';
import {useTheme} from '../../../core/theme/theme.hook';
import {UserContext} from '../blog.context';
import {BlogNavParams} from '../blog.model';
import {selectBlogUser} from '../blog.selector';
import AlbumsScreen from './albums.screen';
import CommentsScreen from './comments.screen';
import PhotosScreen from './photos.screen';
import PostsScreen from './posts.screen';
import TodosScreen from './todos.screen';
import {DetailsNavParams, UserNavParams} from './user.model';
import UserScreen from './user.screen';

const Stack = createStackNavigator<UserNavParams>();
const Tab = createMaterialBottomTabNavigator<DetailsNavParams>();

const icons: Record<keyof DetailsNavParams, string> = {
  Posts: 'pencil',
  Albums: 'image-multiple',
  Todos: 'checkbox-marked-outline',
  User: 'account'
};

export default function UserNavigator(): ReactElement {

  const options = useStackOptions();
  const route = useRoute<RouteProp<BlogNavParams, 'User'>>();
  const navigation = useNavigation<StackNavigationProp<BlogNavParams>>();
  const user = useAppSelector(selectBlogUser(route.params.id));

  useEffect(() => {
    if (!user)
      navigation.navigate('Users');
  }, [user]);

  if (!user)
    return null;

  return (
    <UserContext.Provider value={route}>
      <Stack.Navigator initialRouteName='Details'
                       screenOptions={options}>
        <Stack.Screen name='Details'
                      component={DetailsNavigator}
                      options={{title: user.name}}/>
        <Stack.Screen name='Comments'
                      component={CommentsScreen}/>
        <Stack.Screen name='Photos'
                      component={PhotosScreen}/>
      </Stack.Navigator>
    </UserContext.Provider>
  );

}

function DetailsNavigator(): ReactElement {

  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <Tab.Navigator initialRouteName='Posts'
                   activeColor={colors.grayscale.active}
                   inactiveColor={colors.grayscale.medium_emphasis}
                   screenOptions={sp => ({
                     tabBarColor: colors.grayscale.white,
                     tabBarIcon: ip => {
                       let name = icons[sp.route.name];
                       let color = ip.focused ? colors.primary.default : colors.primary.light;
                       return (
                         <MaterialCommunityIcons {...ip}
                                                 name={name}
                                                 color={color}
                                                 size={26}/>
                       );
                     }
                   })}>
      <Tab.Screen name='Posts'
                  component={PostsScreen}
                  options={{title: t('blog.posts')}}/>
      <Tab.Screen name='Albums'
                  component={AlbumsScreen}
                  options={{title: t('blog.albums')}}/>
      <Tab.Screen name='Todos'
                  component={TodosScreen}
                  options={{title: t('blog.todos')}}/>
      <Tab.Screen name='User'
                  component={UserScreen}
                  options={{title: t('blog.user')}}/>
    </Tab.Navigator>
  );

}
