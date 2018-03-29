var arregloElementos =[]
var crono =''
$(function(){
    
    
    //inicializar animacion titulo
    //$('h1').attr('zIndex', '200');
    tituloOn($('h1'));
    
    
    //Presionar boton de iniciar juego
    $('button').on('click',function(){
        reiniciarJuego();
        $('button').text('Reiniciar');
        
    })
    
})
    //FUNCIONES DEL JUEGO
    
    //FUNCIONES DE ENCENDER U APAGAR LUZ DE TITULO
    function tituloOn(elemento){
        $(elemento).animate(
            {color: '#DCFF0E'},
            800,function(){
                tituloOff(elemento)
        })
    }
    function tituloOff(elemento){
        $(elemento).animate(
            {color: '#FFFE'},800,
            function(){
                tituloOn(elemento)
        })
    }
    
    //funcion reiniciarJuego
    function reiniciarJuego(){
        
        //ordenar elementos DOM
        $('.elemento').remove()
        $('#score-text').text('0')
        $('#movimientos-text').text('0')
        $('.panel-tablero').css('width','70%')
        $('.panel-score').css('width','27%')
        $('.panel-tablero').show()
        $('.time').show()
        $('.titulo-over').remove()

        //inicializar las figuras en el tablero y eliminar repetidas hasta que el cuadro quede homogeneo sin combinaciones
        llenarTablero()
       
        while ( combinaciones() ){
            borrarElementos('sinAnimacion')
            llenarTablero('sinAnimacion')
            
        }
        
        //evaluar combinaciones cada cierto tiempo
        setInterval(function(){
            if(combinaciones('on'))
               borrarElementos()
        },1500)  
    }
    
    //FUNCION PARA crear elemento y cargarlos en el TABLERO
    function llenarTablero(sinAnimacion){
       for (var j = 1; j < 8; j++){
          var faltantes = $('.col-'+ j +' .elemento').length
          faltantes = 7 - faltantes
                              
          for (var i = 0; i < faltantes; i++){
                var elemento = $( elementoAzar() )
                .draggable(
                  {containment: '.panel-tablero',
                   stack: '.elemento',
                   revert: 'invalid',
//                   snap: 'true',
//                   snapMode: 'both'
//                     grid: [96 96]
                  })
                .droppable(
                  {  
                      drop: function(event, ui){

                                    
                            
                          //INTERCAMBIO DE ELEMENTOS EN DRAG AND DROP

                         var src = $(ui.draggable).attr('src')
                         $(ui.draggable).attr('src', $(this).attr('src'))
                         $(this).attr('src',src) 

                      //ANIMAR REGRESO DE DRAG A SU POSICION
                         $(ui.draggable).animate(
                            {top: '0px', left: '0px'}, 400)
                            
                         crono = setInterval(buscarfichas(),2000)     
                              
                              //Cambiar el numero de movimientos        
                              $('#movimientos-text').text( parseInt( $("#movimientos-text").text() ) + 1 )         
//                            }
                         
                    }
                })
                //Agregarlo a su columna correspondiente
                .appendTo($('.col-' + j ) )

                //agregar efecto de caida del elemento nuevo
                if (sinAnimacion != 'sinAnimacion'){
                    $(elemento).css('top', "-600px")
                            .animate({top: "0px"},800)

                }
          }
       }
    }
     
    //funcion que crea figuras del juego al azar
    function elementoAzar(){
        var n = Math.floor(Math.random()*4+1)
        var elemento = "<img src='image/" + n + ".png' class= 'elemento'>"
        return elemento
    }
    
    //FUNCION ELIMINAR CONBINACIONES Y SUMAR A PUNTUACION si juego = "on"
    function combinaciones(juego){
       var elementoCumple = []
       var col = $('.panel-tablero div')    
      
       //funcion que evalua combinaciones verticales y horizontales las elimina
       revisarVertical(col,elementoCumple)        
       revisarHorizontal(col,elementoCumple)
        
        //CONTAR LA PUNTUACION SIEMPRE Y CUANDO ESTE ACTIVADO JUEGO
        if (juego == 'on'){
            $("#score-text").text( parseInt( $("#score-text").text() ) + elementoCumple.length * 100)   
        }
        
        //ELIMIMAR TODOS LOS ELEMENTOS 
        $(elementoCumple).each(function(i,item){
           $(item).addClass('eliminar')
        })
        
                    
        
        if (elementoCumple.length != 0 ){
           // borrarElementos()
            return true
        }
        else 
            return false 
    }    
       
    //funciones para evaluar posibles ombinaciones a nivel horizontal y guardar aquellos que cumplen para ser borrados    
    function  revisarVertical(col, elementoCumple){
       //------PROCEDIMIENTO PARA ANALISIS DE COLUMNAS ---------------/////
       var elemento, elementosEvaluados = []
                
       for (var i = 0; i< 7; i++ ){
           //Selecciono el primer elemento de la columna
           elemento = $(col[i]).find(':first-child')[0]
           var iguales = 0
            
           //evaluar combinaciones que cumplen como columna
           for(var j = 2; j<8; j++){
                var evaluado = $(col[i]).find(":nth-child("+ j + ")")[0]
                
                //comparar si ambos elementos son los mismos
                if ( $(elemento).attr('src') == $(evaluado).attr('src') ){
                    elementosEvaluados.push($(evaluado))
                    iguales++
                }
                else{
                    if (iguales >1){
                        elementosEvaluados.forEach(function(element){
                            elementoCumple.push($(element))
                        })
                        elementoCumple.push($(elemento))
                    }
                    
                    elementosEvaluados=[]
                    elemento = evaluado
                    iguales = 0
                }
                
            }
           if (iguales >1){
              elementosEvaluados.forEach(function(element){
                 elementoCumple.push($(element))
              })
              elementoCumple.push($(elemento))
              elementosEvaluados=[]
            }
        } 
    }   

    function  revisarHorizontal(col, elementoCumple){
       var elemento, elementosEvaluados = []
              
       for (var i = 1; i< 8; i++ ){
           //Selecciono el primer elemento de la fila
           elemento = $(col[0]).find(':nth-child('+i+')')[0]
           var iguales = 0
            
           //evaluar combinaciones que cumplen como columna
           for(var j = 0; j<8; j++){
                var evaluado = $(col[j]).find(":nth-child("+ i + ")")[0]
                
                //comparar si ambos elementos son los mismos
                if ( $(elemento).attr('src') == $(evaluado).attr('src') ){
                    elementosEvaluados.push($(evaluado))
                    iguales++
                }
                else{
                    if (iguales >1){
                        elementosEvaluados.forEach(function(element){
                            elementoCumple.push($(element))
                        })
                        elementoCumple.push($(elemento))
                    }
                    
                    elementosEvaluados=[]
                    elemento = evaluado
                    iguales = 0
                }
                
            }
           
           
           if (iguales >2){
              elementosEvaluados.forEach(function(element){
                 elementoCumple.push($(element)[0])
              })
              elementoCumple.push($(elemento))
              elementosEvaluados=[]
            }
        } 
 
        
        
    }

    //funcion que elimina elemtos en combinacion
    function borrarElementos(sinAnimacion){
        if (sinAnimacion != 'sinAnimacion'){
            $('.eliminar').hide('explode',800, function(){
                    $(this).remove()
                    llenarTablero()

             })
             
        } 
        else
            $('.eliminar').remove()  
    }

   function buscarfichas(){
       if (combinaciones('on'))
           borrarElementos()
       else
           clearInterval(crono)
   } 
 