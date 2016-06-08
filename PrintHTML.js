function PrintHTML(){
    this._queue = [];
}

PrintHTML.prototype.printInvoice = function(){
    var queue = this._queue,
        newWins = [];
    for(var i = 0; i < queue.length; i++){
        
        if(queue[i] === undefined) continue;
        
        newWins[i] = window.open(window.location, "Print Invoice - " + i, "width=0,height=0");
        newWins[i].onload = (function(j){
            return function(){
                var newDoc = newWins[j].document,
                    newBody = newDoc.body;   
                newBody.innerHTML = queue[j].outerHTML;
                newWins[j].print();
                newWins[j].close();
            };
        })(i);
    }
};
PrintHTML.prototype.addDoc = function(elem){
    this._queue.push(elem);
    return (this._queue.length - 1);
};
PrintHTML.prototype.delDoc = function(id){
    return (delete this._queue[id]);
};
PrintHTML.prototype.getDoc = function(id){
    return this._queue[id];
};

PrintHTML.prototype.setBtn = function(elem){
   var self = this; 
   elem.addEventListener('click', function(event){
       event.preventDefault();
       self.printInvoice();
   });
};