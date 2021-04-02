import { Timer } from "./Timer.js";

Timer.showWatch({
    minutes: 19,
    seconds: 10
})

Timer.startCounter()


// let second = 1*1000
// let minute = 60000
// let interval = null

// function start_counter(){
//     interval = setInterval(notify(),3000)
//     // console.log(interval)
// }

// function notify() {
//     minute--
//     console.log(minute)
//     // new Notification("Primeira pausa", {
//     //     body: "Hora de descansar"
//     // })
// }

// function stopNotify(){
//     clearInterval(interval)
// }

// function sleep(seconds) {
//     let milisseconds = seconds*1000
//     const date = Date.now()
//     let currentDate
//     do{
//         currentDate = Date.now()
//     }while(currentDate - date < milisseconds)
// }