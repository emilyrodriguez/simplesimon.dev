(function () {
	'use strict';
		var colorSequence = [];
		var userInput = [];
		var theme = $('#start').on('click', function() {
    			var audio = $('#theme').get(0);
				//audio.loop = false;
    			audio.play();
    			startGame();
		});
		var level;
		var allowUserInput = false;
		function randomNumber() {
			return Math.floor(Math.random()* 4)+1;
		}

		function startGame() {
			colorSequence = [];
			userInput = [];
			level = 0;
			newLevel();
		}
		setTimeout(function() {
			allowUserInput=true;
		}, 1010 * colorSequence.length);
		$('[data-value]').click(function(){
			if(allowUserInput) {
				$(this).animate({
					'opacity': '.2'
				}, 200).animate({
					'opacity': '1'
				}, 200);
			}
		});

		function newLevel() {
			level++;
			 $('#level').text(level);
				 colorSequence.push(randomNumber());
				 animate(colorSequence);
		}	

		$('.box').click(function checkLoss(event) {
			userInput.push($(this).data('value'));
			if (colorSequence.slice(0, userInput.length).join() === userInput.join()) {
				if (colorSequence.length == userInput.length) {
					userInput = [];
					newLevel();
				}
			} else {
				level = 0;
				$('#level').text(1);
				var audio = $('#theme').get(0);
    			audio.pause()
    			audio = $('#gameover').get(0);
    			audio.loop = false;
    			audio.play();
				alert("Game over!");
			}
		});

		function animate(colorSequence) {
			var boxes = 0;
			var inteverlId = setInterval(function() {
				console.log( $('[data-value=' + (boxes + 1) + ']').length)
				 $('[data-value=' + colorSequence[boxes] + ']').animate({
					 'opacity': '.2'
				 }, 500).animate({
					 'opacity': '1'
				 }, 500);
				boxes++;
				if (boxes == colorSequence.length){
					clearInterval(inteverlId);
				}
			}, 1000);
		}
})();