class Stopwatch {
    #elapseTimeInSeconds = 0;
    #intervalId = null;
    
    start(callback = () => {}) {
        this.#intervalId = setInterval(() => {
            this.#elapseTimeInSeconds++;
            callback();
        },1000);
    }

    stop(callback = () => {}) {
        clearInterval(this.#intervalId);
        callback();
    }

    reset(callback = () => {}) {
        this.#elapseTimeInSeconds = 0;
        callback();
    }

    get elapseTime() {
        return Stopwatch.formatTime(this.#elapseTimeInSeconds);
    }

    static formatTime(timeInSecond) {
        const hours = Math.floor(timeInSecond/3600);
        const minutes = Math.floor((timeInSecond % 3600) / 60);
        const seconds = timeInSecond - (hours * 3600) - (minutes * 60);
        
        return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(minutes)}:${Stopwatch.zeroPadding(seconds)}`;
    }

    static zeroPadding(originalNumber, desiredAmountDigits = 2) {
        let stringNumber = String(originalNumber);
        const zerosRequired = desiredAmountDigits - stringNumber.length;

        if(zerosRequired <= 0) {
            return stringNumber;
        } 
        
        for(let counter = 0; counter < zerosRequired; counter++) {
            stringNumber = `0${stringNumber}`;
        }
        
        return stringNumber;
    }
}

const sw1 = new Stopwatch();

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const stopwatchDisplay = document.getElementById('stopwatch-display');

function updateDisplay() {
    stopwatchDisplay.innerHTML = sw1.elapseTime;
}

startButton.addEventListener('click', () => {
    sw1.start(updateDisplay);
});

stopButton.addEventListener('click', () => {
    sw1.stop(updateDisplay);
});

resetButton.addEventListener('click', () => {
    sw1.reset(updateDisplay);
})