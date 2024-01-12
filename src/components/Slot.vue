<template>
    <div class="content">
        <div class="d-flex justify-space-between">
            <h2>スコア : {{ score }}</h2>
            <h2>残り回数 : {{ chance }}</h2>
        </div>
        <div class="slot_box d-flex">
            <Lane v-bind:spin_check="spin_check[0]" v-bind:lane_num="0" v-on:add_value="add_value" ref="lane0" />
            <Lane v-bind:spin_check="spin_check[1]" v-bind:lane_num="1" v-on:add_value="add_value" ref="lane1" />
            <Lane v-bind:spin_check="spin_check[2]" v-bind:lane_num="2" v-on:add_value="add_value" ref="lane2" />
        </div>
        <div v-if="!spin_check_all && chance > 0" class="d-flex justify-center w-600">
            <v-btn @click="spin">回転</v-btn>
        </div>
        <div v-if="chance == 0" class="d-flex justify-center">
            <div class="restart">
                <p>スコア：{{ score }}</p>
                <p>順位：</p>
                <v-btn @click="start">再挑戦</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import Lane from './Lane.vue'

export default {
    data() {
        return {
            score: 0,
            chance: 10,
            spin_check_all: false,
            spin_check: [false, false, false,],
            values: new Array(9),
        };
    },
    components: {
        Lane,
    },
    created() {
        window.addEventListener('keydown', this.press_key);
    },
    methods: {
        spin() {
            this.spin_check[0] = true
            this.spin_check[1] = true
            this.spin_check[2] = true
            this.spin_check_all = true
        },
        add_value(array) {
            const num = array[0]
            this.spin_check[num] = false
            this.values[num * 3] = array[1]
            this.values[num * 3 + 1] = array[2]
            this.values[num * 3 + 2] = array[3]
            if (!this.spin_check[0] &&
                !this.spin_check[1] &&
                !this.spin_check[2]) {
                this.endturn()
            }
        },
        endturn() {
            this.spin_check_all = false
            this.chance -= 1
            for (let i = 0; i < 3; i++) {
                let check = false
                const start = this.values[i]
                for (let l = -1; l < 2; l++) {
                    if (i + l * 2 < 0 || i + l * 2 > 2) {
                        continue;
                    }
                    console.log(start)
                    if (start === this.values[3 + i + l] && start === this.values[6 + i + l * 2]) {
                        if (start=='７') {
                            this.score += 1000
                        }else{
                            this.score += 200
                        }
                    }
                }
            }
        },
        press_key(event) {
            if (event.code === 'Space' && this.chance > 0) {
                if (!this.spin_check_all) {
                    this.spin()
                } else if (this.spin_check[0]) {
                    this.$refs.lane0.stop()
                } else if (this.spin_check[1]) {
                    this.$refs.lane1.stop()
                } else if (this.spin_check[2]) {
                    this.$refs.lane2.stop()
                }
            } else if (event.code === 'Enter' && this.chance == 0) {
                this.start()
            }

        },
        start() {
            this.chance=10
            this.score=0
            this.$refs.lane0.start()
            this.$refs.lane1.start()
            this.$refs.lane2.start()
        }
    },
}
</script>

<style scoped>
.slot_box {
    width: 600px;
    height: 600px;
    background-color: gainsboro;
    border: 1px solid black;
}

.w-600 {
    padding: 20px 0;
    width: 600px;
    height: 80px;
    background-color: black;
}

.content {
    margin-top: 100px;
    width: 600px;
}

.restart {
    position: absolute;
    font-size: 80px;
    background-color: bisque;
    border: 1px solid black;
    border-radius: 100px;
    padding: 50px;
    top: 200px;
}
</style>