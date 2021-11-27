import {useFocusEffect} from '@react-navigation/native';
import {Asset, useAssets} from 'expo-asset';
import _ from 'lodash';
import {EffectCallback, useCallback, useEffect, useRef} from 'react';
import {Alert} from 'react-native';
import {AsyncState} from '../state/state.model';

export function useFirstRender(): boolean {
  const ref = useRef(true);
  useEffect(() => {
    const immediate = setImmediate(() => {
      ref.current = false;
    });
    return () => clearImmediate(immediate);
  }, []);
  return ref.current;
}

/**
 * Hook for handling screen lifecycle.
 */
export function useFocus(effect: EffectCallback, memoize?: boolean): void {
  const callback = useCallback(effect, memoize ? [] : [effect]);
  useFocusEffect(callback);
}

export function useFailureEffect<T>(state: AsyncState<T>, callback?: () => boolean): void {
  useEffect(() => {
    if (state?.status === 'failure') {
      if (typeof callback !== 'function' || callback())
        Alert.alert('Failure', state.error);
    }
  }, [state?.status]);
}

/**
 * Hook to load a single asset.
 */
export function useAsset(id: number): Asset {
  const [assets] = useAssets(id);
  return _.head(assets);
}
