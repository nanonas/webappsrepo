			var x=0, y=0;
			var whackcount=20,whackmax=100;
			var bagremain=10;
            var litw=40, lith=80;
            var vx=0, vy=0;
            var gameover=false;
            var vgameover="";
            var gamecomplete=false;
            var vgamecomplete="";
			var canvasheight=585, canvaswidth=350;
//			var canvasheight=600, canvaswidth=340;
//			var canvasheight=570, canvaswidth=330;
//			var canvasheight=700, canvaswidth=420;
//			var canvasheight=1280, canvaswidth=768;
			

		    var canvas = null;
			var context = null;
			var bufferCanvas = null;
			var bufferCanvasCtx = null;
			var openswipe= false;
			var gamestart=false;
			var scorereg=5;
			var currentlit=0;
			var alit = [];
			// var litx=30,lity=120;
			//var litx=135,lity=120;
			var litx=235,lity=120;
			// sound
			var vdayang = new Audio("sound/cmas0.mp3"); // buffers automatically when created
//			var vdayang = new Audio("sound/dayang.mp3"); // buffers automatically when created
			//snd.play();
			var picscoremiss = "images/button/scorenmissed.png";
			var imgscoremiss = document.createElement("img");
			imgscoremiss.setAttribute("src", picscoremiss);

			//about trashbag
			var sizesmall=2;
			var sizemed =5;
			var sizebig=10;
			var bagfspeed=2;
			var bagreachfloor=320;
//			var bagreachfloor=558;
			var bagposx=-10;
//			var bagposx=190;
			var baga = [];
			var falltime=bagfspeed;
			var timerNumAnimate = 30;
			var timerNumFall=220;
			var timerNumFlake = 800;
            //about snow flakes
			var flakeArray = [];
			var fTimer1 = 0;
			var maxFlakes = 20;
			var flakeendangle = 180;
			var flakeradius=sizesmall;			
			var vscore = 0;
			var tb1,tb2,tb3,tb4,tb5,tb6;
//			var imgbgd = "images/game.jpg";
			var picpause = "images/button/Pause.png";
//			var picpause = "images/mosquito.gif";
			var imgbgd = "images/playroad/bgroad.jpg";
//			var imgbgd = "images/level1noel.jpg";
			var imgbag = "images/playroad/Car1.png";
			var picwack = "images/play/pointburst.png";
		//	var piclit =  "images/play/pointburst.png";
			var piclit = [
				"images/play/lit0.png", "images/play/lit1.png", "images/play/lit2.png"
			];
			
			var imgmabout = "images/button/About.png";
			var imgmhelp = "images/button/Instructions.png";
			var imgmplay = "images/button/Play.png";
			var imgmscore = "images/button/Score.png";
			
			var bgdheight = null;
			var bgdwidth = null;
			var img = document.createElement("img");
			var imgtrash = document.createElement("img");
			var imgwack = document.createElement("img");
			var imglit = document.createElement("img");
			var imgpause = document.createElement("img");
			
			var currentImage = 0, wx=-100,wy=-10;
			var bfall=false, bhit=0, bctr=0;
