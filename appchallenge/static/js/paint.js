var context;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var colorPurple = "#cb3594";
var curColor = colorPurple;
var clickColor = new Array();

var clickSize = new Array();
var curSize = "normal";
var lineWidth = 5;
var alpha = 1;

var clickTool = new Array();
var curTool = "crayon";
var colorLayerData, outlineLayerData, canvasWidth, canvasHeight, drawingAreaX = 0, drawingAreaY = 0;
var mouseX, mouseY;

$(document).ready(
		function() {
			console.log("begin");
			context = document.getElementById("canvasBlock").getContext(
					"2d");
			canvasWidth = $('#canvasBlock').width();
			canvasHeight = $('#canvasBlock').height();
			console.log("context: " + context);
			colorLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight);
			outlineLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight);

			$('#canvasBlock').mouseleave(function(e) {
				paint = false;
			});

			$('#canvasBlock').mouseup(function(e) {
				paint = false;
			});

			$('#canvasBlock').mousedown(
					function(e) {
						mouseX = e.pageX - this.offsetLeft;
						mouseY = e.pageY - this.offsetTop;
						paint = true;
						addClick(e.pageX - this.offsetLeft, e.pageY
								- this.offsetTop);
						redraw();
					});

			$('#canvasBlock').mousemove(
					function(e) {
						if (paint) {
							addClick(e.pageX - this.offsetLeft, e.pageY
									- this.offsetTop, true);
							redraw();
						}
					});

			$('#clearBtn').click(clearCanvas);

			$('.colorSpan').click(function() {
				curColor = $(this).css('background-color');
				$('.colorSpan').each(function(index, element){
					$(this).removeClass('borderSelected');
				});
				$(this).addClass('borderSelected');
			});

			$('.sizeSpan').click(function() {
				curSize = $(this).text();

				$('.sizeSpan').each(function(index, element){
					$(this).removeClass('borderSelected');
				});
				$(this).addClass('borderSelected');

				switch (curSize) {
				case "small":
					lineWidth = 2;
					break;
				case "normal":
					lineWidth = 5;
					break;
				case "large":
					lineWidth = 10;
					break;
				case "huge":
					lineWidth = 15;
					break;
				default:
					lineWidth = 5;
					break;
				}
				console.log(curSize + " " + lineWidth);
			});

			$('.toolSpan').click(function() {
				curTool = $(this).text();
				
				$('.toolSpan').each(function(index, element){
					$(this).removeClass('borderSelected');
				});
				$(this).addClass('borderSelected');

				switch (curTool) {
				case "Crayon":
					alpha = 0.4;
					break;
				case "Marker":
					alpha = 1;
					break;
				default:
					break;
				}
			});
			
			function addClick(x, y, dragging) {
				clickX.push(x);
				clickY.push(y);
				if (curTool == "Eraser") {
					clickColor.push("white");
				} else {
					clickColor.push(curColor);
				}
				clickDrag.push(dragging);
				clickSize.push(lineWidth);
				clickTool.push(alpha);
			}

			function redraw() {
				context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

				for (var i = 0; i < clickX.length; i++) {
					context.beginPath();
					if (clickDrag[i] && i) {
						context.moveTo(clickX[i - 1], clickY[i - 1]);
					} else {
						context.moveTo(clickX[i] - 1, clickY[i]);
					}
					context.lineTo(clickX[i], clickY[i]);
					context.closePath();
					context.strokeStyle = clickColor[i];
					context.lineWidth = clickSize[i];
					context.lineCap = "round";
					context.lineJoin = "round";
					context.globalAlpha = clickTool[i];
					context.stroke();
				}

			}

			function clearCanvas() {
				context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
				clickX = new Array();
				clickY = new Array();
				clickDrag = new Array();
				clickColor = new Array();
				clickSize = new Array();
			}
			
			console.log("end");
			
		});


