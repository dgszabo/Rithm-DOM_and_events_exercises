document.addEventListener("DOMContentLoaded", function(){
	var submitButton = document.getElementById('submit-button');
	var todos = document.getElementById('todos');

	submitButton.addEventListener('click', function() {
		var inputTodo = document.getElementById('todo-text').value;
		// console.log(inputTodo);
		document.getElementById('todo-form').reset();

		// create the list item and add it to the page
		createTodoItem(inputTodo);

		// add the text to the storage
		localStorage.setItem(inputTodo, false);

		// add event listener function to completed and delete button
		addComplete();
		addDelete();
	});

	function createTodoItem(text) {
		// create the div that will contain the todo
		var div = document.createElement('div');
		div.classList.add('todo-item')

		// create the span for the todo text + add text + append to div
		var span = document.createElement('span');
		span.innerText = text;
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
	}

	// function to add the complete event listeners to all list items
	function addComplete() {
		var completedButtons = document.getElementsByClassName('completed');
		
		for(var i = 0; i < completedButtons.length; i++) {
			completedButtons[i].addEventListener('click', function(event) {
				var textInTodo = event.target.previousElementSibling;
				textInTodo.classList.add('line-through');

				// this part adds info about whether the todo is completed
				var textValueInTodo = event.target.previousElementSibling.innerText;
				localStorage.setItem(textValueInTodo, true);
			})
		}	
	}

	// function to add the delete event listeners to all list items
	function addDelete() {
		var deleteButtons = document.getElementsByClassName('delete');

		for(var i = 0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', function(event) {
				var thisTodo = event.target.parentElement;
				todos.removeChild(thisTodo);

				// this part deletes the todo from  regular storage
				var textValueInTodo = event.target.parentElement.firstElementChild.innerText;
				localStorage.removeItem(textValueInTodo);

				// this part adds the deleted todos to a special storage
				storeDeletedTodos(textValueInTodo);
			});
		}	
	}

	function reRenderStored() {
		for (var i = 0; i < localStorage.length; i++) {
    		if(localStorage.key(i) !== 'deletedTodos') {
    			createTodoItem(localStorage.key(i));
    		}

    		// add back completed class to items that are completed
    		if(localStorage[localStorage.key(i)] === 'true') {
    			var lastItem = document.getElementById('todos').lastChild.firstElementChild;
    				lastItem.classList.add('line-through');
    		}
  		}
	}

	function createDeletedTodoStorage() {
		if(localStorage.deletedTodos === undefined) {
			localStorage.deletedTodos = '[]';
		}
	}

	function storeDeletedTodos(text) {
		var deletedStorageArray = JSON.parse(localStorage.deletedTodos);
		deletedStorageArray.push(text);

		var stringifiedDeletedStorageArray = JSON.stringify(deletedStorageArray);
		localStorage.setItem('deletedTodos', stringifiedDeletedStorageArray);
	}
	
	// create deleted todo storage
	createDeletedTodoStorage();

	// call the re-render function to add the todos from local storage
	reRenderStored();

	// call the complete and delete functions to add the listeners initially
	addComplete();
	addDelete();
});