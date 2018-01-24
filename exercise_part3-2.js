document.addEventListener("DOMContentLoaded", function(){
	var submitButton = document.getElementById('submit-button');
	var todos = document.getElementById('todos');

	submitButton.addEventListener('click', function() {
		var inputTodo = document.getElementById('todo-text').value;
		// console.log(inputTodo);
		document.getElementById('todo-form').reset();

		// create the div that will contain the todo
		var div = document.createElement('div');
		div.classList.add('todo-item')

		// create the span for the todo text + add text + append to div
		var span = document.createElement('span');
		span.innerText = inputTodo;
		div.append(span);

		// create and add the completed button
		var completedButton = document.createElement('button');
		completedButton.classList.add('completed');
		completedButton.classList.add('fa');
		completedButton.classList.add('fa-check');
		div.append(completedButton);

		// create and add the delete button
		var deleteButton = document.createElement('button');
		deleteButton.classList.add('delete');
		deleteButton.classList.add('fa');
		deleteButton.classList.add('fa-times');
		div.append(deleteButton);

		// append the whole div to the todos div
		todos.append(div);

		// add event listener function to delete button
		addComplete();
		addDelete();
	});

	// function to add the complete event listeners to all list items
	function addComplete() {
		var completedButtons = document.getElementsByClassName('completed');
		
		for(var i = 0; i < completedButtons.length; i++) {
			completedButtons[i].addEventListener('click', function(event) {
				// alert(event.target.previousElementSibling);
				var textInTodo = event.target.previousElementSibling;
				textInTodo.classList.add('line-through');
			})
		}	
	}

	// function to add the delete event listeners to all list items
	function addDelete() {
		var deleteButtons = document.getElementsByClassName('delete');

		for(var i = 0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', function(event) {
				// alert(event.target.parentElement);
				var thisTodo = event.target.parentElement;
				todos.removeChild(thisTodo);
			});
		}	
	}
	
	// call the complete and delete functions to add the listeners initially
	addComplete();
	addDelete();
});