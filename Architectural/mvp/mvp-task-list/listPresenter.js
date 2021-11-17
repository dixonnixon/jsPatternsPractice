function ListPresenter(_view){

	var view;
	var model;

	function init(){
		view = _view;
		
		view.addCreateTaskHandler(function(taskTitle){
			var model 	= new TaskModel(taskTitle);
			var task 	= new TaskPresenter(new TaskView());
			task.setModel(model);
			view.addTask(task.getView());
		});
		
	}

	var public = {
		getView: function(){
			return view;
		}
	}

	init();
	return public;
}