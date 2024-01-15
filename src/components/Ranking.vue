<template>
    <h2>テトリススコアランキング</h2>
    <table>
        <tr>
            <th>順位</th>
            <th>名前</th>
            <th>得点</th>
        </tr>
        <tr v-for="(data, index) in tetris_table">
            <td>{{ parseInt(index) + 1 }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.point }}</td>
        </tr>
    </table>
    <h2>スロットスコアランキング</h2>
    <table>
        <tr>
            <th>順位</th>
            <th>名前</th>
            <th>得点</th>
        </tr>
        <tr v-for="(data, index) in slot_table">
            <td>{{ parseInt(index) + 1 }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.point }}</td>
        </tr>
    </table>
</template>
<script>
export default {
    data() {
        return {
            tetris_table: Object,
            slot_table: Object,
        }
    },
    mounted() {
        this.get_tetris()
        this.get_slot()
    },
    methods: {
        async get_tetris() {
            const url = 'http://127.0.0.1:8000/api/tetris/index';
            // 指定したURLからデータを取得
            const response = await fetch(url);
            // データをJavaScriptのオブジェクトに変換
            const data = await response.json();
            this.tetris_table = data;
        },
        async get_slot() {
            const url = 'http://127.0.0.1:8000/api/slot/index';
            // 指定したURLからデータを取得
            const response = await fetch(url);
            // データをJavaScriptのオブジェクトに変換
            const data = await response.json();
            this.slot_table = data;
        },
    }

}
</script>
<style scoped>
h2{
    margin: 40px;
    text-align: center;
}
table {
    margin: 0 auto ;
    width: 600px;
    font-size: 30px;
}

table,
th,
td {
    border: 1px solid black;
}

td {
    text-align: center;
}
</style>