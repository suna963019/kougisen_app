<template>
    <div>
        <h1>ゲーム集</h1>
        <p>いくつかのゲームをプレイしそれぞれのランキングに乗せられます。</p>
        <div>
            <div>
                <router-link to="/tetris" class="normal">
                    <h2>テトリス</h2>
                </router-link>
            </div>
            <div>
                <router-link to="/slot" class="normal">
                    <h2>スロット</h2>
                </router-link>
            </div>
            <div>
                <router-link to="/typing" class="normal">
                    <h2>タイピング</h2>
                    <p></p>
                </router-link>
            </div>
            <div>
                <router-link to="/blockbreaker" class="normal">
                    <h2>ブロックくずし</h2>
                </router-link>
            </div>
            <div>
                <router-link to="/ranking" class="normal">
                    <h2>ランキング</h2>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>