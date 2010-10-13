$(function(){
	console.log("Running leiaut.js")
	
	$('#nav').css({'width': '100%', 'height': '35px'});
	$('#tools').css({'width': '240px', 'height': '480px'});
	$('#map').css({'width': '150px', 'height': '100px'});
	$('#deck').css({'width': '400px', 'height': '50px'});
	$('#game_board').css({'width': '800px', 'height': '600px'});
	$('.tape').css({'width': '50px', 'height': '50px'});
	
	
	//ToDo: Load image and create game_board
	
	var game_boardW = $('#game_board').width();
	var game_boardH = $('#game_board').height();
	var tapeW = $('.tape').width();
	var tapeH = $('.tape').height();
	
	//Bind slider
	$('#slider').slider({
		value: 1,
		min: 0.5,
		max: 3,
		step: 0.05,
		slide: function(event, ui) {
			$('#game_board').width((game_boardW-tapeW)* ui.value);
			$('#game_board').height((game_boardH-tapeH)* ui.value);
			updateLayout();
			drawImageInCanvas();
		}
	});
	
	//Update general layout positioning	
	updateLayout();
	drawImageInCanvas();
	
	
	$(window).resize(function(){
		updateLayout();
	})

})

var update = true;

var updateLayout = function(){
	
	mainW = $(window).width();
	mainH = $(window).height();
	
	if(mainW > 720 && mainH > 200 || update == true){
		
		update = false;
		//Map repositioning
		mapX = mainW - $('#map').width() - 20;
		mapY = $('#nav').height() + 20;
		$('#map').css({'left': mapX + 'px', 'top': mapY + 'px'});
		
		//Deck repositioning
		deckX = mainW - $('#deck').width() - 20;
		deckY = mainH - $('#deck').height() - 20;
		$('#deck').css({'left': deckX + 'px', 'top': deckY + 'px'});
		
		//Tools repositioning
		toolsX = 20;
		toolsY = $('#nav').height() + 20;
		$('#tools').css({'left': toolsX + 'px', 'top': toolsY + 'px'});		
	}

	updateGameBoard();
	
}

var updateGameBoard = function(){
	//Game Board repositioning
	game_boardX = (mainW + $('#tools').width() + 20 - $('#game_board').width())/2;
	game_boardY = (mainH + $('#nav').height() - $('#game_board').height())/2;
	$('#game_board').css({'left': game_boardX + 'px', 'top': game_boardY + 'px'});
	
	//Tape repositioning
	//NW
	tape_nwX = game_boardX - ($('#tape_nw').width()/2);
	tape_nwY = game_boardY - ($('#tape_nw').height()/2);
	$('#tape_nw').css({'left': tape_nwX + 'px','top': tape_nwY + 'px'});
	
	//NE
	tape_neX = game_boardX + $('#game_board').width() - ($('#tape_ne').width()/2);
	tape_neY = game_boardY - ($('#tape_ne').height()/2);
	$('#tape_ne').css({'left': tape_neX + 'px','top': tape_neY + 'px'});
	
	//SW
	tape_swX = game_boardX - ($('#tape_sw').width()/2);
	tape_swY = game_boardY - ($('#tape_sw').height()/2) + $('#game_board').height();
	$('#tape_sw').css({'left': tape_swX + 'px','top': tape_swY + 'px'});
	
	//SE
	tape_seX = game_boardX - ($('#tape_se').width()/2) + $('#game_board').width();
	tape_seY = game_boardY - ($('#tape_se').height()/2) + $('#game_board').height();
	$('#tape_se').css({'left': tape_seX + 'px','top': tape_seY + 'px'});
}

var drawImageInCanvas = function(){
	
	var w = $(game_board).width();
	var h = $(game_board).height();
	var canvas = $('#myCanvas').get(0);

	canvas.width = w; 				
	canvas.height = h; 

	var context = canvas.getContext('2d');

	img = new Image();				
	img.onload = function(){									
		context.drawImage(this,0,0,w,h);
	};
	img.src='/images/beauty.jpg';
	
}