//Objectes
const inpuObj = document.getElementById("paraulaSecreta")
const buttonObj = document.getElementById("comencaPartida")
const buttonMonstra = document.getElementById("botoMostra")
const spanEye = document.getElementById("ull")
const titolObj = document.getElementById("textTitol")
const capsaTitol = document.getElementById("titol")
const imatgeObj = document.getElementById("imatge")
 //stats1
const estadistiques1 = document.getElementById("stats")
const puntuacio = document.getElementById("score")
const partidesTotals = document.getElementById("totalPartides")
const guanyades = document.getElementById("wins")
const millorPuntuacio = document.getElementById("bestScore")
 //stats2
const estadistiques2 = document.getElementById("stats2")
const puntuacio2 = document.getElementById("score2")
const partidesTotals2 = document.getElementById("totalPartides2")
const guanyades2 = document.getElementById("wins2")
const millorPuntuacio2 = document.getElementById("bestScore2")

const capsaLletres = document.getElementById("lletres")
const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Variables
let paraulaSecreta;
let noNum;
let titol;
let imatge;
let intents=0;
let caselles=[];
let lletraJugada;
//PUNTS 1
let score=0;
let totalPartides=0;
let wins=0;
let bestScore=0;

//PUNTS 2
let score2=0;
let totalPartides2=0;
let wins2=0;
let bestScore2=0;

//multiplicador de puntuacio
let multi=1;
let multi2=1

//control del torn
let tornJugador1=true

crearBotons()
deshabilitaBoto();

function comencarPartida(){
    titolObj.style.color="#ffffff"
    resetPartida()
    paraulaSecreta=inpuObj.value;
    //comprobar que no hi ha nums
    noNum = !/\d/.test(paraulaSecreta); 

    //comença la partida si la paraula compleix els requisits
    if(paraulaSecreta){
        if(paraulaSecreta.length>3 && noNum){
            //deshabilitar input i boto de començarPartida
            inpuObj.disabled=true;
            buttonObj.disabled=true;
            //establir color dels torns a l'inici
            estadistiques1.style.backgroundColor ="#5fcf87"
            estadistiques2.style.backgroundColor ="#FF0000"  
            //habilitar botonsLletra i generar les caselles
            habilitaBoto();
            canviTitol();
            
        }else{
            alert("Mínim 4 lletres i sense numeros")
        }
    }else{
        alert("No hi ha paraula")
    }
}

//boto per mostrar la paraula
function mostrarParaula(){
    if(inpuObj.type=="password"){
        inpuObj.type="text";
        spanEye.innerText="visibility_off"
    }else{
        inpuObj.type="password";
        spanEye.innerText="visibility"
    }

}

//deshabilita tots els botons de lletres
function deshabilitaBoto(){
    for(let i=1;i<27;i++){
        let literal= "boto_"+ i;
        const botoA=document.getElementById(literal)
        botoA.disabled = true;
    }
}

//habilita tots els botons de lletres
function habilitaBoto(){
    for(let i=1;i<27;i++){
        let literal= "boto_"+ i;
        const botoA=document.getElementById(literal)
        botoA.disabled = false;
        botoA.style.color="#000000"
        botoA.style.border="1px solid #000000"
    }
}

//genera les caselles segons la length de la paraula i les mostra 
function canviTitol(){
    paraulaSecreta=inpuObj.value;
    for(let i=0;i<paraulaSecreta.length;i++){
        caselles[i]="_"
    }
    titolObj.innerText=caselles.join(" ")
}


/**
 * Al fer click en un botoLletra comporoba la lletra jugada, seguiment dels intents i actualitzar la imatge, puntuacio segons el torn, deshabilitar el boto polsat i fer-ho vermell.
 * @param  obj el botoLletra polsat
 */
function jugaLletra(obj){

    //CANVI COLOR BOTO I DESHABILITA
    obj.style.color="#FF0000"
    obj.style.border="1px solid #FF0000"
    obj.disabled=true

    //10 intents entre els dos jugadors
    if(intents<10){

        // TORN JUGADOR 1
        if(tornJugador1){
            lletraJugada= obj.textContent
            paraulaSecreta=inpuObj.value
            let index = paraulaSecreta.indexOf(lletraJugada.toLowerCase())
            //Si la lletra hi és a la paraula
            if(index!=-1){
                canviLletra()
                //sumem puntuació i augmentem el multiplicador de ratxa
                puntuacio.innerText=score
                multi++
            //si no hi és / fallar
            }else{
                //CANVI IMATGE
                intents=intents+1
                imatgeObj.src= "img/penjat_"+intents+".jpg";
                //reset multiplicador si es falla letra
                if (multi>1){
                    multi=1
                }
                //restar puntuacio al fallar evitant negatius
                if(score>0){
                    score=score-1
                puntuacio.innerText=score
                }
                //canviar torn al jugador 2
                canviTorn2()
            }

        // TORN JUGADOR 2
        }else{
            lletraJugada= obj.textContent
            paraulaSecreta=inpuObj.value
            let index = paraulaSecreta.indexOf(lletraJugada.toLowerCase())
            //COMPROVAR LLETRA
            if(index!=-1){
                canviLletra()
                puntuacio2.innerText=score2
                multi2++
            }else{
                //CANVI IMATGE
                intents=intents+1
                imatgeObj.src= "img/penjat_"+intents+".jpg";
                //reset multiplicador si es falla letra
                if (multi2>1){
                    multi2=1
                }
                //restar puntuacio al fallar evitant negatius
                if(score2>0){
                    score2=score2-1
                puntuacio2.innerText=score
                }
                //canviar torn al jugador 1
                canviTorn1()
            }
        }

    // DERROTA / ACABAR INTENTS
    }else{
        //Canviar color a vermell, mostrar paraula, deshabilitar botonsLletra
        capsaTitol.style.backgroundColor="#FF0000" 
        titolObj.style.color="#000000"
        titolObj.innerText=inpuObj.value.toUpperCase()
        deshabilitaBoto()
        //Poder escriure nova paraula i començar nova partida
        buttonObj.disabled=false;
        inpuObj.disabled=false;
        inpuObj.value="";
        setTimeout(function() {
            alert("Has perdut! Introdueix nova paraula.")
        }, 500)   
        finalPartida() 
    }
}

