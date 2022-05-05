function getRandomNumber(min , max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let app = Vue.createApp({
    data() {
        return {
            currentRound: 0,
            playerHealth: 100,
            monsterHealth: 100,
            winner: '',
            logMessages: [],
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0) {
                return this.winner = 'draw'
            }else if(value <= 0) {
               return this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0) {
                return this.winner =  'draw'
            }else if(value <= 0) {
                return this.winner = 'player'
            }
        }
    },
    computed: {
        monsterHealthBar() {
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerHealthBar() {
            if(this.playerHealth < 0) {
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        }
    },
    methods: {
        startANewGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
           const attackValue = getRandomNumber(5 , 12);
           this.monsterHealth -= attackValue;
           this.addLogMessages('player' , 'attack' , attackValue);
           this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomNumber(8 , 15);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster' , 'attack' , attackValue);
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = getRandomNumber(10 , 25);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player' , 'attack' , attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomNumber(8 , 20);
            if(this.playerHealth > 100) {
                this.playerHealth = 100;
            }else {
                this.playerHealth += healValue;
            }
            this.addLogMessages('player' , 'healing' , healValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
            this.playerHealth = 0;
        },
        addLogMessages(who , what , value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionVal: value,
            })
        }

    }
})

app.mount("#game")