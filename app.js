var audio = new Audio('./assets/Evil_Laugh.wav');
var warning = new Audio('./assets/warning.wav');
var winner = new Audio('./assets/winner.wav');
var holding = new Audio('./assets/notification.mp3');

var dares;
var puntajeDeRonda = 0;
var dado1, dado2;
var jugadorActivo = 0;
var puntajeGeneral;
var keyState;
var newGame;
var limits;
var count_shots;
inicia();
function inicia(){
  newGame = true;
  keyState = false;
  puntajeDeRonda = 0;
  jugadorActivo = 0;
  puntajeGeneral = [0,0];
  limits = [25,25];
  count_shots = [1,1];
	document.querySelector('#score-0').textContent = 0;
	document.querySelector('#score-1').textContent = 0;
	document.querySelector('#current-0').innerText = 0;
	document.querySelector('#current-1').innerText = 0;
  document.querySelector('.wrapper').style.display = "none";
  document.querySelector('.dares_list').style.display='block';
  document.querySelector('.team-0-panel').classList.remove('winner');
  document.querySelector('#name-0' ).textContent = 'Team 1';
  document.querySelector('.team-1-panel').classList.remove('winner');
  document.querySelector('#name-1' ).textContent = 'Team 2';
  document.querySelector('.team-0-panel').classList.add('active');
  document.querySelector('.team-1-panel').classList.remove('active');
}

document.querySelector('.btn-submit').addEventListener('click',function(){
  newGame = false;
   document.querySelector('.wrapper').style.display = 'block';
   document.querySelector('.dares_list').style.display='none';
   dares = ["prepara un shot y daselo a quien quieras","team shot"];
   var all_dares = document.getElementsByClassName("dare-input");

   Object.values(all_dares).map(function(key, index) {
   dares.push(key.value);
});


});

sortDares = () => {
   dares.sort(function(a, b) {
    return 0.5 - Math.random()
  })
}

roolling =()=>{
  dado1 = Math.floor(Math.random()  * 6) + 1;
  dado2 = Math.floor(Math.random()  * 6) + 1;

  var diceDom1 = document.querySelector('.dice1');
  var diceDom2 = document.querySelector('.dice2');
  diceDom1.src = 'dice-' + dado1 + '.png';
  diceDom2.src = 'dice-' + dado2 + '.png';

  setTimeout(function(){ bePunished(dado1+dado2); }, 1200);
  if(dado1 + dado2 != 2){
    puntajeDeRonda += (dado1 + dado2);
    document.getElementById('current-' +jugadorActivo).innerText  = puntajeDeRonda;

  }else{
    warning.play();
    document.getElementById('current-' +jugadorActivo).innerText  = 0;
    document.querySelector('#score-' + jugadorActivo).textContent = 0;
    limits[jugadorActivo] = 25;
    puntajeGeneral[jugadorActivo] = 0;
    siguiente();
  }
}

document.querySelector('.btn-roll').addEventListener('click',function(){
     keyState = true;
     roolling();
});

document.addEventListener('keydown', function(event){
  if(event.keyCode == '32' && !newGame){
    if(keyState == false){
      roolling();
    }else{
      var modal = document.getElementById('myModal');
      modal.style.display = "none";
    }

    keyState = !keyState;

  }
});

	function siguiente(){
		puntajeDeRonda = 0;
		document.querySelector('#current-'+jugadorActivo).innerText = 0;
		jugadorActivo === 0 ? jugadorActivo = 1 : jugadorActivo = 0;
		document.querySelector('.team-0-panel').classList.toggle('active');
		document.querySelector('.team-1-panel').classList.toggle('active');
	}

hold = () => {
  puntajeGeneral[jugadorActivo] += puntajeDeRonda;
  holding.play();
	document.querySelector('#score-' + jugadorActivo).textContent = puntajeGeneral[jugadorActivo];
	if(puntajeGeneral[jugadorActivo] >= 100){
		document.querySelector('#name-'+jugadorActivo ).textContent = 'Winner!'
		document.querySelector('.team-' + jugadorActivo +'-panel').classList.add('winner')
    winner.play();

	}else if(puntajeGeneral[jugadorActivo] >= limits[jugadorActivo]){
    limits[jugadorActivo] +=25;
    var team;
    jugadorActivo == 0 ? team = 2 : team = 1;

    document.querySelector('.label-modal-shots').textContent = 'TEAM '+team+' - SHOTS '+count_shots[jugadorActivo];
    warning.play();
    count_shots[jugadorActivo] += 1;
    document.querySelector('#id01').style.display='block';
    siguiente();
  }else{
	siguiente();
	}
}

document.querySelector('.btn-hold').addEventListener('click',function(){
	hold();
})

document.addEventListener('keydown',  function(event){
  if(event.keyCode == '13'){
    hold();
  }
});

document.querySelector('.btn-new').addEventListener('click', function(){
   inicia();
})


bePunished = point =>{
  document.getElementById("getpunish").innerHTML = dares[point-1];

  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";
  document.querySelector('.btn-roll').blur();
  audio.play();

  span.onclick = function() {
      modal.style.display = "none";
      document.focus();
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          //document.focus();
      }
  }
}
