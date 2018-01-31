<template>
    <section class="sidebar">
        <img class="sidebar__logo" src="@/images/logo.png">
        <div class="sidebar__search h-position-relative">
            <input class="sidebar__search__input" type="text" placeholder="Search">
        </div>
        <ul>
            <li class="sidebar__item"><a class="sidebar__item__link" href="#introduction">Introduction</a></li>
            <li class="sidebar__item"><a class="sidebar__item__link" href="#authentication">Authentication</a></li>
            <li class="sidebar__item is-active">
                <a class="sidebar__item__link" href="#kittens">Kittens</a>
                <ul>
                    <li class="sidebar__item"><a class="sidebar__item__link--sub is-active" href="#get-all-kittens">Get All Kittens</a></li>
                    <li class="sidebar__item"><a class="sidebar__item__link--sub" href="#get-a-specific-kitten">Get a Specific Kitten</a></li>
                    <li class="sidebar__item"><a class="sidebar__item__link--sub" href="#delete-a-specific-kitten">Delete a Specific Kitten</a></li>
                </ul>
            </li>
            <li class="sidebar__item"><a class="sidebar__item__link" href="#errors">Errors</a></li>
        </ul>
        <div class="sidebar__footer">
            <ul>
                <li class="sidebar__item"><a class="sidebar__item__link--footer" href="https://github.com/SurveyLegend/hapi-slate">Documentation Powered by Hapi Slate</a></li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {

}
</script>
