<template>
    <div class="game_box">
        <Block v-bind:color="block" v-for="block in blocks" />
        <Ball v-bind:ball="ball" />
        <Raket v-bind:block="raket[0]" />
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
            ball: [-4, -4, 320, 450],
            raket: [300, 502],
            keycheck: false,
            key: '',
            next_key: '',
        }
    },
    mounted() {
        for (let i = 0; i < 40; i++) {
            this.blocks.push(true)
        }
        document.addEventListener('keydown', this.keydown)
        document.addEventListener('keyup', this.keyup)
        setInterval(this.push_key, 10)
        setInterval(this.changer, 20)
    },
    methods: {
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
            if (y > 540) {
                y = 540
                this.ball[1] = 0
                this.ball[0] = 0
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
                y = -y + 970
                const a = this.ball[2] - this.raket[0] - 50
                this.ball[0] = a / 12.5
                this.ball[1] = Math.abs(a / 12.5) - 8
                console.log(this.ball[0]+':'+this.ball[1])
            }
            //ブロックの当たり判定
            for (let i = 0; i < 5; i++) {
                for (let l = 0; l < 8; l++) {
                    if (!this.blocks[i * 8 + l]) {
                        continue
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
                        this.ball[2] > block_x - 8 &&
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
                    }
                }
            }
            this.ball[2] = x
            this.ball[3] = y
        },

    }
}
</script>
<style>
.game_box {
    position: relative;
    width: 647px;
    padding-bottom: 400px;
    margin: 30px auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    border: 4px solid green;
}
</style>