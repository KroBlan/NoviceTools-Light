//dnd.js

//système de drag & drop pour le séquenceur







//init
window.addEventListener('load', function () {
    
  var id_ = 'librarySamples_1';//id du parent
  //
  //on récupère tous les boutons draggable dans le parent
  var buts_ = document.querySelectorAll('#' + id_ + ' .draggable');
  var dragSrcEl_ = null;
  
  var d_id_ = 'launchpad';
  //on récupère tous les boutons draggable dans le parent
  var d_buts_ = document.querySelectorAll('#' + d_id_ + ' .dropper');
  
  

// Using this polyfill for safety.
Element.prototype.hasClassName = function(name) {
  return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(name) {
  if (!this.hasClassName(name)) {
    this.className = this.className ? [this.className, name].join(' ') : name;
  }
};

Element.prototype.removeClassName = function(name) {
  if (this.hasClassName(name)) {
    var c = this.className;
    this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
  }
};


  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    dragSrcEl_ = this;

    // this/e.target is the source node.
    this.addClassName('moving');
  };

  this.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  };

  this.handleDragEnter = function(e) {
    this.addClassName('over');
        console.log('enter');
  };

  this.handleDragLeave = function(e) {
    // this/e.target is previous target element.
    this.removeClassName('over');
        console.log('leave');
  };

//dropped !
  this.handleDrop = function(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Ne fait rien si on lache sur le même bouton
//    if (dragSrcEl_ !== this) {
//      dragSrcEl_.innerHTML = this.innerHTML;
//      this.innerHTML = e.dataTransfer.getData('text/html');

      // Set number of times the column has been moved.
//      var count = this.querySelector('.count');
//      var newCount = parseInt(count.getAttribute('data-col-moves')) + 1;
//      count.setAttribute('data-col-moves', newCount);
//      count.textContent = 'moves: ' + newCount;
//    }
            console.log("dropped !" + this.key);

    return false;
  };

  this.handleDragEnd = function(e) {
    // this/e.target is the source node.
    [].forEach.call(buts_, function (col) {
      col.removeClassName('over');
      col.removeClassName('moving');
    });
  };

  [].forEach.call(buts_, function (col) {
    col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
    col.addEventListener('dragstart', this.handleDragStart, false);
    //col.addEventListener('dragenter', this.handleDragEnter, false);
    //col.addEventListener('dragover', this.handleDragOver, false);
    //col.addEventListener('dragleave', this.handleDragLeave, false);
    //col.addEventListener('drop', this.handleDrop, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
  });
  
  
  [].forEach.call(d_buts_, function (col) {
    //col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
    //col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragenter', this.handleDragEnter, false);
    col.addEventListener('dragover', this.handleDragOver, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
    col.addEventListener('drop', this.handleDrop, false);
    //col.addEventListener('dragend', this.handleDragEnd, false);
  });

});