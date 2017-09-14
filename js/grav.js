var posx = 100; //Anger x positionen på fyrkanten
var posy = 100; //Anger y positionen på fyrkanten
var deltax = 0; //Förändringar av position i x-ledd
var deltay = 0; //Förändringar av position i y-led.
var ground = 400; //Maximiumvärde för position i y-led.
var width =100;   // KOmmentarer
var height = 100;  //( KOmmentarer)
var pickup = false;

function init() { //Funktion som kallas på när sidan laddats och kan kallas på för att starta om allting.
  canvas = document.getElementById('rityta'); //Lagrar elementet med id:t rityta i en variabel.
  context = canvas.getContext('2d'); //Hämtar ett objekt från canvas som man kan utföra ritoperationer med.

  gameInterval = setInterval(function (){ //Deklarerar en variabel som kan ersättas med null för att avbryta iterationen.
    if(!pickup){
      deltay++; // Gravitation
      deltay*=0.99; //Tröghetsfaktor
      posy+=deltay; //Lägger på hastigheten i y led

      if (posy > ground) { //Avgör om kvadraten är under marken. Om så är fallet:
        posy=ground; //Korrigerar kvadratens y-position.
        deltay*=-1; //Inverterar hastigheten i y-led. 
      }

      deltax*=0.75; //lägger xleds friktion på kvadraten.
      posx+=deltax; //Adderar förändringar av position i x-led.

      if (Math.abs(deltay)<0.001) { //Om positionsförändringarna är för små sätts dem till noll.
        deltay=0;
      }
      if (Math.abs(deltax)<0.001) { //Om positionsförändringarna är för små sätts dem till noll.
        deltax=0;
      }
    }
    context.clearRect(0,0,600,500); //Tömmer ritytan
    context.fillStyle="red"; //Anger färgen för nästa fyllningsoperation.
    context.fillRect(posx,posy,100,100); //Ritar en rektangel vid (posx,posy) med bredd och höjd 100.
  },20); //Intervallet, hur ofta funtionen kallas på.
}

window.addEventListener("keydown",function(e){ //Lägger till en händelselyssnare till fönstret.
  e = window.event; //Gör inget vad det varkar som.
  var charcode = e.keyCode;  //Hämter värdet på nedtryckt tangent.
  //console.log(charcode); Skriver ut värdet på denn nedtryckta tangenten i konsollen.
  if(charcode==37){ //Om den nedtryckta tangenten är vänster piltangent:
    deltax-=2; //Accelerera åt vännster.
  }
  if (charcode==39) { //Om den nedtrycka tangenten är höger piltangent:
    deltax+=2; //Accelerera åt höger.
  }
});

window.addEventListener("mouseup",function(e){
  e=window.event;
  var mousex=e.clientX;
  var mousey=e.clientY;
  if(mousex>posx&&mousex<(posx+width))
  if(mousey>posy&&mousey<(posy+width)){
    pickup= false;
  }
});

window.addEventListener("mousemove",function(e){
  if(pickup){
    posx=e.clientX-width/2;
    posy=e.clientY-height/2;
  }
});

window.addEventListener("mousedown",function(e){
  e=window.event;
  var mousex=e.clientX;
  var mousey=e.clientY;
  if(mousex>posx&&mousex<(posx+width))
  if(mousey>posy&&mousey<(posy+width)){
    pickup= true;
  }

});