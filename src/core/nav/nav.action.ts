import {NavigationState} from '@react-navigation/native';
import {createAction} from '@reduxjs/toolkit';

export const navLoadRequest = createAction('nav/load/request');

export const navLoadSuccess = createAction<NavigationState>('nav/load/success');
