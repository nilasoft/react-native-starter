import {createAction} from '@reduxjs/toolkit';
import {failure} from '../../core/state/state.util';
import {Blog} from './blog.model';

export const blogFetchRequest = createAction('blog/fetch/request');

export const blogFetchCancel = createAction('blog/fetch/cancel');

export const blogFetchSuccess = createAction<Blog>('blog/fetch/success');

export const blogFetchFailure = createAction('blog/fetch/failure', failure());
