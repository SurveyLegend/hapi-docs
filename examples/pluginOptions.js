export default {
    sortTags: 'ordered',
    sortEndpoints: 'ordered',
    info: {
        descriptions: [
            'The API is organized around [REST](https://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website’s client-side code). [JSON](https://www.json.org) is returned by all API responses, including errors.'
        ]
    },
    security: {
        descriptions: [
            'Authenticate your account by including your secret key in API requests. You can manage your API keys in the [Dashboard](). Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.',
            'Authentication to the API is performed via [HTTP Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication). Provide your API key as the basic auth username value. You do not need to provide a password.',
            'All API requests must be made over [HTTPS](https://en.wikipedia.org/wiki/HTTPS). Calls made over plain HTTP will fail. API requests without authentication will also fail.'
        ]
    },
    errors: {
        descriptions: [
            'The API uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the `5xx` range indicate an error with servers (these are rare).'
        ],
        codes: [
            {
                status: '200 - OK',
                description: 'Everything worked as expected.'
            },
            {
                status: '400 - Bad Request',
                description:
                    'The request was unacceptable, often due to missing a required parameter.'
            },
            {
                status: '401 - Unauthorized',
                description: 'No valid API key provided.'
            },
            {
                status: '402 - Request Failed',
                description: 'The parameters were valid but the request failed.'
            },
            {
                status: '404 - Not Found',
                description: 'The requested resource doesn’t exist.'
            },
            {
                status: '409 - Conflict',
                description:
                    'The request conflicts with another request (perhaps due to using the same idempotent key).'
            },
            {
                status: '429 - Too Many Requests',
                description:
                    'Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.'
            },
            {
                status: '500, 502, 503, 504 - Server Errors',
                description: 'Something went wrong on our end. (These are rare.)'
            }
        ]
    },
    tags: [
        {
            name: 'customers',
            descriptions: [
                '`Customer` objects allow you to perform recurring charges, and to track multiple charges, that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as a list of all your customers.'
            ],
            order: 1
        },
        {
            name: 'refunds',
            descriptions: [
                '`Refund` objects allow you to refund a charge that has previously been created but not yet refunded. Funds will be refunded to the credit or debit card that was originally charged.'
            ],
            order: 2
        },
        {
            name: 'recipients',
            descriptions: [
                'With `Recipient` objects, you can transfer money from your account to a third-party bank account or debit card. The API allows you to create, delete, and update your recipients. You can retrieve individual recipients as well as a list of all your recipients.'
            ],
            order: 3,
            deprecated: true
        }
    ]
}
