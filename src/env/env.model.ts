export interface Environment {
  urls: Urls,
  firebase: Firebase,
  sentry: Sentry;
  common: Common,
  name: 'PROD' | 'DEV'
}

interface Urls {
  api: Url,
  cdn: Url
}

interface Url {
  protocol: 'https' | 'http',
  hostname: string,

}

interface Firebase {
  analytics: {
    enabled: boolean,
  }
}

interface Sentry {
  sentry_dsn: string,
  enabled: boolean,
  environment: string
}

interface Common {
  password_length: number,
  password_pattern: RegExp,
  image_size: number,
}
