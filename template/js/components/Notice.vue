<template>
    <div :class="`notice--${type}`">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'Notice',

    props: {
        type: {
            type: String,
            required: true
        }
    }
}
</script>
