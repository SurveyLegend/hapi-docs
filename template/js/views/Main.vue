<template>
    <main class="main h-position-relative">
        <div class="main__content h-position-relative">
            <h1 id="introduction">Introduction</h1>
            <p>Welcome to the Kittn API! You can use our API to access Kittn API endpoints, which can get information on various cats, kittens, and breeds in our database.</p>

            <p>We have language bindings in Shell, Ruby, and Python! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.</p>

            <p>This example API documentation page was created with <a class="h-text-underline" href="https://github.com/lord/slate">Slate</a>. Feel free to edit it and use it as a base for your own API's documentation.</p>
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
