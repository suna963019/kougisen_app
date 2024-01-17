<template>
    <div class="content_box">
        <h2>Typing Game</h2>
        <br>
        <div class="d-flex text">
            <pre class="message1">{{ message1 }}</pre>
            <pre class="now">{{ now }}</pre>
            <pre class="message2">{{ message2 }}</pre>
        </div>
        <br>
        <v-btn @click="reset">reset</v-btn>
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
            message2: 'Face the fear, Build the future ',
        }
    },
    mounted() {
        window.addEventListener('keypress', this.type)
        this.message1 += this.now
        this.now = String(this.message2).charAt(0)
        this.message2 = String(this.message2).slice(1)
    },
    methods: {
        type(event) {
            if (this.now == event.key) {
                this.set_next_char()
            }
            if (this.message2 == '' && this.now === ' ' && this.count < 14) {
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
            this.message2 = this.default[this.count].slice(1)+' '
            this.count++
        },
        reset() {
            this.count = 0
            this.message1 = ''
            this.message2 = this.default[0]
        }
    }
}
</script>

<style scoped>
.message1 {
    color: rgb(182, 182, 182);
}

.content_box {
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