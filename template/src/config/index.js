import URLParams from '../utils/urlparams';

export const EnvironmentNames = {
  DEVELOPMENT: 2,
  STAGING: 1,
  PRODUCTION: 0,
};

export const VariableNames = {
  EnvPassword: 'env-password-variable',
  DefaultSlug: 'default-slug-variable',
  WaffleVersion: 'waffle-version-variable',
};

export const EnumNames = {
  EventNames: 'event-names-enum',
  URLParams: 'url-params-enum',
};

export const URLNames = {
  API: 'api-url',
  S3: 's3-url',
  CHECKOUT: 'checkout-url',
};

const config = {
  environments: {
    [EnvironmentNames.PRODUCTION]: {
      variables: {},
      enums: {},
      urls: {
        [URLNames.API]: 'https://mate.abrecultura.com/api/',
        [URLNames.S3]: 'https://abrecultura.s3.amazonaws.com/storage/prod/',
        [URLNames.CHECKOUT]: 'https://www.abrecultura.com/checkout/',
      },
    },
    [EnvironmentNames.STAGING]: {
      variables: {
        [VariableNames.EnvPassword]: 'waffle',
      },
      enums: {},
      urls: {
        [URLNames.API]: 'https://staging.abrecultura.com/api/',
        [URLNames.S3]: 'https://abrecultura-dev.s3.amazonaws.com/storage/staging/',
        [URLNames.CHECKOUT]: 'https://www.abrecultura.com/checkout-staging/',
      },
      name: 'Staging',
    },
    [EnvironmentNames.DEVELOPMENT]: {
      variables: {
        [VariableNames.EnvPassword]: 'waffle',
      },
      enums: {},
      urls: {
        [URLNames.API]: 'https://dev.abrecultura.com/api/',
        [URLNames.S3]: 'https://abrecultura-dev.s3.amazonaws.com/storage/dev/',
        [URLNames.CHECKOUT]: 'https://www.abrecultura.com/checkout-dev/',
      },
      name: 'Development',
    },
  },
  variables: {
    [VariableNames.WaffleVersion]: 1,
    [VariableNames.DefaultSlug]: 'samurai-de-ensaladas',
  },
  enums: {
    [EnumNames.EventNames]: {
      ADD_TO_CART: 'add-to-cart',
      ON_CART_TOGGLE: 'on-cart-toggle',
      ON_CART_ITEM_QUANTITY_CHANGE: 'on-cart-item-quantity-change',
      ON_RELATED_PRODUCTS_TOGGLE: 'on-related-products-toggle',
      ON_FEEDBACK_ACTIVE: 'on-feedback-active',
    },
    [EnumNames.URLParams]: {
      ENV: 'env',
    },
  },
  urls: {},
};

const currentEnv = config.environments[+URLParams(config.enums[EnumNames.URLParams].ENV)];

if (currentEnv.name) console.warn(`%c[Waffle Warn]: ${currentEnv.name} environment!`, 'background: #222; color: #bada55');

export const getUrl = URLName => currentEnv.urls[URLName]
  || config.urls[URLName];

export const getVariable = VariableName => currentEnv.variables[VariableName]
  || config.variables[VariableName];

export const getEnum = EnumName => currentEnv.enums[EnumName]
  || config.enums[EnumName];
