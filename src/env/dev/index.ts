import {Environment} from '../env.model';

export const env: Environment = {

  urls: {
    api: {
      protocol: 'https',
      hostname: 'DevBackendUrl/'
    },
    cdn: {
      protocol: 'https',
      hostname: 'DevCdnUrl/'
    }
  },

  firebase: {
    analytics: {
      enabled: false
    }
  },

  sentry: {
    enabled: true,
    sentry_dsn: 'https://c0810b8d7f0849c48c7edc2f72c4552a@o983404.ingest.sentry.io/5939087',
    environment: 'Development'

  },

  common: {
    password_length: 8,
    password_pattern: /\d/,
    image_size: 5242880
  },
  name: 'DEV'
};
