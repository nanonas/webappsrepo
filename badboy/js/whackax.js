			var x=0, y=0;
			var canvasheight=700, canvaswidth=420;
		    var canvas = null;
			var context = null;
			var bufferCanvas = null;
			var bufferCanvasCtx = null;
			var openmenu= false;
			
			//about trashbag
			var sizebig=10;
			var bagfspeed=2;
			var bagreachfloor=500;
			var bagposy=240;
			var baga = [];
			var falltime=bagfspeed;
            //about snow flakes
			var flakeArray = [];
			var flakeTimer = null;
			var maxFlakes = 20;
			var flakeendangle = 180;
			var flakeradius=sizebig;
			var vscore = 5;
			var tb1,tb2,tb3,tb4,tb5,tb6;
		
//			var imagePaths = [
//			  				"images/j0149014.jpg", "images/j0149024.jpg", "images/j0149029.jpg", "images/j0178677.jpg"
//			  			];
			var imgbgd = "images/game.jpg";
			var imgbag = "images/play/garbage.png";
			var picwack = "images/play/pointburst.png";
			
			var imgmabout = "images/button/About.png";
			var imgmhelp = "images/button/Instructions.png";
			var imgmplay = "images/button/Play.png";
			var imgmscore = "images/button/Score.png";
			
			var bgdheight = null;
			var bgdwidth = null;
			var img = document.createElement("img");
			var imgtrash = document.createElement("img");
			var imgwack = document.createElement("img");
			var currentImage = 0, wx=-100,wy=-10;
			var bfall=false, bhit=0, bctr=0;
//			var bwack = [0,0,0,0,0,0];
			
			function objfall() {
				  bufferCanvasCtx.drawImage(imgtrash,20,bctr+10,50,50);
			  if (bfall) {	
				  falltime += bagfspeed;
				     for (var j=0;j<3;j++) {
		//			     for (var j=0;j<3;j++) {
				    	 if (baga[j].hit ==0 &&
				    			 baga[j].time1 < bagreachfloor) {
				    		 baga[j].y+=falltime; 
					         baga[j].time1 += falltime;
				    	 } else
					       // baga[j].time1 += falltime;
					        
				    	 //if (baga[j].time1 >= bagreachfloor) 
				    	 { 							
							  falltime =bagfspeed;
							  baga[j].time1=0;
						    	 baga[j].y=bagposy; baga[j].hit = 0;
						  }
						 				     
				     }				  
			      
			  }
			}
			function Flake() {
			    this.x = Math.round(Math.random() * context.canvas.width);
			    this.y = -10;
			    this.drift = Math.random();
			    this.speed = Math.round(Math.random() * 3) + 1;
			    this.width = (Math.random() * 3) + 15;
			    this.height = this.width;
			}
			
			function TBag() {
			    this.x = -10;
			    this.y = -10;
			    this.width = 40;
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
                document.	// initialize the rects
				flakeTimer = setInterval(addFlake, 200);
		
				Draw();
			    setInterval(objfall, 220);
				setInterval(FlakeUpdate,500);
				setInterval(animate, 30);
			}


			function addFlake() {
				
			    flakeArray[flakeArray.length] = new Flake();
			    if (flakeArray.length == maxFlakes)
			        clearInterval(flakeTimer);
			}

			function createBag() {
			     tb1 = new TBag();
			     tb2 = new TBag();
			     tb3 = new TBag();				
			}
			function setTrashBag() {
				//objfall();
			//	var maxbag=6;
			     tb1.x=75; tb1.y=bagposy; tb1.hit=0;
			     tb2.x=172; tb2.y=bagposy; tb2.hit=0;
			     tb3.x=365; tb3.y=bagposy; tb3.hit=0;
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
					bufferCanvasCtx.font = "18pt Georgia";
					
						bufferCanvasCtx.fillText(theString, 20,160);
					bufferCanvasCtx.fillText(" x= "+x+" y= "+y+" Score ="+vscore, 10,260);
					
				//loadBgdImage();
				//}
				}
			//When screen is touched, save the (x,y) coordinates into lastX and lastY variables
			function chkPauseButton(x,y) {
				 if ( (x>345 && y>40) &&
						 (x<420 && y<100)
						 ) {
					 swipemenu.simulateSwipeEvent();
					 swipemenu.close();
					 
					 bfall=true; wx=-100; wy=-10;  
				 }				
			}
			function chkHitBag(x,y) {
				for (var i=0; i<3; i++) {
					if (( (x> baga[i].x) && (y >baga[i].y)) &&
					   ((x<baga[i].x+baga[i].width) && (y<baga[i].y+baga[i].height)))
					{   baga[i].hit=1;
					    vscore +=5;
						//bfall=false; 
						//bhit=true; 
						//bwack[i]=1; 
						wx= baga[i].x; wy=baga[i].y;
						baga[i].y=-240;
				       bhit=1;		
					} 
				}
				
				if (bhit==0	&& vscore>0) {
					vscore--;
					
				} else bhit = 0;
				

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
				//FlakeUpdate();
				Draw();
			}

			function FlakeUpdate() {
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
				    bufferCanvasCtx.arc(flakeArray[i].x,flakeArray[i].y,10,0,180*Math.PI,false);
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
			    canvas.height = canvasheight; // window.outerHeight;		//screen.availHeight;
			//    canvas.height = 500; // window.outerHeight;		//screen.availHeight;
			    canvas.width =  canvaswidth; //window.outerWidth;		//screen.availWidth;
			    document.getElementById('canvas').appendChild(canvas);
			    context = canvas.getContext("2d");
			    init();			    			    
			}
window.addEventListener("load", doPageLoad, false);

