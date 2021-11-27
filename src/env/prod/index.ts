import {Environment} from '../env.model';

export const env: Environment = {
  urls: {
    api: {
      protocol: 'https',
      hostname: 'prodBackendUrl/'
    },
    cdn: {
      protocol: 'https',
      hostname: 'prodCdnUrl/'
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
    environment: 'Production'
  },

  common: {
    password_length: 8,
    password_pattern: /\d/,
    image_size: 5242880
  },

  name: 'PROD'
};