//			var bwack = [0,0,0,0,0,0];
			
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

				imgpause.setAttribute('width',80);
				imgpause.setAttribute('height',80);
				imgpause.setAttribute('x',256);
				imgpause.setAttribute('y',5);
				imgpause.setAttribute('src',picpause);
                

				//	imgtrash.setAttribute('width',bgdwidth);
			//	imgtrash.setAttribute('height',bgdheight);
				imgtrash.setAttribute('src',imgbag);
				
				imgwack.setAttribute('width',80);
				imgwack.setAttribute('height',40);
				imgwack.setAttribute('src',picwack);
				imglit.setAttribute('width',litw);
				imglit.setAttribute('height',lith);
				imglit.setAttribute('src',piclit[0]);
				
				createBag();
				setTrashBag();
				createLit();
				setOLit();
				imgpause.addEventListener("touchstart",  doTouchPause,  false);
				//document.addEventListener("touchstart",  doTouchStart,  false);
                //document.	// initialize the rects
			//	fTimer1 = setInterval(addFlake, timerNumFlake);		
			//	Draw();
			//    timerfall = setInterval(objfall, timerNumFall);
			//	setInterval(FlakeUpdate,500);
			//	timeranimate = setInterval(animate, timerNumAnimate);
			}

			function objfall() {
				//  bufferCanvasCtx.drawImage(imgtrash,20,bctr+10,50,50);
			  if (bfall) {	
				//  falltime += bagfspeed;
				     for (var j=0;j<3;j++) {
				    		if( baga[j].hit ==1 ||
					    			 baga[j].x >= bagreachfloor )
				    	{
				    			if (baga[j].x >= bagreachfloor)	{
				    				if (bagremain>=1) {bagremain-=1;}
				    				else {
				    			      gameover=true;	
				    			      vgameover="GAME OVER";
				    			     
				    				}
				    			}
			    			 baga[j].time1=0;
						    	 baga[j].x=bagposx; baga[j].hit = 0;
						    	// break;
						alit[j].image.setAttribute('src', piclit[2]);

						  } else {
							  //animate the rat below...
							//	if (baga[j].y >220 && baga[j].y <=250 ) alit[j].image.setAttribute('src', piclit[1]);
						  }
				    	 baga[j].time1 += bagfspeed;
				    	 
				    	 //baga[j].y+=falltime;
				    	 baga[j].x+=baga[j].time1;
						 				     
				     }				  
			      
			  }
			}
			function Flake() {
			    this.x = Math.round(Math.random() * context.canvas.width);
			    this.y = -10;
			    this.drift = Math.random();
			    this.speed = Math.round(Math.random() * 2) + 1;
			    this.width = (Math.random() * 3) + 15;
			    this.height = this.width;
			}

			function addFlake() {
				
			    flakeArray[flakeArray.length] = new Flake();
			    if (flakeArray.length >= maxFlakes)
			    {  clearInterval(fTimer1);  } 
			//    flakeArray[flakeArray.length] = new Flake();
			}
			
			function TBag() {
			    this.x = -10;
			    this.y = -10;
			    this.width = 80;//40;
			    this.height = 50;  //this.width;
			    this.hit=0;
			    this.time1=0;
			}
			function OLit() {
			    this.x = -10;
			    this.y = 120;
			    this.current=0;
			    this.image=null;
			}

			function createBag() {
			     tb1 = new TBag();
			     tb2 = new TBag();
			     tb3 = new TBag();				
			}
			function createLit() {
				var o1,o2,o3;
			     o1 = new OLit();
                 alit[0]=o1;
			     o2 = new OLit();
                 alit[1]=o2;
			     o3 = new OLit();
                 alit[2]=o3;
			     //alit[1] = new OLit();
			     //alit[2] = new Olit();				
			}
			function setOLit() {
				var imglit1 = document.createElement("img");
				var imglit2 = document.createElement("img");
				var imglit3 = document.createElement("img");
				imglit1.setAttribute('width',litw);
				imglit1.setAttribute('height',lith);
				imglit1.setAttribute('src',piclit[0]);
				imglit2.setAttribute('width',litw);
				imglit2.setAttribute('height',lith);
				imglit2.setAttribute('src',piclit[0]);
				imglit3.setAttribute('width',litw);
				imglit3.setAttribute('height',lith);
				imglit3.setAttribute('src',piclit[0]);

				alit[0].x= 30;
				alit[1].x=135;
				alit[2].x=235;
				alit[0].image=imglit1;
				alit[1].image=imglit2;
				alit[2].image=imglit3;
				
				// var litx=30,lity=120;
				//var litx=135,lity=120;
				//var litx=235,lity=120;			  
			}
			function setTrashBag() {
				//objfall();
			//	var maxbag=6;
			     tb1.y=115; tb1.x=bagposx; tb1.hit=0;
//			     tb1.y=85; tb1.x=bagposx; tb1.hit=0;
			     tb2.y=240; tb2.x=bagposx; tb2.hit=0;
//			     tb2.y=178; tb2.x=bagposx; tb2.hit=0;
			     tb3.y=360; tb3.x=bagposx; tb3.hit=0;
//			     tb3.y=260; tb3.x=bagposx; tb3.hit=0;
			     baga[0] =tb1;
			     baga[1]=tb2;
			     baga[2]=tb3;
			}

			function viewBgd() {
				bufferCanvasCtx.fillStyle = "#00f000";
				bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
				bufferCanvasCtx.drawImage(img,0,0,bgdwidth,bgdheight);	
				bufferCanvasCtx.drawImage(imgpause,imgpause.getAttribute('x'),imgpause.getAttribute('y'),80,80);	
				//	bufferCanvasCtx.drawImage(imgtrash,20,20,50,50);	
				//	bufferCanvasCtx.drawImage(imgwack,20,120,80,50);	
					for (var i=0; i < 3; i++) bufferCanvasCtx.drawImage(imgtrash,baga[i].x,baga[i].y,baga[i].width,baga[i].height);
					bufferCanvasCtx.drawImage(imgwack,wx,wy,80,50);	
				//	bufferCanvasCtx.drawImage(imglit,litx,lity,80,80);	
				//	for (var i=0; i < alit.length; i++) 
				//		bufferCanvasCtx.drawImage(alit[i].image,alit[i].x,alit[i].y,80,80);

					//					
				//	if (currentImage >= imagePaths.length)
					//		currentImage = 0;
			// draw the string with some font information
			   bufferCanvasCtx.strokeStyle = "black";
               bufferCanvasCtx.fillStyle = "black";
               writeScore();
				bufferCanvasCtx.font = "14pt Georgia";					
				bufferCanvasCtx.drawImage(imgscoremiss,5,5,200,50);	
//bufferCanvasCtx.fillText(" x= "+x+" y= "+y,5,100);

//bufferCanvasCtx.fillText(" Score ="+vscore+" bh"+bgdheight+" : bw "+bgdwidth, 5,170);
/*
               var theString= " w:"+context.canvas.width + " fy"+flakeArray[5].y;
	var s2 = "++fx:"+flakeArray[5].x; 
	var s3 = "EWELf timer"+ fTimer1+" flakelen:"+flakeArray.length;
					bufferCanvasCtx.font = "14pt Georgia";					
					bufferCanvasCtx.fillText(theString, 20,120);
					bufferCanvasCtx.fillText(s2, 20,160);
					bufferCanvasCtx.fillText(s3, 20,200);
					bufferCanvasCtx.fillText(" x= "+x+" y= "+y+" Score ="+vscore, 10,260);
*/					
				}
			
