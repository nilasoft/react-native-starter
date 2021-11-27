import {RouteProp} from '@react-navigation/native';
import {createContext} from 'react';
import {BlogNavParams} from './blog.model';

export const UserContext = createContext<RouteProp<BlogNavParams, 'User'>>(null);
