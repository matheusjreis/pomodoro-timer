import { Timer } from "./Timer.js";

document.getElementById ("counter").addEventListener ("click", startStudy, false);

function startStudy(){    
    Swal.fire({
        title: 'Deseja iniciar o contador?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Cancelar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Timer.stopCounter();
            Timer.startCounter();

            Swal.fire(
            'Contador iniciado!',
            'Bons estudos.',
            'success'
            )
        }
    })
}