//Writing the score
			function writeScore() {
				bufferCanvasCtx.font = "24pt Georgia";					
				bufferCanvasCtx.fillText(vscore, 30,80);
				bufferCanvasCtx.fillText(bagremain, 130,80);
			//	bufferCanvasCtx.fillText(""+vgameover, 30,210);
			//	bufferCanvasCtx.fillText(""+vgamecomplete, 30,210);
				if (gameover || gamecomplete){
					 clearInterval(timerfall);
 					  clearInterval(timeranimate);
 					 if (gameover)	 window.location.href = "gameover.html"; 					   					  
 	  				 else {
 	  				//.... dbsession
 	  					var dbsession = getSessionStorage(); // || dispError('Session Storage not supported.');

 	  					function getSessionStorage() {
 	  					    try {
 	  					        if( !! window.sessionStorage ) return window.sessionStorage;
 	  					    } catch(e) {
 	  					        return undefined;
 	  					    }
 	  					}
 	  					
 	  		//....
 	  					
 	  				    dbsession.setItem("score", vscore);
 	  					 window.location.href = "levelclear.html";
 	  				 } 
				}
				
				/*
	               var theString= " w:"+context.canvas.width + " fy"+flakeArray[5].y;
		var s2 = "++fx:"+flakeArray[5].x; 
		var s3 = "EWELf timer"+ fTimer1+" flakelen:"+flakeArray.length;
						bufferCanvasCtx.font = "14pt Georgia";					
						bufferCanvasCtx.fillText(theString, 20,120);
						bufferCanvasCtx.fillText(s2, 20,160);
						bufferCanvasCtx.fillText(s3, 20,200);
						bufferCanvasCtx.fillText(" x= "+x+" y= "+y+" Score ="+vscore, 10,260);
	*/					
				
				
			}
   function startallanimation(){
	//	if (!gamestart) {
            //document.	// initialize the rects
		//	fTimer1 = setInterval(addFlake, timerNumFlake);		
		//	Draw();
		    timerfall = setInterval(objfall, timerNumFall);
		//	setInterval(FlakeUpdate,500);
		    clearInterval(timeranimate); //once start!!!
			timeranimate = setInterval(animate, timerNumAnimate);
			bfall=true;
			gamestart=true;
			//start also the background music;
			bgddayang();
	//	}
   }
			//When screen is touched, save the (x,y) coordinates into lastX and lastY variables
			function chkPauseButton(x1,y1) {
//pause button at the top-right most location
//				if ( (x>345 && y>40) &&
	 vx =256; //imgpause.getAttribute('x');
	 vy= 5; //imgpause.getAttribute('y');
				if ( (x1>vx && x1<=(vx+80) ) &&
						 ( (y1>vy) && y1<=(vy+80))) 
				{
						openswipe = !openswipe; 
				if (openswipe){	 
					swipemenu.simulateSwipeEvent();
					clearInterval(timerfall);
					clearInterval(timeranimate);
					//clearInterval(fTimer1);
					openswipe = !openswipe; 
				
				}
				else{ swipemenu.close();
				if (!timeranimate) continueplay();
				}
					 bfall=true; wx=-100; wy=-100;  
				 }
			}
			function chkHitBag(x,y) {
				wx=-100;wy=-100;
				for (var i=0; i<3; i++) {
					if (( (x> baga[i].x) && (y >baga[i].y)) &&
					   ((x<(baga[i].x+baga[i].width)) && (y<(baga[i].y+baga[i].height))))
					{   baga[i].hit=1;
					    vscore +=scorereg;
						wx= baga[i].x; wy=baga[i].y;
						whackcount+=1;
						if (whackcount >= whackmax){
							gamecomplete=true;
							vgamecomplete="Objective Completed!";
						}
						baga[i].x=-240;
						alit[i].image.setAttribute('src', piclit[2]);
				       bhit=1;	break;	
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
               // if (openswipe) continueplay();
				 chkPauseButton(x, y);
                 //icontinueplay();
                 if (!gamestart)  startallanimation();
                 chkHitBag(x, y);	
			}
			
			function doTouchPause(event) {
			    event.preventDefault();
			    var touchEvent = event.changedTouches[0];
				 x = touchEvent.pageX;
				 y = touchEvent.pageY;
               // if (openswipe) continueplay();
				 chkPauseButton(x, y);
                 //icontinueplay();
                // if (!gamestart)  startallanimation();
                // chkHitBag(x, y);	
			}
			
			
			function animate() {
				Update();
				Draw();
			}

			function Update() {
			    for (var i = 0; i < flakeArray.length; i++) {
                    if (flakeArray[i].y <= context.canvas.height) {
                        flakeArray[i].y += flakeArray[i].speed;
                    }//
                        if (flakeArray[i].y > context.canvas.height)
                            flakeArray[i].y = -5;
                        flakeArray[i].x += flakeArray[i].drift;
                        if (flakeArray[i].x > context.canvas.width)
                            flakeArray[i].x = 0;
                    //}
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
				viewBgd();
			   bufferCanvasCtx.strokeStyle = "white";
               bufferCanvasCtx.fillStyle = "white";
               
				for (var i = 0; i < flakeArray.length; i++) {
//				    bufferCanvasCtx.fillStyle = "white";
//				    bufferCanvasCtx.fillRect(flakeArray[i].x,flakeArray[i].y,flakeArray[i].width,flakeArray[i].height);
///				    bufferCanvasCtx.fillRect(flakeArray[i].x,flakeArray[i].y,flakeArray[i].width,flakeArray[i].height);
//				    bufferCanvasCtx.arc(flakeArray[i].x,flakeArray[i].y,0,360,10,false);
				    bufferCanvasCtx.beginPath();
	//				ctx.arc(550,150,100,0,radians);
				    bufferCanvasCtx.arc(flakeArray[i].x,flakeArray[i].y,flakeradius,0,180*Math.PI,false);
					bufferCanvasCtx.fill();
					bufferCanvasCtx.stroke(); 				
					}


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
			    canvas.width =  canvaswidth; //window.outerWidth;		//screen.availWidth;
			    document.getElementById('canvas').appendChild(canvas);
			    context = canvas.getContext("2d");
//				context.drawImage(img,0,0,canvaswidth,canvasheight);	
                context.save();
			    init();
			    viewBgd();
				context.drawImage(bufferCanvas, 0,0,bufferCanvas.width, bufferCanvas.height);
				//	Draw();
				timeranimate = setInterval(animate, timerNumAnimate);
			//	animate();
				context.drawImage(img,0,0,bgdwidth,bgdheight);	
 
				context.restore();
			//	context.drawImage(bufferCanvas, 0,0,bufferCanvas.width, bufferCanvas.height);
			}
window.addEventListener("load", doPageLoad, false);

