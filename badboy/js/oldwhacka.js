			var x=0;
			var y=0;
			var radius1=10;
		    var canvas = null;
			var context = null;
			var bufferCanvas = null;
			var bufferCanvasCtx = null;
			var flakeArray = [];
			var baga = [];
			var flakeTimer = null;
			var maxFlakes = 40;
			var tb1,tb2,tb3,tb4,tb5,tb6;
			var falltime=3;
			var imagePaths = [
			  				"images/j0149014.jpg", "images/j0149024.jpg", "images/j0149029.jpg", "images/j0178677.jpg"
			  			];
			var imgbgd = "images/game.jpg";
			var imgbag = "images/play/garbage.png";
			var picwack = "images/play/pointburst.png";
			var bgdheight = null;
			var bgdwidth = null;
			var img = document.createElement("img");
			var imgtrash = document.createElement("img");
			var imgwack = document.createElement("img");
			var currentImage = 0, wx=-100,wy=-10;
			var bfall=false, bhit=false, bctr=0;
			var bwack = [0,0,0,0,0,0];
			
			function objfall() {
				  bufferCanvasCtx.drawImage(imgtrash,20,bctr+10,50,50);
			  if (bfall) {	
				//  bctr=bctr+3;
				  falltime += 2;
				  
	//			  bufferCanvasCtx.drawImage(imgtrash,20,bctr+10,50,50);
				     for (var j=0;j<3;j++) {
				    	 if (baga[j].hit ==0 ) baga[j].y+=falltime; 
				   
				    	 // 	else {				    		
				   // 		baga[j].y=240;
				   // 	}
				     /*
						  if (baga[j].y > 700 || bctr > 500) { 							
							  bctr=0; //bfall=false;
						    	 baga[j].y=240; baga[j].hit = 0;
						  }
						  */
					        baga[j].time1 += falltime;

				    	 if (baga[j].time1 > 700) { 							
							//  bctr=0; //bfall=false;
							  falltime =3;
							  baga[j].time1=0;
						    	 baga[j].y=240; baga[j].hit = 0;
						  }
						  
				     
				     }
				  
			      
			  }

			}
			
			function TBag() {
			    this.x = -10;
			    this.y = -10;
			    this.width = 30;
			    this.height = this.width;
			    this.hit=0;
			    this.time1=0;
			}
			function init() {
			//	document.getElementById("soundtrack").play();
			//	canvas = document.getElementById('testCanvas');
			//	context = canvas.getContext("2d");
				
				bufferCanvas = document.createElement("canvas");
				bufferCanvasCtx = bufferCanvas.getContext("2d");
				bufferCanvasCtx.canvas.width = context.canvas.width;
				bufferCanvasCtx.canvas.height = context.canvas.height;
				bgdheight = context.canvas.height;
				bgdwidth = context.canvas.width;
			//	img.setAttribute('width','600');
			//	img.setAttribute('height','1024');
				img.setAttribute('width',bgdwidth);
				img.setAttribute('height',bgdheight);
				img.setAttribute('src',imgbgd);
			//	imgtrash.setAttribute('width',bgdwidth);
			//	imgtrash.setAttribute('height',bgdheight);
				imgtrash.setAttribute('src',imgbag);
				
				imgwack.setAttribute('width',80);
				imgwack.setAttribute('height',40);
				imgwack.setAttribute('src',picwack);
				
				createBag();
				setTrashBag();
				document.addEventListener("touchstart",  doTouchStart,  false);

				// initialize the rects
				flakeTimer = setInterval(addFlake, 200);
		
				Draw();
			    setInterval(objfall, 220);
				
				setInterval(animate, 30);
			}

			function Flake() {
			    this.x = Math.round(Math.random() * context.canvas.width);
			    this.y = -10;
			    this.drift = Math.random();
			    this.speed = Math.round(Math.random() * 3) + 1;
			    this.width = (Math.random() * 3) + 15;
			    this.height = this.width;
			}

			function addFlake() {
				
//			    flakeArray[flakeArray.length] = new Flake();
			    if (flakeArray.length >= maxFlakes)
			        clearInterval(flakeTimer);
			    flakeArray[flakeArray.length] = new Flake();
			}

			function createBag() {
			     tb1 = new TBag();
			     tb2 = new TBag();
			     tb3 = new TBag();				
			}
			function setTrashBag() {
				//objfall();
			//	var maxbag=6;
			     tb1.x=75; tb1.y=240; tb1.hit=0;
			     tb2.x=172; tb2.y=240; tb2.hit=0;
			     tb3.x=365; tb3.y=240; tb3.hit=0;
			     baga[0] =tb1;
			     baga[1]=tb2;
			     baga[2]=tb3;
			     
			//  for (i=0; i<3;i++) {  
			//    baga[i] = new TBag();
			//    baga[i].x=75+i*20
			//  } 
			   // if (flakeArray.length == maxFlakes)
			   //     clearInterval(flakeTimer);
			}

			function chk1(){
//				 if (!bhit) { 
//					  bufferCanvasCtx.drawImage(imgtrash,baga[k].x,baga[k].y,baga[k].width,baga[k].height);	

//			  }
				  if (bhit) {	
					//  bctr+=10;
					//  bufferCanvasCtx.drawImage(imgtrash,20,bctr+10,50,50);
					for (var k=0; k<3; k++)	{
					  if (bwack[k] == 1) {
						 // bufferCanvasCtx.drawImage(imgwack,baga[k].x,baga[k].y,80,50);		
						  baga[i].y=240;
						  bwack[k]=0;	bhit=false;					  
					  }
					} 
					  //	bufferCanvasCtx.drawImage(imgtrash,tb2.x,tb2.y,30,30);	
					//	bufferCanvasCtx.drawImage(imgtrash,tb3.x,tb2.y,30,30);	
					  
					//  if (tb1.y>700) { bctr=0; bhit=false;}
				      
				  }
			}
			function blank() {
				bufferCanvasCtx.fillStyle = "#ff0000";
				bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
			//	img.onload = function() {
				//	if (currentImage >= imagePaths.length)
				//		currentImage = 0;
					
					bufferCanvasCtx.drawImage(img,0,0,bgdwidth,bgdheight);	
					bufferCanvasCtx.drawImage(imgtrash,20,20,50,50);	
					bufferCanvasCtx.drawImage(imgwack,20,120,80,50);	
					//bufferCanvasCtx.drawImage(imgtrash,tb1.x,tb1.y,30,30);	
					//bufferCanvasCtx.drawImage(imgtrash,tb2.x,tb2.y,30,30);	
					//bufferCanvasCtx.drawImage(imgtrash,tb3.x,tb3.y,30,30);	
					for (var i=0; i < 3; i++) bufferCanvasCtx.drawImage(imgtrash,baga[i].x,baga[i].y,baga[i].width,baga[i].height);
					bufferCanvasCtx.drawImage(imgwack,wx,wy,80,50);	
					
					//chk1();
					//bufferCanvasCtx.drawText
					// draw the string with some font information
			   bufferCanvasCtx.strokeStyle = "white";
               bufferCanvasCtx.fillStyle = "white";
					var theString= "Noel Anonas 123";
					bufferCanvasCtx.font = "25pt Georgia";
					
						bufferCanvasCtx.fillText(theString, 20,160);
					bufferCanvasCtx.fillText(" x= "+x+" y= "+y+" bfall="+bfall, 20,260);
					
				//loadBgdImage();
				//}
				}
			//When screen is touched, save the (x,y) coordinates into lastX and lastY variables
			function chkPauseButton(x,y) {
				 if ( (x>345 && y>40) &&
						 (x<420 && y<100)
						 ) {
					// swipemenu.simulateSwipeEvent();
					 bfall=true; wx=-100; wy=-10;  
				 }				
			}
			function chkHitBag(x,y) {
				for (var i=0; i<3; i++) {
					if (( (x> baga[i].x) && (y >baga[i].y)) &&
					   ((x<baga[i].x+baga[i].width) && (y<baga[i].y+baga[i].height)))
					{   baga[i].hit=1;
						//bfall=false; 
						//bhit=true; 
						//bwack[i]=1; 
						wx= baga[i].x; wy=baga[i].y;
						baga[i].y=240;
						
					}
				}

			}
			
			function doTouchStart(event) {
			    event.preventDefault();
			    var touchEvent = event.changedTouches[0];
				 x = touchEvent.pageX;
				 y = touchEvent.pageY;
                 chkPauseButton(x, y);				
                 chkHitBag(x, y);	
                 
			/*    if (x || y) {
			        if (withinPanelBound(y)) {
						showEventDescription(x, y);
					} 
					else {
						if (touchEvent.pageY >  page_header_height + canvas_header_height)
						{
							//Initialize the starting position:
							lastX = touchEvent.pageX;
							lastY = touchEvent.pageY;
							return true;
						}
						else {
						return false;
						}
					}
			    } */
			}
			
			
			
			function animate() {
				Update();
				Draw();
			}

			function Update() {
			    for (var i = 0; i < flakeArray.length; i++) {
                    if (flakeArray[i].y < context.canvas.height) {
                        flakeArray[i].y += flakeArray[i].speed;
                        if (flakeArray[i].y > context.canvas.height)
                            flakeArray[i].y = -5;
                        flakeArray[i].x += flakeArray[i].drift;
                        if (flakeArray[i].x > context.canvas.width)
                            flakeArray[i].x = 0;
                    }
			    }
			}
			
			function Draw(){
				context.save();
/*
				// create a clipping region
				bufferCanvasCtx.beginPath();
				bufferCanvasCtx.fillStyle="black";
				bufferCanvasCtx.fillRect(0,0,bufferCanvas.width,bufferCanvas.height);
				bufferCanvasCtx.arc(bufferCanvas.width/2,bufferCanvas.height/2,bufferCanvas.height/3,0,2*Math.PI);
				bufferCanvasCtx.clip();
*/
				blank();
			   bufferCanvasCtx.strokeStyle = "white";
               bufferCanvasCtx.fillStyle = "white";
               
				for (var i = 0; i < flakeArray.length; i++) {
//				    bufferCanvasCtx.fillStyle = "white";
//				    bufferCanvasCtx.fillRect(flakeArray[i].x,flakeArray[i].y,flakeArray[i].width,flakeArray[i].height);
///				    bufferCanvasCtx.fillRect(flakeArray[i].x,flakeArray[i].y,flakeArray[i].width,flakeArray[i].height);
//				    bufferCanvasCtx.arc(flakeArray[i].x,flakeArray[i].y,0,360,10,false);
				    bufferCanvasCtx.beginPath();
	//				ctx.arc(550,150,100,0,radians);
				    bufferCanvasCtx.arc(flakeArray[i].x,flakeArray[i].y,radius1,0,180*Math.PI,false);
					bufferCanvasCtx.fill();
					bufferCanvasCtx.stroke(); 				
					}
				
				 //***
				//***

				// copy the entire rendered image from the buffer canvas to the visible one
				context.drawImage(bufferCanvas, 0,0,bufferCanvas.width, bufferCanvas.height);
				context.restore();
			}

			function doPageLoad() 
			{
				document.addEventListener("touchstart",  doTouchStart,  false);
//				document.addEventListener("touchmove",   doTouchMove,   false);
//				document.addEventListener("touchend",    doTouchEnd,    false);
//				document.addEventListener("touchcancel", doTouchCancel, false);
				
				//  Create a canvas that covers the entire screen:
			    canvas = document.createElement('canvas');
			    canvas.height = 700; // window.outerHeight;		//screen.availHeight;
			    canvas.width =  420; //window.outerWidth;		//screen.availWidth;
			    document.getElementById('canvas').appendChild(canvas);
			    context = canvas.getContext("2d");
			    init();
			    
			    
			}
window.addEventListener("load", doPageLoad, false);

