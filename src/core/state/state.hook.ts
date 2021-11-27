import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, AppState, AppStore} from './state.model';

export const useAppStore: () => AppStore = useStore;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
