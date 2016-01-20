function partie(id){
	this.id = id;
	this.black = null;
	this.red = null
	this.viewers_list = [];
}

partie.prototype.getStr = function(){
	console.log(this.id);
};

module.exports = partie;