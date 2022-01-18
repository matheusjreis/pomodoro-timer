function formatTime(time){
    if(time.toString().length == 2){
        return time;
    }
    return '0'+time; 
}

function playNotificationSound() {
    const audio = new Audio('../notificationSounds/bellSound.mp3');
    audio.play();
}

export { formatTime, playNotificationSound };