// Credit to Lout for inpsiration, check it out at https://github.com/hapijs/lout
import Path from 'path'
import Package from '../package'

const plugin = {
    register(server, options) {
        server.dependency('inert', async function (server) {
            server.route({
                method: 'GET',
                path: '/js/{filepath*}',
                handler: {
                    directory: {
                        path: Path.join(process.cwd(), './public/js'),
                        listing: false,
                        index: false
                    }
                },
                options: {
                    auth: false,
                    cache: {
                        expiresIn: 24 * 60 * 60 * 1000,
                        privacy: 'public'
                    }
                }
            })

            server.route({
                method: 'GET',
                path: '/{path*}',
                handler: {
                    file: './public/index.html'
                }
            })
        })
    },
    multiple: true,
    pkg: {
        name: Package.name,
        version: Package.version
    }
}

export default plugin
