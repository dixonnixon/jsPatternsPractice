function TaskView(){

	var html;

	function init(){
		html = $("<li><input type='checkbox'/><label></label></li>");
	}

	var public = {
		getHtml: function() {
			return html;
		},
		setModel: function(model){
			html.find("input").attr("id", model.getID());
			html.find("label").attr("for", model.getID());
			html.find("label").html(model.getText());
		},
		addCheckedHandler: function(handler) {
			html.find("input").click(handler);
		},
		remove: function(){
			html.remove();
		}
	}

	init();
	return public;
}