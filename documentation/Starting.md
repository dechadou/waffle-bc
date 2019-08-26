## Prerequisite
- [Node 8.9.x](https://nodejs.org/en/download/) or higher
- [NPM 3.x.x](https://nodejs.org/en/download/) or higher
- [Yarn 0.2x.x](https://yarnpkg.com/en/docs/install) or higher
- [Vue CLI 3.x.x](https://cli.vuejs.org/guide/installation.html)

## Installation
```git clone https://javigold@bitbucket.org/javigold/waffle.git```

After cloning run ```yarn``` in the project root to get started.

## Naming conventions

* Every component name is formatted in PascalCase
* Every page name is appended with Page
* Always use the PascalCase formatting for components in templates ```<ScrollBar/>```

## Vue Cli Commands

* ```yarn run serve```: Starts the development server
* ```yarn run build```: Creates a build.
* ```yarn run lint```: Lints and fixes files

## Extending Internal Components

NEVER edit the components located inside the internal folder because they will be overriden if you ever need to
update waffle. Instead:

* Copy the component
* Paste it inside the components folder
* Go to the extendables folder and open BaseComponents or the corresponding file
* Change the route of the internal component to yours. For example: ```export { default as Cart } from '@/components/Cart.vue';```