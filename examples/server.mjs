import Hapi from 'hapi'
import Inert from 'inert'
import Joi from 'joi'
import Package from '../package'
import plugin from '../lib'

const options = {
    basePath: '/v1',
    pathPrefixSize: 2,
    sortEndpoints: 'ordered',
    info: {
        description:
            'The hapi-docs API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website’s client-side code). [JSON](http://www.json.org) is returned by all API responses, including errors.'
    },
    tags: [
        {
            name: 'customers',
            description:
                '`Customer` objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.'
        },
        {
            name: 'refunds',
            description:
                '`Refund` objects allow you to refund a charge that has previously been created but not yet refunded. Funds will be refunded to the credit or debit card that was originally charged.'
        }
    ]
}

const startServer = async () => {
    const server = Hapi.server({
        host: process.env.HOSTNAME || 'localhost',
        address: process.env.IP || '0.0.0.0',
        port: Number(process.env.PORT || 3000),
        debug: {
            request: ['error']
        }
    })

    await server.register([
        {
            plugin: Inert
        },
        {
            plugin,
            options
        }
    ])

    server.route([
        {
            method: 'POST',
            path: '/v1/customers',
            handler(request) {
                return ''
            },
            options: {
                description: 'Create a customer',
                notes: 'Creates a new customer object.',
                tags: ['api'],
                validate: {
                    payload: {
                        email: Joi.string().description(
                            'Customer’s email address. It’s displayed alongside the customer in your dashboard and can be useful for searching and tracking. This may be up to *512 characters*. This will be unset if you POST an empty value.'
                        )
                    }
                },
                plugins: {
                    'hapi-docs': {
                        order: 1
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/v1/customers/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Retrieve a customer',
                notes:
                    'Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string()
                            .required()
                            .description('The identifier of the customer to be retrieved.')
                    }
                },
                plugins: {
                    'hapi-docs': {
                        order: 2
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/v1/customers/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Update a customer',
                notes: [
                    'Updates the specified customer by setting the values of the parameters passed. Any parameters not provided will be left unchanged. For example, if you pass the **source** parameter, that becomes the customer’s active source (e.g., a card) to be used for all charges in the future. When you update a customer to a new valid source: for each of the customer’s current subscriptions, if the subscription bills automatically and is in the `past_due` state, then the latest unpaid, unclosed invoice for the subscription will be retried (note that this retry will not count as an automatic retry, and will not affect the next regularly scheduled payment for the invoice). (Note also that no invoices pertaining to subscriptions in the `unpaid` state, or invoices pertaining to canceled subscriptions, will be retried as a result of updating the customer’s source.)',
                    'This request accepts mostly the same arguments as the customer creation call.'
                ],
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string().required(),
                        email: Joi.string().description(
                            'Customer’s email address. It’s displayed alongside the customer in your dashboard and can be useful for searching and tracking. This may be up to *512 characters*. This will be unset if you POST an empty value.'
                        )
                    }
                },
                plugins: {
                    'hapi-docs': {
                        order: 3
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/v1/customers/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Delete a customer',
                notes:
                    'Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string()
                            .required()
                            .description('The identifier of the customer to be deleted.')
                    }
                },
                plugins: {
                    'hapi-docs': {
                        order: 4
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/v1/customers',
            handler(request) {
                return ''
            },
            options: {
                description: 'List all customers',
                notes:
                    'Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.',
                tags: ['api'],
                plugins: {
                    'hapi-docs': {
                        order: 5
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/v1/refunds',
            handler(request) {
                return ''
            },
            options: {
                description: 'Create a refund',
                notes: [
                    'When you create a new refund, you must specify a charge to create it on.',
                    'Creating a new refund will refund a charge that has previously been created but not yet refunded. Funds will be refunded to the credit or debit card that was originally charged.',
                    'You can optionally refund only part of a charge. You can do so as many times as you wish until the entire charge has been refunded.',
                    'Once entirely refunded, a charge can’t be refunded again. This method will return an error when called on an already-refunded charge, or when trying to refund more money than is left on a charge.'
                ],
                tags: ['api'],
                plugins: {
                    'hapi-docs': {
                        order: 1
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/v1/refunds/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Retrieve a refund',
                notes: 'Retrieves the details of an existing refund.',
                tags: ['api'],
                plugins: {
                    'hapi-docs': {
                        order: 2
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/v1/refunds/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Update a refund',
                notes: [
                    'Updates the specified refund by setting the values of the parameters passed. Any parameters not provided will be left unchanged.',
                    'This request only accepts `metadata` as an argument.'
                ],
                tags: ['api'],
                plugins: {
                    'hapi-docs': {
                        order: 3
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/v1/refunds',
            handler(request) {
                return ''
            },
            options: {
                description: 'List all refunds',
                notes:
                    'Returns a list of all refunds you’ve previously created. The refunds are returned in sorted order, with the most recent refunds appearing first. For convenience, the 10 most recent refunds are always available by default on the charge object.',
                tags: ['api'],
                plugins: {
                    'hapi-docs': {
                        order: 4
                    }
                }
            }
        }
    ])

    await server.start()

    console.log(`${Package.name} (v.${Package.version}) server listening on ${server.info.uri}`)
}

startServer().catch(console.error)
