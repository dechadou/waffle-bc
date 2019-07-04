/* global $env */
/* eslint-disable no-console */
import { EnvironmentNames, PropertyNames, URLNames, VariableNames } from '../data/enum/configNames';

const config = {
  environments: {
    [EnvironmentNames.PRODUCTION]: {
      variables: {},
      urls: {
        [URLNames.API]: 'https://mate.abrecultura.com/api/',
      },
    },
    [EnvironmentNames.STAGING]: {
      extends: EnvironmentNames.PRODUCTION,
      variables: {},
      urls: {
        [URLNames.API]: 'https://staging.abrecultura.com/api/',
      },
    },
    [EnvironmentNames.DEVELOPMENT]: {
      extends: EnvironmentNames.STAGING,
      variables: {},
      urls: {
        [URLNames.API]: 'https://dev.abrecultura.com/api/',
      },
    },
    [EnvironmentNames.LOCAL]: {
      extends: EnvironmentNames.DEVELOPMENT,
      variables: {},
      urls: {
        [URLNames.API]: 'https://mate.abrecultura.com/api/',
      },
    },
  },
  variables: {
    [VariableNames.LOCALE_ENABLED]: false,
    [VariableNames.LOCALE_ROUTING_ENABLED]: false,
    [VariableNames.VERSIONED_STATIC_ROOT]:
      (window.webpackPublicPath || process.env.PUBLIC_PATH) + process.env.VERSIONED_STATIC_ROOT,
    [VariableNames.STATIC_ROOT]:
      (window.webpackPublicPath || process.env.PUBLIC_PATH) + process.env.STATIC_ROOT,
    [VariableNames.PUBLIC_PATH]: window.webpackPublicPath || process.env.PUBLIC_PATH,
  },
  urls: {
    [URLNames.LOCALE]: `{${VariableNames.VERSIONED_STATIC_ROOT}}locale/{locale}.json`,
    [URLNames.API]: `${process.env.PUBLIC_PATH}api/`,
  },
  properties: {
    [PropertyNames.DEFAULT_LOCALE]: 'en-gb',
    [PropertyNames.AVAILABLE_LOCALES]: ['en-gb'],
    [PropertyNames.WHITELISTED_QUERY_PARAMS]: [],
    [PropertyNames.PERSIST_QUERY_PARAMS]: [],
  },
};

let environment = EnvironmentNames.PRODUCTION;
const { host } = document.location;

if (host.split(':').shift() === 'localhost') environment = EnvironmentNames.LOCAL;
else {
  switch ($env) {
    case 1:
      environment = EnvironmentNames.STAGING;
      console.warn('WARNING: Staging Env');
      break;

    case 2:
      environment = EnvironmentNames.DEVELOPMENT;
      console.warn('WARNING: Development Env');
      break;

    default:
      environment = EnvironmentNames.PRODUCTION;
      break;
  }
}

export default {
  config,
  environment,
};
