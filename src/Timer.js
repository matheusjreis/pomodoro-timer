const Timer = {
    currentTime: 0,
    interval: null,
    startCounter(){
        Timer.currentTime = 60
        Timer.interval = setInterval(Timer.countdown,1000)
    },stopCounter(){
        Timer.currentTime = 0
        clearInterval(Timer.interval)
    },countdown(){
        Timer.currentTime--
        $('#counter').text('0:'+Timer.currentTime);
    }
}

export { Timer } 