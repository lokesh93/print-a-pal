<script>
		$(document).ready(function() {
			context = document.getElementById('canvas').getContext("2d");
			var clickX = new Array(); // click position X stored in the array for pencil
			var circleClickX = new Array(); // click position X stored in the array for circles
			var clickY = new Array(); // click position Y stored in the array for pencil
			var circleClickY = new Array(); // click position Y stored in the array for circles
			var clickDrag = new Array(); // this is used to draw a line between mouse postions movements a bool array
			var squareClickX = new Array();
			var squareClickY = new Array();
			var squareWidth = new Array();
			var squareHeight = new Array();
			var paint = false; // boolean for when to draw and when not to draw
			var draw_pencil = false; // boolean for when the pencil tool is on or off
			var draw_circle = false; // boolean for when the circle tool is on or off
			var draw_line = false; // boolean for when the line tool is on or off
			var draw_square = false; // boolean for when the square tool is on or off
			var radius = new Array();
			var lineClickX = new Array();
			var lineClickY = new Array();


			// event handler for when pencil button is pushed
			$(".pencil-button").click(function() {
				draw_circle = false; // turn all other buttons
				draw_square = false;
				draw_line = false;
				// if pencil is on then turn it off and change colour
				if (draw_pencil){
					draw_pencil = false; 
					$(".pencil-button").css("color","black");
				} 
				// if pencil is off then turn it on and change colour
				else {

					draw_pencil = true;
					$(".pencil-button").css("color","blue");
				}
				

			});

			// event handler for when circle button is pushed
			$(".circle-button").click(function() {
				// turn all other buttons
				draw_pencil = false;
				draw_square = false;
				draw_line = false;
				// if pencil is off then turn it on and change colour
				if (draw_circle){
					draw_circle = false;
					$(".circle-button").css("color","black");
				}
				// if circle is off then turn it on and change colour
				 else {
					draw_circle = true;
					$(".circle-button").css("color","blue");
				}
				

			});

			// event handler for when line button is pushed
			$(".line-button").click(function() {
				// turn all other buttons
				draw_pencil = false;
				draw_circle = false;
				draw_square = false;
				// if line is off then turn it on and change colour
				if (draw_line){
					draw_line = false;
					$(".line-button").css("color","black");
				}
				// if line is off then turn it on and change colour
				 else {
					draw_line = true;
					$(".line-button").css("color","blue");
				}
				

			});

			// event handler for when line button is pushed
			$(".square-button").click(function() {
				// turn all other buttons
				draw_pencil = false;
				draw_circle = false;
				draw_line = false;
				// if line is off then turn it on and change colour
				if (draw_square){
					draw_square = false;
					$(".square-button").css("color","black");
				}
				// if square is off then turn it on and change colour
				 else {
					draw_square = true;
					$(".square-button").css("color","blue");
				}
				

			});




			// event handle for when the mouse is pressed
			$('#canvas').mousedown(function(e){
				// get the current mouse coords
			  var mouseX = e.pageX - this.offsetLeft;
			  var mouseY = e.pageY - this.offsetTop;
				
			  paint = true;
			  // if the pencil tool is on then record the click and go to draw function for pencil
			  if (draw_pencil){
			  	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, draw_pencil);
			  	redraw(draw_pencil, draw_circle);
			  }
			  // if the circle tool is on then record the click and go to draw function for circle
			  if (draw_circle){
			  	//addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, draw_circle);
			  	addClickCircle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  	// redraw(draw_pencil, draw_circle);
			  	redrawNewCircle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  }
			  // if the line tool is on then record the click and go to draw function for circle
			  if (draw_line){
			  	//addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, draw_circle);
			  	addClickLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  	// redraw(draw_pencil, draw_circle);
			  	drawNewLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  }

			  // if the square tool is on then record the click and go to draw function for square
			  if (draw_square){
			  	//addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, draw_circle);
			  	addClickSquare(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  	// redraw(draw_pencil, draw_circle);
			  	drawNewSquare(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  }

			});

			
			// event handler for when the mouse moves
			$('#canvas').mousemove(function(e){
			// record the click with dragging turned on and go to draw draw function for pencil
			  if(paint && draw_pencil){
			    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, draw_pencil ,true);
			    redraw(draw_pencil, draw_circle);

			  }
			 // go to draw circle function
			  if (paint && draw_circle) {
			  	redrawNewCircle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  }

			  // go to draw circle function
			  if (paint && draw_line) {
			  	drawNewLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  }

			  // go to draw circle function
			  if (paint && draw_square) {
			  	drawNewSquare(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)
			  }

			});

			// event handler when the mouse button is released and turns off drawing
			$('#canvas').mouseup(function(e){
			  paint = false;
			  var mouseX = e.pageX - this.offsetLeft;
			  var mouseY = e.pageY - this.offsetTop;
			  var lengthofArr = circleClickX.length;
			  if (draw_circle){
			  	var lengthofArr = circleClickX.length;
			  	rad = Math.sqrt(Math.pow((circleClickX[lengthofArr - 1] - mouseX),2) + Math.pow((circleClickY[lengthofArr - 1] - mouseY),2))
			  	radius.push(rad)
			  }

			  if (draw_line){
			  	lineClickX.push(mouseX);
			  	lineClickY.push(mouseY);
			  }
			  if (draw_square){
			  	var lengthofArr = squareClickX.length;
			  	squareWidth.push(mouseX - squareClickX[lengthofArr - 1])
			  	squareHeight.push(mouseY - squareClickY[lengthofArr - 1])
			  	squareClickY.push(mouseY);
			  }
			  redraw(true);
			});

			// event handler when the mouse leaves the canvas and turns off drawing
			$('#canvas').mouseleave(function(e){
			  paint = false;
			  redraw(true);
			  // draw_circle = false;
			  // draw_pencil = false;
			});


			// records the click in a click X and Y array
			function addClick(x, y, doPaint, dragging)
			{
				if (doPaint && !draw_circle){
					clickX.push(x);
			  		clickY.push(y);
			  		clickDrag.push(dragging);
				}
				if (draw_circle){
					circleClickX.push(x);
					circleClickY.push(y);
				}
			}

			// records the click in a click X and Y array
			function addClickCircle(x, y)
			{
					circleClickX.push(x);
					circleClickY.push(y);
			}

			// records the click in a click X and Y array
			function addClickLine(x, y)
			{
					lineClickX.push(x);
					lineClickY.push(y);
			}

			// records the click in a click X and Y array
			function addClickSquare(x, y)
			{
					squareClickX.push(x);
					squareClickY.push(y);
			}

			// draws the entire drawing depending on the data structure for clicks and their positions and if draggin was turned on
			function redraw(doPaint){
				if (doPaint){

					  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
			  			
			  			// sets the line thickness, shape and color
					  context.strokeStyle = "#ff0000";
					  context.lineJoin = "round";
					  context.lineWidth = 5;
							// iterates through the entire array of clicks and dragging and draws the images	
					  for(var i=0; i < clickX.length; i++) {		
					    context.beginPath();
					    // dragging is turned on then it moves the the 
					    if(clickDrag[i] && i){
					    	// move the beginning of the line to the previous location
					      context.moveTo(clickX[i-1], clickY[i-1]);
					     }else{
					     	// move the beginning of the line current location but one less pixel in the x-direction
					       context.moveTo(clickX[i]-1, clickY[i]);
					     }
					     //draw the line to the current location
					     context.lineTo(clickX[i], clickY[i]);
					     context.closePath();
					     context.stroke();
					  }

					  // iterate through circle data structure and draw
					  for (var j=0; j < circleClickX.length; j++){
					  	redrawCircle(j);
					  }

					  //iterte through line data structures and draw
					  for (k=0;k<lineClickX.length; k=k+2) {
					  	drawLine(k);
					  }

					  //iterte through square data structures and draw
					  for (t=0;t<squareClickX.length; t++) {
					  	drawSquare(t);
					  }

				}

			  
			}

			function redrawNewCircle(curr_pos_x, curr_pos_y){
					redraw(true);
					
					context.strokeStyle = "#ff0000";
					context.lineJoin = "round";
					context.lineWidth = 5;

					var lengthofArr = circleClickX.length;
					radi = Math.sqrt(Math.pow((circleClickX[lengthofArr - 1] - curr_pos_x),2) + Math.pow((circleClickY[lengthofArr - 1] - curr_pos_y),2))

	
					context.beginPath();
					context.arc(circleClickX[lengthofArr - 1],circleClickY[lengthofArr - 1], radi,0,Math.PI*2,true);
					context.closePath();
					context.stroke();

			}

			function drawLine(index_c){
					
					context.strokeStyle = "#ff0000";
					context.lineJoin = "round";
					context.lineWidth = 5;


					context.beginPath();
					context.moveTo(lineClickX[k], lineClickY[k]);
					context.lineTo(lineClickX[k+1], lineClickY[k+1] );
					context.closePath();
					context.stroke();

			}

			function drawNewLine(curr_pos_x, curr_pos_y){
					redraw(true);
					//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
					context.strokeStyle = "#ff0000";
					context.lineJoin = "round";
					context.lineWidth = 5;

					var lengthofArr = lineClickX.length;

					context.beginPath();
					context.moveTo(lineClickX[lengthofArr - 1], lineClickY[lengthofArr - 1]);
					context.lineTo(curr_pos_x, curr_pos_y );
					context.closePath();
					context.stroke();

			}

			function drawSquare(index_c){
					//redraw(true);
					//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
					context.strokeStyle = "#ff0000";
					context.lineJoin = "round";
					context.lineWidth = 5;

					var lengthofArr = squareClickX.length;

					context.beginPath();
					context.rect(squareClickX[index_c],squareClickY[index_c], squareWidth[index_c], squareHeight[index_c]);
					context.closePath();
					context.stroke();

			}

			function drawNewSquare(curr_pos_x, curr_pos_y){
				   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
					redraw(true);
					
					context.strokeStyle = "#ff0000";
					context.lineJoin = "round";
					context.lineWidth = 5;

					var lengthofArr = squareClickX.length;

					context.beginPath();
					context.rect(squareClickX[lengthofArr - 1],squareClickY[lengthofArr - 1], curr_pos_x - squareClickX[lengthofArr - 1], curr_pos_y - squareClickY[lengthofArr - 1]);
					context.closePath();
					context.stroke();

			}

			function redrawCircle(index_c){

					context.strokeStyle = "#ff0000";
					context.lineJoin = "round";
					context.lineWidth = 5;

					var lengthofArr = clickX.length;

					context.beginPath();
					context.arc(circleClickX[index_c],circleClickY[index_c], radius[index_c],0,Math.PI*2,true);
					context.closePath();
					context.stroke();

			}

		});

		</script>