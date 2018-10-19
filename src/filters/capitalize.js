export default function capitalize(input) {
    const string = input.toString()

    return string.charAt(0).toUpperCase() + string.slice(1)
}
