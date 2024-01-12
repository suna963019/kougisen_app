<template>
    <table>
        <tr>
            <th>順位</th>
            <th>名前</th>
            <th>得点</th>
        </tr>
        <tr v-for="(data, index) in table">
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
            table: Object
        }
    },
    async mounted() {
        const url = 'http://127.0.0.1:8000/api/ranking/index';
        // 指定したURLからデータを取得
        const response = await fetch(url);
        // データをJavaScriptのオブジェクトに変換
        const data = await response.json();
        this.table = data;
    }
}
</script>
<style scoped>
table {
    margin:100px auto 0;
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
}</style>