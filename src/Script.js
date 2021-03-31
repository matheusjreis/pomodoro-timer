//let interval = setInterval(notify,3000)

function start_counter(){
    notify()
}

function notify() {
    async () => {
        const permission = await Notification.requestPermission()
    }
    console.log(permission)
    new Notification("Primeira pausa", {
        body: "Hora de descansar"
    })
}