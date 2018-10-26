import Hapi from 'hapi'
import Inert from 'inert'
import Joi from 'joi'
import { name, version } from '../package'
import plugin from '../'

const options = {
    sortTags: 'ordered',
    sortEndpoints: 'ordered',
    info: {
        description:
            'The hapi-docs API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website’s client-side code). [JSON](http://www.json.org) is returned by all API responses, including errors.'
    },
    tags: [
        {
            name: 'customers',
            description:
                '`Customer` objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.',
            order: 1
        },
        {
            name: 'refunds',
            description:
                '`Refund` objects allow you to refund a charge that has previously been created but not yet refunded. Funds will be refunded to the credit or debit card that was originally charged.',
            order: 2
        },
        {
            name: 'recipients',
            description:
                'With `Recipient` objects, you can transfer money from your Stripe account to a third-party bank account or debit card. The API allows you to create, delete, and update your recipients. You can retrieve individual recipients as well as a list of all your recipients.',
            order: 3,
            deprecated: true
        }
    ]
}

const startServer = async () => {
    const server = Hapi.server({
        host: process.env.HOSTNAME || 'localhost',
        address: process.env.IP || '0.0.0.0',
        port: Number(process.env.PORT || 3000)
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

    server.route({
        method: 'GET',
        path: '/',
        handler(request, h) {
            return h.redirect('/docs')
        }
    })

    server.route([
        {
            method: 'POST',
            path: '/customers',
            handler(request) {
                return ''
            },
            options: {
                description: 'Create a customer',
                notes: 'Creates a new customer object.',
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
            path: '/customers/{id}',
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
            path: '/customers/{id}',
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
                        id: Joi.string().required()
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
            path: '/customers/{id}',
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
            path: '/customers',
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
            path: '/refunds',
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
            path: '/refunds/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Retrieve a refund',
                notes: 'Retrieves the details of an existing refund.',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string()
                            .required()
                            .description('The identifier of the refund to be retrieved.')
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
            path: '/refunds/{id}',
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
                validate: {
                    params: {
                        id: Joi.string().required()
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
            method: 'GET',
            path: '/refunds',
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
        },
        {
            method: 'POST',
            path: '/recipients',
            handler(request) {
                return ''
            },
            options: {
                description: 'Create a recipient',
                notes: [
                    'Creates a new `Recipient`. object and verifies the recipient’s identity. Also verifies the recipient’s bank account information or debit card, if either is provided.'
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
            path: '/recipients/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Retrieve a recipient',
                notes:
                    'Retrieves the details of an existing recipient. You need only supply the unique recipient identifier that was returned upon recipient creation.',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string()
                            .required()
                            .description('The identifier of the recipient to be retrieved.')
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
            path: '/recipients/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Update a recipient',
                notes: [
                    'Updates the specified recipient by setting the values of the parameters passed. Any parameters not provided will be left unchanged.',
                    'If you update the name or tax ID, the identity verification will automatically be rerun. If you update the bank account, the bank account validation will automatically be rerun.'
                ],
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string().required()
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
            path: '/recipients/{id}',
            handler(request) {
                return ''
            },
            options: {
                description: 'Delete a recipient',
                notes: 'Permanently deletes a recipient. It cannot be undone.',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.string()
                            .required()
                            .description('The identifier of the recipient to be deleted.')
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
            path: '/recipients',
            handler(request) {
                return ''
            },
            options: {
                description: 'List all recipients',
                notes:
                    'Returns a list of your recipients. The recipients are returned sorted by creation date, with the most recently created recipients appearing first.',
                tags: ['api'],
                plugins: {
                    'hapi-docs': {
                        order: 5
                    }
                }
            }
        }
    ])

    await server.start()

    console.log(`${name} (v.${version}) server listening on ${server.info.uri}`)
}

startServer().catch(console.error)
