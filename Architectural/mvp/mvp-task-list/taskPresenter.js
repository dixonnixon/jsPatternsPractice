function TaskPresenter(_view){

	var view;
	var model;

	function init(){
		view = _view;
		view.addCheckedHandler(function(){
			view.remove();
		});
	}

	var public = {
		getView: function(){
			return view;
		},
		setModel: function(_model){
			model = _model;
			view.setModel(model);
		}
	}

	init();
	return public;
}