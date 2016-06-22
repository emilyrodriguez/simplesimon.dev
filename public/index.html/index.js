(function () {
	'use strict';
		var colorSequence = [];
		var userInput = [];
		var theme = $('#start').on('click', function() {
    			$('#theme').get(0).play();
    			startGame();
		});
		var round;
		var active;
		var allowUserInput = false;
	
		function randomNumber() {
			return Math.floor(Math.random()* 4)+1;
		}

		function startGame() {
			colorSequence = [];
			userInput = [];
			round = 0;
			active = true;
			$('p[data-action="lose"]').hide();
			$('#start').on('click', function () {
				$('#container').get(0).play();
			})
			newRound();
		}

		function newRound() {
			$('[data-round]').text(++round);
			colorSequence.push(randomNumber());
			animate(colorSequence);
		}	

		function registerClick(e) {
			var desiredResponse = copy.shift();
			var actualResponse = $(e.target).data('value');
			active = (desiredResponse === actualResponse);
			checkLoss();
		}

		function checkLoss() {
			if (copy.length === 0 && active) {
				deactivateSimon();
				newRound();
			} else if (!active) {
				deactivateSimon();
				gameOver();
				alert("Game Over.");
			}
		}

		function animate(colorSequence) {
			colorSequence.forEach(function(boxes, index) {
				setTimeout(function() {
					 $('[data-value=' + boxes + ']').animate({
						 'opacity': '.2'
					 }, 1000). animate({
						 'opacity': '1'
					 }, 1000 * index)
					})
			 	});	
		}

		function gameOver() {
			$('p[data-action=lose]').show();
			$($('[data-round]').get(0)).text('0');
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
})();