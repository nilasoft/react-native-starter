import {ReactNativeOptions} from '@sentry/react-native/dist/js/options';
import {env} from '../../env';

export const SentryConfig: ReactNativeOptions = {
  dsn: env.sentry.sentry_dsn,
  enabled: env.sentry.enabled,
  maxBreadcrumbs: 100,
  environment: env.sentry.environment
};
