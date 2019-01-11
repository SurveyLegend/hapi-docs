![](https://user-images.githubusercontent.com/35954987/51039371-7522f580-15b5-11e9-8a73-1951f5eebc98.png)

[![npm downloads](https://img.shields.io/npm/dm/@surveylegend/hapi-docs.svg?style=flat-square)](https://www.npmjs.com/package/@surveylegend/hapi-docs)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.github.com/glennjones/microformat-shic/master/license.txt)

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Demo](#demo)
-   [Documentation](#documentation)
    -   [Plugin Options](#plugin-options)
    -   [Route Options](#route-options)
    -   [Tagging API Routes](#tagging-api-routes)

## Features

-   **Intuitive design** — Inspired by [Stripe’s](https://stripe.com/docs/api) API docs. The description of your API resides on the left part of the documentation, while all of the code examples reside on the right. It’s fully responsive and works great on tablets and phones.

-   **Single page** — Everything resides on a single page, the whole documentation. Without sacrificing linkability. As you scroll through the documentation, your browser’s hash will update to the nearest section, which means linking to a particular point in the documentation remains natural and easy.

-   **Scroll spy** — While scrolling through the documentation, the far left navigation will display your current position in the documentation. It's swift and remains excellent even for larger documents.

-   **Dark theme** — Seamless switching between light and dark theme using a toggle. Supports `prefers-color-scheme` media query for automatic switching.

-   **Markdown support** — Use Markdown to describe your API. Markdown makes it easy to articulate your documentation.

-   **Code examples in multiple languages** — Configurable support for multiple languages. Easily choose which language to currently display in your documentation by switching between tabs.

-   **Syntax highlighting** — Supports [over 100 languages](https://prismjs.com/#languages-list) out of the box.

-   **RTL Support** — Full Right-to-Left support for languages such as Arabic, Persian (Farsi), Hebrew, etc.

## Installation

> This package can be used in hapi v17 or higher.

You can install the package via yarn:

```bash
$ yarn add @surveylegend/hapi-docs
```

## Usage

```javascript
import Hapi from 'hapi'
import Inert from 'inert'
import Joi from 'joi'
import HapiDocs from '@surveylegend/hapi-docs'
import { version } from './package'

const options = {
    info: {
        title: 'Test API Reference',
        version
    }
}

const startServer = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000
    })

    await server.register([
        {
            plugin: Inert
        },
        {
            plugin: HapiDocs,
            options
        }
    ])

    await server.start()

    console.log(`Server listening on ${server.info.uri}`)
}

startServer().catch(console.error)
```

## Demo

You can see a live demo version of `hapi-docs`. Check it out at [hapi-docs](https://hapi-docs.herokuapp.com/)

## Documentation

### Plugin Options

-   `endpoint`: (string) The path of the documentation - default: `/docs`
-   `basePath`: (string) The base path before the API, i.e. `/v2` - default: `/`
-   `templatePath`: (string) The absolute path to the template folder, i.e. `/template`
-   `host`: (string) The hostname or IP serving the API, i.e. `localhost:3000`
-   `scheme`: (string) The transfer protocol of the API, i.e. `http`, `https`
-   `pathPrefixSize`: (number) The segment of the URL path that is used to group endpoints - default: `1`
-   `sortTags`: (string) The sort method for groups, i.e. `name`, `ordered` - default: `name`
-   `sortEndpoints`: (string) The sort method for endpoints, i.e. `path`, `method`, `ordered` - default: `path`
-   `info`
    -   `title`: (string) The title of the documentation - default: `API Reference`
    -   `version`: (string) The version number of the API - default: `0.0.1`
    -   `descriptions`: (array) The description of the API.
-   `tags`: (array) Contains tag objects
    -   `name`: (string) The name of the group.
    -   `descriptions`: (array) The description of the group.
    -   `order`: (int) The order which groups are sorted by.
    -   `deprecated`: (boolean) Whether a group is deprecated - default: `false`
-   `errors`:
    -   `descriptions`: (array) The description of the errors.
    -   `codes`: (array) Contains error code objects
        -   `status`: (string) The status of the error code, i.e. `418 - I'm A Teapot`
        -   `description`: (string) The description of the error code.
-   `auth`: (boolean, string or object) The security strategy used for plugin resources - default: `false`

### Route Options

-   `order`: (int) The order which endpoints are sorted by.
-   `deprecated`: (boolean) Whether an endpoint is deprecated - default: `false`

### Tagging API Routes

If you want a route to appear in the documentation, you have to set `tags: [api]` for this specific route.

Here is an example snippet of a route option:

```javascript
{
  method: 'GET',
  path: '/route',
  options: {
    handler: [...],
    [...]
    tags: ['api']
  }
}
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security-related issues, please email [henrik@surveylegend.com](mailto:henrik@surveylegend.com) instead of using the issue tracker.

## Credits

-   [Henrik Ruscon](https://github.com/henrikdahl)
-   [Robert Michalski](https://github.com/robman87)
-   [Kiarokh Moattar](https://github.com/Kiarokh)

This package is inspired by [hapi-swagger](https://github.com/glennjones/hapi-swagger) and [lout](https://github.com/hapijs/lout).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
