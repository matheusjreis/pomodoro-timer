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

function playClickSound() {
    const audio = new Audio('../notificationSounds/popSound.mp3');
    audio.play();
}

function showNotification(msg) {
    const notification = new Notification('Pomodoro Timer', {
        body: msg,
        icon: '../icons/pomodoro-tomato.png'
    });

    // close the notification after 10 seconds
    setTimeout(() => {
        notification.close();
    }, 10 * 1000);
}

export { formatTime, playNotificationSound, playClickSound, showNotification };