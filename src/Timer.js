const Timer = {
    currentTime: 0,
    interval: null,
    startCounter(){
        Timer.currentTime = 60
        Timer.interval = setInterval(Timer.countdown,1000)
    },countdown(){
        Timer.currentTime--
        console.log(Timer.currentTime)
    },
    showWatch({minutes, seconds}) {
        document.body.innerHTML = 
        `<div id="counter" onclick="startCounter()">
            ${minutes}:${seconds}            
        </div>`;
    }
}

export { Timer } 