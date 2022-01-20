import { Timer } from "./Timer.js";

$( document ).ready(function() {
    let key_unsplash;

    document.getElementById ("counter").addEventListener ("click", startStudy, false);

    readTextFile("../config/apiKeys.json", function(text){
        let data = JSON.parse(text);
                
        setBackgroundImage(data[0].key_api_unsplash);
    });
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;    
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


async function setBackgroundImage(key_api_unsplash){  
    
    let photoUrl = 'https://api.unsplash.com//search/photos?query=nature&client_id='+key_api_unsplash;                
    await $.get({
        type        : 'GET',
        url         :  photoUrl,                
        success: function(data){            
            let indexPhoto = getRandomIntInclusive(0, data.results.length - 1);    
            let valorTag = $('#instagramArtist').html();
            $('body').css('background-image', 'url(' + data.results[indexPhoto].urls.full + ')');         
            
            if(data.results[indexPhoto].user.instagram_username == null)
                $('#instagramArtist').html(valorTag+'  Autor Desconhecido');
            else                            
                $('#instagramArtist').html(valorTag+'  '+data.results[indexPhoto].user.instagram_username);
        }
    }); 
}

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