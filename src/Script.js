import { Timer } from "./Timer.js";

$( document ).ready(function() {
    jsLoading(true);

    document.getElementById("counter").addEventListener("click", startStudy, false);

    readTextFile("../config/apiKeys.json", function(text){
        let data = JSON.parse(text);
        let latLong; 

        setBackgroundImage(data[0].key_api_unsplash)
        .then(()=> {            
            sleep(3);            
        }) 
        .then(()=>{                
            getLocation.then((value) => {                                
                setWeather(data[1].key_api_weather, value);
            });            
        })         
        .then(()=> {
            jsLoading(false);
        });
    });
});

async function setWeather(key_api_weather, coordinates){    
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=`+key_api_weather;

    await $.get({
        type        : 'GET',
        url         :  weatherUrl, 
        dataType: "json", 
        contentType: "application/x-www-form-urlencoded",                
        success: function(data){                        
            let degrees = data.main.temp.toString().split('.')[0];

            $('#degrees').text(degrees + '°');
            $("#city-name").text(data.name);                                    
        }
    }); 
}


let getLocation = new Promise(function(resolve, reject) {

    navigator.geolocation.getCurrentPosition((position) => {
        resolve({
            lat : position.coords.latitude,
            lon : position.coords.longitude,
        }); 
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

let setBackgroundImage = async function setBackground(key_api_unsplash){      

    let photoUrl = 'https://api.unsplash.com//search/photos?query=montain&client_id='+key_api_unsplash;                

    await $.get({
        type        : 'GET',
        url         :  photoUrl,                
        success: function(data){            
            let indexPhoto = getRandomIntInclusive(0, data.results.length - 1);    
            let valorTag = $('#instagramArtist').html();            

            $('body').css('background-image', 'url(' + data.results[indexPhoto].urls.full + ')');                                                     

            console.log('troca papel');
            
            if(data.results[indexPhoto].user.instagram_username == null)
                $('#instagramArtist').html(valorTag+'  Autor Desconhecido');
            else                            
                $('#instagramArtist').html(valorTag+'  '+data.results[indexPhoto].user.instagram_username);
        }
    }); 
}

function sleep(seconds) {
    let milisseconds = seconds*1000
    const date = Date.now()
    let currentDate
    do{
        currentDate = Date.now()
    }while(currentDate - date < milisseconds)
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


function jsLoading(flag) {
    if(flag){
        $('#loading').removeClass('d-none');
        $('body').css('background-image' , 'none');
        $('*').css('background-color' , 'black');
        $('#counter').addClass('d-none');        
    } else {
        $('#loading').addClass('d-none');
        $('#counter').removeClass('d-none');
        $('*').css('background-color' , '');
    }    
}