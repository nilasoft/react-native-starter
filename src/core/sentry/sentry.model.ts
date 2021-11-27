export interface Sentry {}

export enum SentryCategory {
  REQUEST = 'request',

  SUCCESS = 'success',

  FAILURE = 'failure',

  NAVIGATION = 'navigation',

  CLICK= 'click',

  UI_CLICK = 'ui.click',

  INFO= 'info'
}

export enum SentryType {

  NAVIGATION = 'navigation',

  USER = 'user',

  INFO = 'info',

  HTTP = 'http'
}
