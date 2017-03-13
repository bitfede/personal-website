$( document ).ready(function() {
	//-----
	//FUNCTIONS
	//-----
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	//-----
	//EXECUTION
	//-----

	//define circles
  var circles = ['eng', 'dev', 'exphys', 'team', 'fast', 'pset'];
  //randomize ;)
	circles = shuffleArray(circles);
  //animate in!
  $( "#welcome" ).fadeTo( 500, '1' , function() {
    $( "#fede" ).fadeTo( 300, '1' ,function() {
  		$("#" + circles[0]).fadeTo(350, '1', function() {
	  		$("#" + circles[1]).fadeTo(350, '1', function() {
		  		$("#" + circles[2]).fadeTo(350, '1', function() {
			  		$("#" + circles[3]).fadeTo(350, '1', function() {
			  			$("#" + circles[4]).fadeTo(350, '1', function() {
				  			$("#" + circles[5]).fadeTo(350, '1', function() {
						  			Materialize.showStaggeredList(".menulist");
					  		});
				  		});
			  		});
		  		});
	  		});
  		});
	  });
  });

   
	//side nav
  $("#about").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: false // Choose whether you can drag to open on touch screens
    });

  //bottom sheet modal
  $('.modal').modal();

  //tooltips
  $('.socialicon').tooltip({delay: 50});


});