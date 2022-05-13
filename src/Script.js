import { playClickSound } from "../helpers/Utils.js"
import { Timer } from "./Timer.js";

$( document ).ready(function() {
    jsLoading(true);
    
    Notification.requestPermission();

    document.getElementById("counter").addEventListener("click", startStudy, false);
    document.getElementsByClassName("fa-pause")[0].addEventListener("click", pauseTimer, false);
    document.getElementsByClassName("fa-play")[0].addEventListener("click", playTimer, false);

    readTextFile("../config/apiKeys.json", function(text){
        let data = JSON.parse(text);
        let latLong; 

        setBackground(data[0].key_api_unsplash)
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
        crossDomain: true, 
        dataType: "json", 
        contentType: "application/x-www-form-urlencoded",                
        success: function(data){                        
            let degrees = data.main.temp.toString().split('.')[0];
            let weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            let weatherDescription = data.weather[0].description;

            $('#weatherIcon').attr('src',weatherIconUrl);
            $('#weatherIcon').attr('alt',weatherDescription);
            $('#weatherIcon').attr('title',weatherDescription);
            $('#weatherIcon').removeClass('d-none');

            // $('#degrees').text(degrees + '°');
            $("#city-name").text(data.name + "("+ degrees + '°)');               
        }
    }); 
}


let getLocation = new Promise(function(resolve, reject) {  
    navigator.geolocation.getCurrentPosition((position) => {
        resolve({
            lat : position.coords.latitude,
            lon : position.coords.longitude,
        });         
    },(error) => {        
        resolve({
            lat : -18.913664,
            lon : -48.266560,
        });         
    }
    );
});

function pauseTimer(){    
    playClickSound();

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Timer pausado',
        showConfirmButton: false,
        timer: 1500
    });
    Timer.isTimerPaused= true;

    $('.fa-pause').addClass('d-none');
    $('.fa-play').removeClass('d-none');
}

function playTimer(){    
    playClickSound();

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Timer despausado',
        showConfirmButton: false,
        timer: 1500
    });
    Timer.isTimerPaused= false;

    $('.fa-pause').removeClass('d-none');
    $('.fa-play').addClass('d-none');
}

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

function setBackground(key_api_unsplash){      
    return new Promise((resolve, reject)=>{
        let photoUrl = 'https://api.unsplash.com//search/photos?query=montain&client_id='+key_api_unsplash;                

        $.get({
            type        : 'GET',
            url         :  photoUrl,     
            crossDomain: true,           
            success: function(data){ 
                let indexPhoto = getRandomIntInclusive(0, data.results.length - 1);    
                let valorTag = $('#instagramArtist').html();                                            
                var img = new Image();

                img.onload = function() {
                    $('body').css('background-image', 'url(' + data.results[indexPhoto].urls.full + ')');                                                     
                    resolve();
                }
                img.src = data.results[indexPhoto].urls.full;

                if (img.complete) 
                    img.onload();

                if(data.results[indexPhoto].user.instagram_username == null)
                    $('#instagramArtist').html(valorTag+'  Autor Desconhecido');
                else                            
                    $('#instagramArtist').html(valorTag+'  '+data.results[indexPhoto].user.instagram_username);                                                    
            } 
        }); 
    })    
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
    playClickSound();
    
    Swal.fire({
        title: 'Deseja iniciar a contagem?',
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

            if(Timer.isTimerPaused){
                playTimer();
            }

            Swal.fire(
            'Contador iniciado!',
            'Bons estudos.',
            'success'
            );

            $('.fa-pause').removeClass('d-none');
        }
    });
}


function jsLoading(flag) {
    if(flag){
        $('#loading').removeClass('d-none');
        $('body').css('background-image' , 'none');
        // $('*').css('background-color' , 'black');
        $('#counter').addClass('d-none');        
    } else {
        $('#loading').addClass('d-none');
        $('#counter').removeClass('d-none');
        // $('*').css('background-color' , '');
    }    
}