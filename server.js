import Hapi from 'hapi'
import Vision from 'vision'
import Inert from 'inert'
import Package from './package'

const server = Hapi.server({
    host: process.env.HOSTNAME || 'localhost',
    address: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 3000
})

const start = async (server) => {
    await server.register([
        {
            plugin: Vision
        },
        {
            plugin: Inert
        }
    ])

    await server.start()
    return server
}

start(server).then(server => {
    console.log(`${Package.name} server listening on ${server.info.uri}`)
}).catch(error => {
    console.error(error)
})
