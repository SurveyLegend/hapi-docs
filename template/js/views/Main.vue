<template>
    <main class="main h-position-relative">
        <div class="main__content h-position-relative">
            <h1 id="introduction">Introduction</h1>
            <p>Welcome to the Kittn API! You can use our API to access Kittn API endpoints, which can get information on various cats, kittens, and breeds in our database.</p>
            <p>We have language bindings in Shell, Ruby, Python and JavaScript! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.</p>
            <p>This example API documentation page was created with <a href="https://github.com/SurveyLegend/hapi-slate">Hapi Slate</a>. Feel free to edit it and use it as a base for your own API's documentation.</p>

            <h1 id="authentication">Authentication</h1>

            <blockquote>
                <p>To authorize, use this code:</p>
            </blockquote>
            <pre><code>const kittn = require('kittn');<br><br>let api = kittn.authorize('meowmeowmeow');</code></pre>
            <blockquote>
                <p>Make sure to replace <code>meowmeowmeow</code> with your API key.</p>
            </blockquote>

            <p>Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our <a href="http://example.com/developers">developer portal</a>.</p>
            <p>Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:</p>
            <p><code>Authorization: meowmeowmeow</code></p>
            <notice type="info">You must replace <code>meowmeowmeow</code> with your personal API key.</notice>

            <h1 id="kittens">Kittens</h1>
            <h2 id="get-all-kittens">Get All Kittens</h2>

            <pre><code>const kittn = require('kittn');<br><br>let api = kittn.authorize('meowmeowmeow');<br>let kittens = api.kittens.get();</code></pre>
            <blockquote>
                <p>The above command returns JSON structured like this:</p>
            </blockquote>
            <pre><code></code></pre>

            <p>This endpoint retrieves all kittens.</p>
            <h3 id="http-request">HTTP Request</h3>
            <p><code>GET http://example.com/api/kittens</code></p>
            <h3 id="query-parameters">Query Parameters</h3>
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>include_cats</td>
                        <td>false</td>
                        <td>If set to true, the result will also include cats.</td>
                    </tr>
                    <tr>
                        <td>available</td>
                        <td>true</td>
                        <td>If set to false, the result will include kittens that have already been adopted.</td>
                    </tr>
                </tbody>
            </table>
            <notice type="success">Remember — a happy kitten is an authenticated kitten!</notice>
            <h2 id="get-a-specific-kitten">Get a Specific Kitten</h2>

            <pre><code>const kittn = require('kittn');<br><br>let api = kittn.authorize('meowmeowmeow');<br>let max = api.kittens.get(2);</code></pre>
            <blockquote>
                <p>The above command returns JSON structured like this:</p>
            </blockquote>
            <pre><code></code></pre>

            <p>This endpoint retrieves a specific kitten.</p>

            <notice type="error">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</notice>
            <h3 id="http-request-2">HTTP Request</h3>
            <p><code>GET http://example.com/kittens/{id}</code></p>
            <h3 id="url-parameters">URL Parameters</h3>
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>The ID of the kitten to retrieve</td>
                    </tr>
                </tbody>
            </table>
            <h2 id="delete-a-specific-kitten">Delete a Specific Kitten</h2>

            <pre><code>const kittn = require('kittn');<br><br>let api = kittn.authorize('meowmeowmeow');<br>let max = api.kittens.delete(2);</code></pre>
            <blockquote>
                <p>The above command returns JSON structured like this:</p>
            </blockquote>
            <pre><code></code></pre>

            <p>This endpoint deletes a specific kitten.</p>
            <h3 id="http-request-3">HTTP Request</h3>
            <p><code>DELETE http://example.com/kittens/{id}</code></p>
            <h3 id="url-parameters-2">URL Parameters</h3>
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>The ID of the kitten to delete</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <language></language>
    </main>
</template>

<script>
import Language from '@/js/components/Language'

export default {
    components: {
        Language
    }
}
</script>
