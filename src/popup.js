
function getTasks(){
	task = document.getElementById('task').value;
	var tasks = new Array();
	if(localStorage.tasks){
		tasks = JSON.parse(localStorage.tasks);
	} 
	tasks.push(task);
	localStorage.tasks = JSON.stringify(tasks);	
	refreshTasks();
}

function refreshTasks(){
	taskList = document.getElementById('taskList');
	var html = '';
	if(localStorage.tasks) {
	tasks = JSON.parse(localStorage.tasks);
	for(var i = 0; i < tasks.length; i++) {
		html += '<li class="taskItem" data-index=' + i + '>' + tasks[i] + '</li>';
	}
	taskList.innerHTML = html;
	}
}

function deleteTask(index) {
	tasks = JSON.parse(localStorage.tasks);
	tasks.splice(index,1);
	localStorage.tasks = JSON.stringify(tasks);	
	refreshTasks();
}

$(document).ready(function() {
	refreshTasks();
	$('.submitButton').on('click', function() {getTasks();});
	$('#taskList').on('click', '.taskItem', function() {
		var index = $(this).data('index');
		deleteTask(index);
	});
});

