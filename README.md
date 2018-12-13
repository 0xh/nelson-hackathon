# Nelson Boilerplate

In order to assist developers creating a browser based Nelson service a starter project
has been created, named 'Boilerplate'. This project provides a folder structure, sets up required
dependencies, integrates Anchor components and gives a very basic example of how to use those components
in a page.

## Getting started

To use Boilerplate simply clone the git repository:

ssh://git@git.nelson.rn:1022/nelson/boilerplate

Then remove the .git folder (so you dont acceidentally change the template repo)

Ensure that you have Node JS installed (10.x.x LTS recommended) and run:

```
cd boilerplate
npm install
npm run dev
```

Node will start a development server available at http://localhost:3000/

Changes to code are instantly transpiled and sent to the browser.

## Nuxt Framework

The Boilerplate project is a [Nuxt.js](https://nuxtjs.org) application. Nuxt is a framework for
building Vue.js applications, and can be used to create applications rendered on both client and server,
static sites or single page applications (SPA's). Boilerplate has been configured to run in SPA mode. In
addition Nuxt implements a standard folder and file name convention and takes care of the build process,
handling integration with tools such as Sass.

Boilerplate integrates Nuxt with the Anchor component library so all components are registered globally,
so they can be used in pages without having to register them.

Nuxt uses a predefined directory structure to layout code and using this convention allows pages to be
created and automatically available at a url that follows that convention. Please visit the
[Nuxt.js](https://nuxtjs.org) website for documentation that describes the structure.

## GraphQL fragments on unions and interfaces

Boilerplate also includes the [Apollo GraphQL](https://www.apollographql.com) client to allow the integration of the frontend with the GraphQL backend.

By default, Apollo Client doesn’t require any knowledge of the GraphQL schema. However, as your usage of Apollo and GraphQL becomes more sophisticated, you may start using fragments on interfaces or unions.

The boilerplate application contains a build task which obtains the necessary schema knowledge for the Apollo Client cache so unions and interfaces can be accurately matched and results validated before writing them into the store.

To generate the fragment types information run the following:

```
npm run generate-fragmentTypes
```

For more detailed information about using fragments with the Apollo client see here:

https://www.apollographql.com/docs/react/advanced/fragments.html

## Testing

The boilerplate application includes [Jest](https://jestjs.io) for unit testing. Tests can be run one
time using `npm run test` or in watch mode using `npm run test:watch`.

## Linting

The project has been setup to lint files using [Standard JS](https://standardjs.com). Prettier JS has not
been configured at this time. You can run the linter at any time using `npm run lint`.
