<template>
    <div class="content">
        <h2 class="text-center">score:{{ score }}point</h2>
        <div class="game_box">
            <Block v-bind:color="block" v-for="block in blocks" />
            <Ball v-bind:ball="ball" />
            <Raket v-bind:block="raket[0]" />
        </div>

        <div v-if="startCheck" class="full_scale">
            <div class="set_name">
                <h2 class="text-center">ブロックくずし</h2>
                <h3 class="comment">制限時間なし</h3>
                <h3 class="comment">操作説明</h3>
                <table class="comment">
                    <tr>
                        <th>←/→</th>
                        <td>:</td>
                        <td>左/右移動</td>
                    </tr>
                    <tr>
                        <th>※注意</th>
                        <td>:</td>
                        <td>当てる位置によって跳ね返る角度が変わります。</td>
                    </tr>
                </table>
                <v-form @submit.prevent>
                    <v-text-field v-model="name" label="お名前(ニックネーム)" required></v-text-field>
                    <v-btn type="submit" block @click="start"  class="start_button">開始</v-btn>
                </v-form>
            </div>
        </div>
        <div v-if="endCheck" class="d-flex justify-center full_scale">
            <div class="restart">
                <p>スコア：{{ score }}</p>
                <p>順位：{{ parseInt(number) + 1 }}</p>
                <v-btn @click="start" class="start_button">再挑戦</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import Ball from './Ball.vue';
import Block from './Block.vue';
import Raket from './Raket.vue';

export default {
    components: { Ball, Block, Raket },
    data() {
        return {
            blocks: [],
            ball: [0, 0, 320, 450],
            raket: [300, 650],
            keycheck: false,
            key: '',
            next_key: '',
            startCheck: true,
            endCheck: false,
            name: '',
            score: 0,
            number: 0,
        }
    },
    mounted() {
        for (let i = 0; i < 80; i++) {
            this.blocks.push(true)
        }
        document.addEventListener('keydown', this.keydown)
        document.addEventListener('keyup', this.keyup)
        setInterval(this.push_key, 10)
        setInterval(this.changer, 20)
    },
    methods: {
        start() {
            if (this.name === '') {
                this.name = '名無し'
            }
            this.ball=[0, 0, 320, 450]
            this.blocks = []
            for (let i = 0; i < 80; i++) {
                this.blocks.push(true)
            }
            this.startCheck = false
            this.endCheck = false
            this.ball[1] = -8
        },
        end() {
            this.ball[1] = 0
            this.ball[0] = 0
            this.addData()
        },
        keydown(event) {
            if (this.key == '') {
                this.key = event.key
            } else if (this.key != event.key) {
                this.next_key = event.key
            }
        },
        keyup() {
            this.key = this.next_key
            this.next_key = ''
        },
        push_key() {
            if ((this.key == 'd' || this.key == 'ArrowRight')) {
                this.raket[0] += 8
            }
            if (this.raket[0] >= 540) {
                this.raket[0] = 540
            }
            if ((this.key == 'a' || this.key == 'ArrowLeft')) {
                this.raket[0] -= 8
            }
            if (this.raket[0] < 0) {
                this.raket[0] = 0
            }
        },
        changer() {
            let x = this.ball[2] + this.ball[0]
            let y = this.ball[3] + this.ball[1]
            //壁の当たり判定
            if (x > 625) {
                x = -x + 1250
                this.ball[0] = -this.ball[0]
            }
            if (x < 0) {
                x = -x
                this.ball[0] = -this.ball[0]
            }
            if (y > 690) {
                y = 690
                this.end()
            }
            if (y < 0) {
                y = -y
                this.ball[1] = -this.ball[1]
            }
            //ラケットの当たり判定
            if (
                this.ball[2] > this.raket[0] &&
                this.ball[2] < this.raket[0] + 100 &&
                this.ball[3] >= this.raket[1] - 18 && this.ball[3] <= this.raket[1]) {
                y = -y + 1260
                const a = this.ball[2] - this.raket[0] - 50
                this.ball[0] = a / 12.5
                this.ball[1] = Math.abs(a / 12.5) - 8
            }
            //ブロックの当たり判定
            let check_end = true
            for (let i = 0; i < 10; i++) {
                for (let l = 0; l < 8; l++) {
                    if (!this.blocks[i * 8 + l]) {
                        continue
                    } else {
                        check_end = false
                    }
                    let block_check = false
                    const block_x = l * 80
                    const block_y = i * 30
                    //各当たり判定
                    const match_x = this.ball[2] >= block_x && this.ball[2] < block_x + 80
                    //上
                    if (
                        this.ball[3] > block_y - 8 &&
                        this.ball[3] < block_y &&
                        match_x &&
                        !this.blocks[(i - 1) * 8 + l]
                    ) {
                        block_check = true
                        y = block_y - 8
                        this.ball[1] = -this.ball[1]
                    }
                    //下
                    if (this.ball[3] > block_y + 30 &&
                        this.ball[3] < block_y + 38 &&
                        match_x &&
                        (i + 1 == 5 ||
                            !this.blocks[(i + 1) * 8 + l])) {
                        block_check = true
                        y = block_y + 38
                        this.ball[1] = -this.ball[1]
                    }
                    const match_y = this.ball[3] >= block_y &&
                        this.ball[3] < block_y + 30
                    //左
                    if (match_y &&
                        this.ball[2] > block_x - 16 &&
                        this.ball[2] < block_x &&
                        !this.blocks[i * 8 + l - 1]) {
                        block_check = true
                        x = block_x - 8
                        this.ball[0] = -this.ball[0]
                    }
                    //右
                    if (match_y &&
                        this.ball[2] > block_x + 80 &&
                        this.ball[2] < block_x + 88 &&
                        !this.blocks[i * 8 + l + 1]) {
                        block_check = true
                        x = block_x + 88
                        this.ball[0] = -this.ball[0]
                    }
                    if (block_check) {
                        this.blocks[i * 8 + l] = false
                        this.score += 100
                    }
                }
            }
            if (check_end) {
                this.end()
            }
            this.ball[2] = x
            this.ball[3] = y
        },
        async addData() {
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
            const response = await fetch('http://127.0.0.1:8000/api/blockbreaker/add', param);
            const result = await response.json();
            this.number = result[0]
            this.endCheck = true
        },

    }
}
</script>
<style src="@/styles/form.css"></style>
<style scoped>
h2{
    color: green;
}
.content {
    padding-top: 50px;
    height: 900px;
    position: relative;
}

.game_box {
    position: relative;
    width: 648px;
    padding-bottom: 400px;
    margin: 30px auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    border: 4px solid green;
    background-color: white;
}
</style>