$(function(){
   var min, seg    
   var idInterval =""
   
   
   $('button').on('click',function(){
       // detener cualquier conteo anterior e iniciar el conteo a 2 min
       clearInterval(idInterval)
       min = 2, seg = 0 
       idInterval=setInterval(function(){ timer() }, 1000)
   })
   
   function timer(){
           
       //conteo cada segundo 
       seg--
       if (seg == -1){
            min--
            seg = 59
        }
         
       //presentacion de los datos del reloj formato 00:00
       if (seg <= 9)
          $('#timer').text( "0"+ min + ":" + "0"+seg)
       else
          $('#timer').text( "0"+ min + ":" + seg)
        
       //Apaga el Timer y elimina elementos del tablero 
       if (min == 0 && seg == 0){  
         clearInterval(idInterval)  
           
        //ANIMACION FINAL PARA MOSTRAR SCORE Y ESCONDER TABLERO   
         $('.panel-score').animate( 
             {width: "95%"}, 
             {step: function(now){
                 $('.panel-tablero').css('width', parseInt(70-70*now/10)+"%")
             },queue: true
        },1000)
           
        $('.panel-tablero').hide()
        $('.time').hide()
        $('<h4 class="titulo-over">Juego Terminado</h4>').prependTo($('.panel-score'))   
           //$('.panel-tablero').animate({width: "0%"},{queue :false},1000)   

       }
   }
    
})