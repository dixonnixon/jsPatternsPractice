function TaskModel(_text){
	var ID = (new Date()).getTime()
	this.getID = function(){
		return ID;
	}
	
    var Text = _text;
    this.getText = function(){
        return Text;
    }
    this.setText = function(value){
        Text = value;
    }
}
