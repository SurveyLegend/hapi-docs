![](https://user-images.githubusercontent.com/1430576/47225479-7a114800-d3be-11e8-9614-2df9dd2a997a.png)

[![npm downloads](https://img.shields.io/npm/dm/@surveylegend/hapi-docs.svg?style=flat-square)](https://www.npmjs.com/package/@surveylegend/hapi-docs)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.github.com/glennjones/microformat-shic/master/license.txt)

-   [Installation](#installation)
-   [Usage](#usage)
-   [Demo](#demo)
-   [Documentation](#documentation)
    -   [Plugin Options](#plugin-options)
    -   [Route Options](#route-options)
    -   [Tagging API Routes](#tagging-api-routes)

## Installation

This package can be used in hapi v17 or higher.

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
import Package from './package'

const options = {
    info: {
        title: 'Test API Reference',
        version: Package.version
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
-   `host`: (string) The hostname or IP serving the API, i.e. `localhost:3000`
-   `scheme`: (string) The transfer protocol of the API, i.e. `http`, `https`
-   `pathPrefixSize`: (number) The segment of the URL path that is used to group endpoints - default: `1`
-   `sortTags`: (string) The sort method for groups, i.e. `name`, `ordered` - default: `name`
-   `sortEndpoints`: (string) The sort method for endpoints, i.e. `path`, `method`, `ordered` - default: `path`
-   `info`
    -   `title`: (string) The title of the documentation - default: `API Reference`
    -   `version`: (string) The version number of the API - default: `0.0.1`
    -   `description`: (string) The description of the API.
-   `tags`
    -   `name`: (string) The name of the group.
    -   `description`: (string) The description of the group.
    -   `order`: (int) The order which groups are sorted by.
    -   `deprecated`: (boolean) Whether a group is deprecated - default: `false`
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

This package is inspired by [hapi-swagger](https://github.com/glennjones/hapi-swagger) and [lout](https://github.com/hapijs/lout).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
