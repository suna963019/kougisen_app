<template>
    <div id="contents">
        <p id="check_win"></p>
        <div id="dearer_card">

        </div>
        <div id="point_box">
            <p>{{ this.point }} point</p>
        </div>
        <div id="next_box">
            <button v-if="next" id="next" onclick="set()">next</button>
        </div>
        <div id="button_box">
            <button id="double" onclick="double()">Double</button>
            <button id="hit" onclick="hit()">Hit</button>
            <button id="stand" onclick="stand()">Stand</button>
        </div>
        <div id="my_card">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cardList: [],
            cardCheck: [],
            cardKinds: 0,
            cardNum: 0,
            myCardNum: 0,
            dearerCardNum: 0,
            playerCardsPointArray: [],
            dearerCardsPointArray: [],
            moveCheck: true,
            point: 10,
            pointReturn: 0,
            my_card:'',
            dearer_card:'',
            check_win:'',
            next:false,
        }
    },
    mounted() {
        this.set()
    },
    methods: {
        set() {
            this.pointReturn = 10;
            this.cardList = [];
            this.cardCheck = [];
            this.cardKinds = 0;
            this.cardNum;
            for (let i = 1; i < 53; i++) {
                if ((i - 1) % 13 === 0) {
                    this.cardKinds++;
                }
                this.cardNum = i % 13 + 1;
                this.cardList.push([this.cardKinds, this.cardNum]);
                this.cardCheck.push(0);
            }
            this.myCardNum = 0;
            this.dearerCardNum = 0;
            this.playerCardsPointArray = [];
            this.dearerCardsPointArray = [];
            this.moveCheck = true;
            this.my_card = "";
            this.dearer_card = "";
            this.check_win = "";
            this.next=false
            this.start();
        },
        double() {
            if (this.moveCheck) {
                this.pointReturn = 20;
                HandOutCard();
                dearerStart();
            }
        },
        hit() {
            if (this.moveCheck) {
                HandOutCard();
            }
        },
        stand() {
            if (this.moveCheck) {
                dearerStart();
            }
        },
        start() {
            dearerHandOutCards();
            HandOutCard();
            dearerHandOutCards();
            HandOutCard();
        },
        end() {
            deckCheck();
            this.next=true;
        },

// -------ここまで---------------------------------

        checkOutPoints(pointList) {
            let allPoint = 0;
            let allPoint2 = 0;
            let allPointCheck = false;
            let allPoint2Check = false;
            let checkA = true;
            for (const i of pointList) {
                allPoint += i;
                allPoint2 += i;
                if (i === 1 && checkA) {
                    allPoint2 += 10;
                    checkA = false;
                }
            }
            if (allPoint > 21) {
                allPointCheck = true;
            }
            if (allPoint2 > 21) {
                allPoint2Check = true;
            }
            return [allPointCheck, allPoint, allPoint2Check, allPoint2];
        },
        HandOutCard() {
            const myCardElement = document.getElementById("my_card");
            let myCardArray = randomSelect();
            let myCardKind = cardKindsChange(myCardArray[0]);
            myCardElement.insertAdjacentHTML("beforeend", `<div id="my_card_${myCardNum}" class="my_card card"><p>${myCardKind[0]} ${myCardArray[1]}</p></div>`);
            document.querySelector(`#my_card_${myCardNum++}`).style.color = `${myCardKind[1]}`;
            let playerPlusPoint = myCardArray[1];
            if (playerPlusPoint > 10) {
                playerPlusPoint = 10;
            }
            playerCardsPointArray.push(playerPlusPoint);
            if (checkOutPoints(playerCardsPointArray)[0]) {
                moveCheck = false;
                winPrint(false);
            }
        }, cardKindsChange(num) {
            let cardKinds;
            let cardColor;
            switch (num) {
                case 1:
                    cardKinds = "♥";
                    cardColor = "red";
                    break;
                case 2:
                    cardKinds = "♦";
                    cardColor = "red";
                    break;
                case 3:
                    cardKinds = "♠";
                    cardColor = "black";
                    break;
                case 4:
                    cardKinds = "♣";
                    cardColor = "black";
                    break;
                default:
            }
            return [cardKinds, cardColor];
        }, randomSelect() {
            let cardSelectIndex;
            let cardSelect;
            while (true) {
                cardSelectIndex = Math.floor(Math.random() * 52);
                cardSelect = cardList[cardSelectIndex];
                if (cardCheck[cardSelectIndex] === 0) {
                    cardCheck[cardSelectIndex] = 1;
                    break;
                }
            }
            return cardSelect;
        },
        dearerStart() {
            let dearerPointCheckArray;
            let playerPointCheckArray;
            while (true) {
                dearerPointCheckArray = checkOutPoints(dearerCardsPointArray);
                playerPointCheckArray = checkOutPoints(playerCardsPointArray);
                if (pointArrayCheck()) {
                    break;
                }
                if (dearerPointCheckArray[3] >= 17 && dearerPointCheckArray[3] <= 21) {
                    break;
                } else if (dearerPointCheckArray[1] > 17) {
                    break;
                } else {
                    dearerHandOutCards();
                }
            }

            if (dearerPointCheckArray[0]) {
                winPrint(true);
            } else {
                winCheck();
            }

        },
        pointArrayCheck() {
            let dearerPointCheckArray = checkOutPoints(dearerCardsPointArray);
            let playerPointCheckArray = checkOutPoints(playerCardsPointArray);
            let playerPointCheck = playerPointCheckArray[1];
            let dearerPointCheck = dearerPointCheckArray[1];
            if (!playerPointCheckArray[2]) {
                playerPointCheck = playerPointCheckArray[3];
            }
            if (!dearerPointCheckArray[2]) {
                dearerPointCheck = dearerPointCheckArray[3];
            }
            if (playerPointCheck < dearerPointCheck) {
                return true;
            } else {
                return false;
            }

        }, dearerHandOutCards() {
            const dearerCardElement = document.getElementById("dearer_card");
            let dearerCardArray = randomSelect();
            let dearerCardKind = cardKindsChange(dearerCardArray[0]);
            dearerCardElement.insertAdjacentHTML("beforeend", `<div id="dearer_card_${dearerCardNum}" class="dearer_card card"><p>${dearerCardKind[0]} ${dearerCardArray[1]}</p></div>`);
            document.querySelector(`#dearer_card_${dearerCardNum++}`).style.color = `${dearerCardKind[1]}`;
            let dearerPlusPoint = dearerCardArray[1];
            if (dearerPlusPoint > 10) {
                dearerPlusPoint = 10;
            }
            dearerCardsPointArray.push(dearerPlusPoint);
        },
        winCheck(playerPoint) {
            let playerPointCheckArray = checkOutPoints(playerCardsPointArray);
            let playerPointCheck;
            if (!playerPointCheckArray[2]) {
                playerPointCheck = playerPointCheckArray[3];
            } else if (!playerPointCheckArray[0]) {
                playerPointCheck = playerPointCheckArray[1];
            } else {
                playerPointCheck = 0;
            }

            let dearerPointCheckArray = checkOutPoints(dearerCardsPointArray);
            let dearerPointCheck;
            if (!dearerPointCheckArray[2]) {
                dearerPointCheck = dearerPointCheckArray[3];
            } else if (!dearerPointCheckArray[0]) {
                dearerPointCheckArray = dearerPointCheckArray[1];
            } else {
                dearerPointCheck = 1;
            }

            console.log(playerPointCheck)
            console.log(dearerPointCheck)
            console.log(playerPointCheckArray)
            console.log(dearerPointCheckArray)
            if (playerPointCheck > dearerPointCheck) {
                winPrint(true);
            } else if (playerPointCheck < dearerPointCheck) {
                winPrint(false);
            } else {
                const checkWin = document.getElementById("check_win");
                checkWin.textContent = "draw";
                checkWin.style.color = "gray";
                end();
            }


        }, winPrint(winnerCheck) {
            moveCheck = false;
            const checkWin = document.getElementById("check_win");
            if (winnerCheck) {
                checkWin.textContent = "Win";
                checkWin.style.color = "red";
                point += pointReturn;
            } else if (!winnerCheck) {
                checkWin.textContent = "Lose";
                checkWin.style.color = "blue";
                point -= pointReturn;
            }
            document.getElementById("point").textContent = point;
            end();
        }, deckCheck() {
            let checkUsedCount = 0;
            for (const i of cardCheck) {
                if (i === 0) {

                    break;
                }
            }
            if (checkUsedCount > 26) {
                deckReset();
            }
        },
        deckReset() {
            for (const i of cardCheck) {
                i = 0;
            }
        }



    },
}
</script>