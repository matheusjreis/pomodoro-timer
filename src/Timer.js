import { formatTime, playNotificationSound } from "../helpers/Utils.js"

const Timer = {
    currentTime: 0,
    interval: null,
    currentTimeMinutes: 0,
    startCounter(){
        Timer.currentTime = 60
        Timer.currentTimeMinutes = 24
        Timer.interval = setInterval(Timer.countdown,1000)        
    },stopCounter(){
        Timer.currentTime = 0
        clearInterval(Timer.interval)
    },countdown(){
        let minutes;
        let seconds;

        if(Timer.currentTime == 0){
            Timer.currentTime = 60;
            Timer.currentTimeMinutes--;
        }        
        Timer.currentTime--                                                    

        if(Timer.currentTime == 0 && Timer.currentTimeMinutes == 0){
            playNotificationSound();  

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Hora de descansar',
                showConfirmButton: false,
                timer: 1500
            });

            Timer.currentTime = 60;
            Timer.currentTimeMinutes = 4;
        }
        
        minutes = Timer.currentTimeMinutes;
        seconds = Timer.currentTime;        
        
        $('#counter').text(formatTime(minutes)+':'+formatTime(seconds));
    }
}

export { Timer } 