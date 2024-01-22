<template>
    <div class="content_box">
        <h2>{{ time }}秒経過</h2>
        <br>
        <div class="d-flex text">
            <pre class="message1">{{ message1 }}</pre>
            <pre class="now">{{ now }}</pre>
            <pre class="message2">{{ message2 }}</pre>
        </div>
        <div class="full_scale" v-if="!this.startCheck">
            <div class="set_name">
                <h2 class="text-center"></h2>
                <h3 class="comment">制限時間なし</h3>
                <h3 class="comment">操作説明</h3>
                <p class="comment">　半角英字の文、又は文字が出てくるので同じものをキーボードで打ってください。<br>
                    　早い程スコアが上がります。頑張ってください。
                </p>
                <v-form @submit.prevent>
                    <v-text-field v-model="name" label="お名前(ニックネーム)" required></v-text-field>
                    <v-btn type="submit" block @click="start_game()">開始</v-btn>
                </v-form>
            </div>
        </div>
        <div class="full_scale" v-if="endCheck">
            <div class="result">
                <table>
                    <tr>
                        <th>順位</th>
                        <td>:</td>
                        <td>{{ parseInt(number) + 1 }}位</td>
                    </tr>
                    <tr>
                        <th>名前</th>
                        <td>:</td>
                        <td>{{ name }}</td>
                    </tr>
                    <tr>
                        <th>点数</th>
                        <td>:</td>
                        <td>{{ score }}点</td>
                    </tr>
                </table>
                <v-btn @click="reset">再挑戦</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Type',
    data: function () {
        return {
            default: [
                'spiral staircase',
                'beetle',
                'The City of Ruins',
                'Fig Tart',
                'beetle',
                'The Road to Drorosa',
                'beetle',
                'singularity',
                'Jott',
                'Angel',
                'hydrangea',
                'beetle',
                'singularity',
                'a secret emperor'],
            count: 0,
            char_count: 1,
            message1: '',
            now: '',
            message2: 'Face the fear, Build the future',
            name: '',
            score: 0,
            time: 0,
            number: Number,
            startCheck: false,
            endCheck: false,
            interval: Number,
        }
    },
    mounted() {
        window.addEventListener('keypress', this.type)
        this.message1 += this.now
        this.now = String(this.message2).charAt(0)
        this.message2 = String(this.message2).slice(1)
        this.reset()
    },
    methods: {
        start_game() {
            this.startCheck = true
            this.interval = setInterval(this.timer, 1000)
            if (this.name == '') {
                this.name = '名無し'
            }
        },
        timer() {
            this.time++
        },
        type(event) {
            if (!this.startCheck || this.endCheck) {
                return
            }
            if (this.now == event.key) {
                this.set_next_char()
            }
            if (this.count == 14) {
                this.addData()
                return
            }
            if (this.message2 == '' && this.now === '') {
                this.set_next_string()
            }

        },
        set_next_char() {
            let str = String(this.message2)
            this.message1 += this.now
            this.now = str.charAt(0)
            this.message2 = str.slice(1)
        },
        set_next_string() {
            this.message1 = ''
            this.now = this.default[this.count].charAt(0)
            this.message2 = this.default[this.count].slice(1)
            this.count++
        },
        reset() {
            this.count = 0
            this.message1 = ''
            this.now = ''
            this.message2 = this.default[0]
            this.set_next_char()
        },
        async addData() {
            clearInterval(this.interval)
            this.score=(300-this.time)*10
            this.endCheck = true
            const data = {
                name: this.name,
                point: this.score
            }
            const param = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
            const response = await fetch('http://127.0.0.1:8000/api/typing/add', param)
            const result = await response.json()
            this.number = result[0]
        },
    }
}
</script>

<style scoped>
.message1 {
    color: rgb(182, 182, 182);
}

.content_box {
    position: relative;
    width: 600px;
    margin: 30px auto;
}

.text {
    text-align: justify;
    position: relative;
    padding: 3px;
    border-bottom: 1px solid black;
    letter-spacing: 1px;
}

.message1 {
    margin-right: -2px;
}

.message2 {
    margin-left: -2px;
    padding-left: 1px;
    background-color: white;
}

.now {
    padding-left: 2px;
    padding-right: 1px;
    background-color: rgb(196, 196, 196);
}
</style>
<style src="@/styles/form.css"></style>