//canviar la casella per lletra corresponent quan la paraula la conté.
function canviLletra(){
    //Fa un array amb paraulSecreta
    paraulaSecreta=paraulaSecreta.split("")
    //guarda les aparicions totals de la lletra jugada
    let aparicions=0
    //Recorre l'array i canvia "_" per la lletra jugada si hi és i compta les repeticions
    for(let i=0;i<paraulaSecreta.length;i++){
        if(paraulaSecreta[i]==lletraJugada.toLowerCase()){
            caselles[i]=lletraJugada
            aparicions++
        }
    }

    //Separar les caselles amb espais i mostrar als jugadors
    titolObj.innerText=caselles.join(" ")

    // Sumar PUNTUACIÓ segons del numero d'aparicions de la lletra
    if(tornJugador1){
        score=score+(multi*aparicions)
    }else{
        score2=score2+(multi2*aparicions)
    }
    
    //comprovar si al canviar la lletra s'obté la victoria
    checkVictoria()

}

//actualitzar millors puntuacions depenent qui guanya
function finalPartida(){

    if(tornJugador1){
        bestScore=millorPuntuacio.innerText
        if(score>bestScore){
            millorPuntuacio.innerText=score
        }
    }else{
        bestScore2=millorPuntuacio2.innerText
        if(score2>bestScore2){
            millorPuntuacio2.innerText=score2
        }
    }
}

//resetejar variables necessàries epr la nova partida
function resetPartida(){
    //reset score
    score=0
    multi=1
    score2=0
    multi2=1
    //reset intents
    intents=0
    //reset de caselles per poder introduir la nova paraula
    caselles=[]
    //canviar puntuacio a 0
    puntuacio.innerText=score
    puntuacio2.innerText=score2
    //tornar al color original
    capsaTitol.style.backgroundColor= "#000000"
    //tornar a la imatge 0
    imatgeObj.src= "img/penjat_0.jpg";

    //donar torn al jugador 1
    tornJugador1=true
}

// crear botons automàticament
function crearBotons(){
    for(let i=1;i<letras.length+1;i++){
        const boto = document.createElement("button");
        boto.textContent=letras[i-1]
        boto.id="boto_"+[i]
        boto.className="botoLLetra"
        boto.addEventListener("click", function() {
            jugaLletra(boto); 
        });
        capsaLletres.appendChild(boto)
    }
}


//canvi a jugador 2
function canviTorn2(){
    tornJugador1=false
    estadistiques1.style.backgroundColor ="#FF0000" 
    estadistiques2.style.backgroundColor = "#5fcf87"
    multi=1
}

//canvi a jugador 1
function canviTorn1(){
    tornJugador1=true
    estadistiques2.style.backgroundColor ="#FF0000" 
    estadistiques1.style.backgroundColor = "#5fcf87"
    multi2=1
}


function checkVictoria(){

    //convertir l'array caselles a string en minuscules
    let titolMinus = caselles.join("").toLowerCase()
    let paraula = paraulaSecreta.join("")

    //Comparar paraulaSecreta amb les caselles

    //VICTORIA si coincideixen depenent del torn
    if(titolMinus==paraula){

        //colors de victoria
        capsaTitol.style.backgroundColor="#5fcf87"
        titolObj.style.color="#000000"
        //Poder escriure nova paraula i començar nova partida
        buttonObj.disabled=false;
        inpuObj.disabled=false;
        inpuObj.value="";

        //victoria del jugador 1 i actualitzar les seves dades
        if(tornJugador1){
            setTimeout(function() {
                alert("Ha guanyat el Jugador 1! Introdueix nova paraula.")
            }, 500)
            finalPartida() 
            wins++
            guanyades.innerText=wins
        
        //victoria del jugador 2 i actualitzar les seves dades
        }else{
            setTimeout(function() {
                alert("Ha guanyat el Jugador 2! Introdueix nova paraula.")
            }, 500)
            finalPartida() 
            wins2++
            guanyades2.innerText=wins2
        }

        //incrementar les partides jugades del dos jugadors
        partidesTotals.innerText=(totalPartides=totalPartides+1)
        partidesTotals2.innerText=(totalPartides2=totalPartides2+1)
    }
}