# Table of Contents
1. [Environment Variables](#environment-variables)
2. [Styles](#styles)
3. [Component Structure](#component-structure)
4. [Vuex store modules](#vuex-store-modules)
5. [Http Requests](#http-requests)
6. [Event Manager](#event-manager)
7. [Using SVGs](#using-svgs)
8. [Autoprefixer](#autoprefixer)
9. [Asset management](#asset-management)
    1. [Types of assets](#types-of-assets)
    2. [Referencing assets processed by webpack](#referencing-assets-processed-by-webpack)
    3. [Referencing static assets](#referencing-static-assets)
10. [Previewing a build](#previewing-a-build)
11. [Localization support](#localization-support)
12. [Application startup](#application-startup)
13. [Lint staged](#lint-staged)
14. [Code splitting](#code-splitting)
15. [Runtime public path](#runtime-public-path)

## Environment Variables

In development there needs to be a place to store urls of APIs an variables like the facebook_app_id, etc.
Waffle has support for enums, urls, variables and environments. The latter is very important because most of the config is environment based.

* `src/config/index.js`: Contains the config and the environment logic.
* The environment is set based on the `GET Parameter: env`, for example https://abrecultura.com/?env=1
* `env` values are: 0 for `production`, 1 for `staging`, 2 for `development`

## Styles

Waffle imports widely used css libraries inside `src/App.vue` for easier development:
* [normalize.min.css](https://necolas.github.io/normalize.css/)
* [bootstrap-grid.min.css](https://getbootstrap.com/docs/4.0/layout/grid/)
* [animate.min.css](https://daneden.github.io/animate.css/)

Waffle uses SCSS for styling. There are two main SCSS files:
* ```base.scss``` Application global styling goes here.
* ```_variables.scss``` Application wide available SCSS variables.

## Component Structure

A component consists of one `{Name}.vue` file that contains the template, the styles and the logic

* `<template></template`: Defines the Vue Template.
* `<script></script>`: Defines the Javascript component logic.
* `<style scoped lang="scss"></style>`: Defines the template styling.

## Vuex store modules
The great thing about Vuex is that you can store data inside a vuex module and access it on every Vue component.
It's a best practice to split your data modules in [vuex](https://github.com/vuejs/vuex).

A module has the following properties: 

`state`: The state of the module. Don't use statics for the state because you can nest the 
state. Use `mapState` to get values from the state in your component. 

`getters`: The getters of the module. Only use getters when you want to transform a value from 
the state. Use `mapGetters` to access the getters in your component. Don't create a getter for 
every value in the state. 

`mutations`: The mutations of the module. In a mutation you can change the state. Don't use one 
god mutation (SET) that can change everything in the state. Use `mapMutations` to use your 
mutations in a component.

`actions`: The actions of a module. An action is async in most cases and results in triggering a 
state change when the action is completed. You should use actions to do a gateway calls instead 
of doing the gateway call in the component. Don't use actions to just simply trigger mutations 
use mutations directly instead. Use `mapActions` to use actions in your components. 

Example of setting up a module and using it in a component:

We create the logic for the Vuex Module
`store/module/data/data.js`:
```javascript
export const SET_DATA = 'set-data';

export default {
  namespaced: true,
  state: {
    data: null,
  },
  getters: {},
  mutations: {
    [SET_DATA]: (state, payload) => {
      state.data = payload;
    },
  },
  actions: {},
};
```

We create the index.js, where we export the Vuex logic and we also set the namespace and the Enums for calling the Actions, Mutations and Getters
`store/module/data/index.js`:
```javascript
import meta, { SET_DATA } from './meta';

export const MetaNamespace = 'meta';

export const MetaGetterTypes = {};

export const MetaMutationTypes = {
  SET_DATA: `${MetaNamespace}/${SET_DATA}`,
};

export const MetaActionTypes = {};

export default meta;
```

Don't forget to include the module in the modules.js file
`store/modules.js`:
```javascript
import data from './module/data';

export default {
  data
};
```

`Component`:
```javascript
import { mapState, mapMutations } from 'vuex';
import { DataNamespace, DataMutationTypes } from '../../store/module/data';

export default {
  name: 'HomePage',
  computed: {
    //Here we gain access to the data variable inside the vuex store
    ...mapState(DataNamespace, ['data']),
  },
  methods: {
    //Here we gain access to the mutation method inside the vuex store
    ...mapMutations({
      setData: DataMutationTypes.SET_DATA
    }),
  },
  created(){
    console.log(this.data) // null
    this.setData('Hello World!'); 
    console.log(this.data) // 'Hello World!'
  }
};
```

## Http Requests

Waffle uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for http requests.
Waffle includes `request.js` a library for making fetch requests easier. It is located in the utils folder and it is accessed
through the `index.js` file inside that folder.

`request.js` expands the Fetch API in two ways

* When you make request that ends up in a 400 or 500 response, it throws an exception that you can catch.
* It lets you prepend the API and S3 URL in an elegant way 

Here's an example on how to use it:

```javascript
import { Request } from '../../../utils';

Request.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// By default, the post method has a header of 'Content-Type': 'application/json'
Request.post('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

If you want to change the Headers or the Body of the request you can pass a second parameter:
```javascript
const config = {
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
};

Request.post('https://jsonplaceholder.typicode.com/posts', config)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

If you want to prepend the API or S3 url you can do it this way:
```javascript
// Request.api (get/post) appends the url parameter to the API url defined in the config file 
Request.api.get(`metas/slug/${slug}`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Request.s3 defaults to get. It appends the url parameter to the S3 url defined in the config file 
Request.s3(`${slug}.json`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Event Manager
The event manager consists of two parts: the `subscribing` component that will hear for an specific event 
and the `triggering` component that will call the event.

The first step is importing the event manager for both the subscribing and the triggering components:

```javascript 
  import EventManager from '@/utils'; 
```

Then, you have to subscribe to an event inside the subscribing component, usually in one of the hook methods, 
using the `Subscribe` method.

`Subscribe` takes two parameters, the first one is the event name and the second one is a callback function
that will be called when the event is triggered.

```javascript 
  created(){
    EventManager.Subscribe("OnQuantityUpdate", this.qtyUpdate);
  },
  methods: {
    qtyUpdate(newQty){
      this.qty = newQty[0];
    },
  },
```

Then, you have to trigger an event inside the triggering component using the `Trigger` method.
The trigger method only needs to be called when an event happens. For example, someone clicked a button.

`Trigger` takes one mandatory parameter: the event name that will be triggered. And then 
infinite non-required parameters, being all the data that you want to send to the subscribing method.

**Note: All the parameters (except for the event name) will be transformed to an array.

```javascript 
  methods: {
    addToCart(){
      EventManager.Trigger("OnQuantityUpdate", 12, 'Products');
      // This will arrive as [12, 'Products']
    },
  },
```

## Using SVGs

Webpack automatically parses and optimizes SVGs using [SVGo](https://github.com/rpominov/svgo-loader).

Implementing a icon can be done using the Icon component:

* The SVG file is referenced using the name property of the Icon component. 
* The value of the name property is the SVG filename without the SVG file extension.
* The SVG css class is `svg-icon svg-icon--NAME`
* Icon component also has width and height values you can define

```<Icon name="zoom-in" width="100%" height="50px" />```

## Autoprefixer

Vue CLI 3 includes PostCSS, which includes a plugin to parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](https://caniuse.com/). 
It is recommended by Google and used in Twitter and Alibaba.

## Asset management

Managing and working with assets is important. Waffle comes with a hassle-free solution for managing assets.

#### Types of assets

* Static assets
* Assets that are processed by webpack

Assets that need to be processed by webpack are stored in the ```src/assets``` folder.
Examples of those assets are fonts, images, SVGs and SCSS files. Referencing these files in .vue templates can be done by prepending `@/assets/`.

#### Referencing assets processed by webpack

**.vue template example**
A image is located in ```src/assets/images/example.png``` to reference this image so it can be picked up by webpack use the following syntax
```<img src="@/assets/images/example.png" />```

**.scss example**
A image is located in ```src/asset/image/example.png``` to reference this image so it can be picked up by webpack use the following syntax
```background-image: url(assets/images/example.png);```

#### Referencing static assets
For static assets Vue CLI has the `public` folder

Why use the `public` folder:
* You may need a file with a specific name in the build output.
* You may have thousands of images and need to dynamically reference their paths.
* Some library may be incompatible with Webpack and you have no other option but to include it as a <script/> tag.

When you reference the `public` folder via an absolute path, you need to take into account where your app will be deployed. If your app is not deployed at the root of a domain, you will need to prefix your URLs with the publicPath:

In `public/index.html` or other HTML files used as templates by html-webpack-plugin, you need to prefix the link with <%= BASE_URL %>:
```javascript
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

In `.vue` files, you will need to first pass the base URL to your component:
```javascript
data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
```

And then you can use it inside the template:
```javascript
<img :src="`${publicPath}my-image.png`">
```

## Previewing a build

Due to config differences between development and production it may occur that it runs perfectly fine on development
but not in a production build.
It is good to test builds on a regular basis to avoid issues when deploying to an environment.

The dist directory is meant to be served by an HTTP server (unless you've configured `publicPath` to be a relative value), so it will not work if you open `dist/index.html` directly over `file://` protocol. The easiest way to preview your production build locally is using a Node.js static file server, for example serve:

```bash
yarn global add serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem below
serve -s dist
```

## Localization support

Waffle does not support Localization at the moment.

## Application startup
Add methods to `main.js` that need to be run before Vue initialisation.

Examples of startup tasks:
- Registering/Initialisation of Vue plugins
- Requesting async initialisation data

## Lint staged
Before every commit lint-staged runs to format the staged code with prettier and lints (eslint, tslint, stylelint) it. If lint-staged finds an error the commit will abort. This makes sure that the code in the repository is correctly formatted and lint error free.

You can remove the eslint rule by adding a `vue.config.js` file to your project with the following content.

```javascript
module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}
```

**Note: Only disable linting for a valid reason.**

## Code splitting

It is also possible to use code splitting in Waffle. 
This can improve load times if an app consists of a lot of pages for example. 

Splitting happens in `src/router.js` where all the routes are defined.
In a normal situation without code splitting all pages are imported at the top of the file.
Instead of importing, a page needs to be imported using import().

```javascript
{
  path: '/product/:id',
  name: 'DefaultProductPage',
  component: () => import(/* webpackChunkName: "DefaultProductPage" */ './views/ProductPage.vue'),
},
```

The route definition where the page component is used stays exactly the same. 

It's also possible to group multiple pages in a seperate bundle by giving them the same chunk name.
In the example above the chunkname is set to `DefaultProductPage`.

[More info](https://webpack.js.org/guides/code-splitting-async/#dynamic-import-import-)

## Runtime public path

It's possible to set the public path during runtime. This is handy if a build needs to run on multiple servers with different public paths.

The public path needs to be set in the index.html before the other js files are loaded. 

```
var webpackPublicPath = '/v/waffle';
```  
**Note: If the public path is updated in the index.html the paths to the css and js also needs to be prepended with the same public path.**