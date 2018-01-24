document.addEventListener("DOMContentLoaded", function(){
	// Part 1 - 2.
	var h1 = document.getElementById('change_heading');
	h1.innerHTML = 'Hello World!';

	// Part 1 - 3.
	var section = document.querySelector('section');
	var selected = document.querySelector('.selected');

	section.addEventListener('mouseover', function(event) {
		// console.log('something happend!')
		selected.innerText = event.target.className;
	});

	// Part 1 - 4-6.
	var newDiv = document.createElement('div');
	newDiv.classList.add('purple');
	
	section.append(newDiv);
});

// Part 2
document.addEventListener('DOMContentLoaded', function() {
	var car1 = document.querySelector('.car1');
	var car2 = document.querySelector('.car2');
	var start = document.querySelector('button');

	start.addEventListener('click', function() {
		var car1Speed = Math.random() * 5;
		var car1Pos = 0;
		var car2Speed = Math.random() * 5;
		var car2Pos = 0;
		
		// this function moves and re-renders the cars
		function move() {	
				car1Pos += car1Speed;
				car1.style.marginLeft = car1Pos.toString() + '%';
				car2Pos += car2Speed;
				car2.style.marginLeft = car2Pos.toString() + '%';
		}

		// this function creates the illusion that the cars are moving
		// it needs to be recursive, otherwise the Timeout method
		// does not function :-( )
		function render() {
			if(car1Pos >= 96 || car2Pos >= 96) {
				alert('winner');
				 
			} else {
				setTimeout(move, 1000);
				setTimeout(render, 1000);
			}
		}

		render();

	});
});