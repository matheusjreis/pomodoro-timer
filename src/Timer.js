import { formatTime, playNotificationSound, showNotification } from "../helpers/Utils.js"

const Timer = {
    isRestTime: false,
    isTimerPaused: false,
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

        if(Timer.isTimerPaused){
            if(Timer.currentTime == 0){
                Timer.currentTime = 60;
            }        
        }else{
            if(Timer.currentTime == 0){
                Timer.currentTime = 60;
                Timer.currentTimeMinutes--;
            }        
            Timer.currentTime--; 
        }        

        if(Timer.currentTime == 0 && Timer.currentTimeMinutes == 0){
            playNotificationSound(); 
            showNotification('Hora de descansar'); 

            if(!this.isRestTime){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Hora de descansar',
                    showConfirmButton: false,
                    timer: 1500
                });
    
                Timer.currentTime = 60;
                Timer.currentTimeMinutes = 4;

                this.isRestTime = true;
            } else {
                showNotification('De volta aos estudos');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'De volta aos estudos',
                    showConfirmButton: false,
                    timer: 1500
                });
    
                Timer.currentTime = 60;
                Timer.currentTimeMinutes = 24;

                this.isRestTime = false;
            }                    
        }
        
        minutes = Timer.currentTimeMinutes;
        seconds = Timer.currentTime;        
        
        $('#favicon-title').text('Pomodoro - '+formatTime(minutes)+':'+formatTime(seconds));
        $('#counter').text(formatTime(minutes)+':'+formatTime(seconds));
    }
}

export { Timer } 