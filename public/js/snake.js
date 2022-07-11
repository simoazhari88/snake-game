		const cvs = document.getElementById("snake");
		const ctx = cvs.getContext("2d");

		const box = 32;


		const ground = new Image();
		ground.src = "public/image/ground.png";

		const foodImg = new Image();
		foodImg.src = "public/image/food.png";


		let dead = new Audio();
		let eat = new Audio();

		dead.src = "public/audio/dead.mp3";
		eat.src = "public/audio/eat.mp3";


		let snake = [];

		snake[0] = {
		    x : 9 * box,
		    y : 10 * box,
		};


		let food = {
		    x : Math.floor(Math.random()*17+1) * box,
		    y : Math.floor(Math.random()*15+3) * box
		}


		let score = 0;
		let hit = 0;



		let dir;

		document.addEventListener("keydown",direction);

		function direction(event){
		    let key = event.keyCode;
		    if( key == 37 && dir != "RIGHT"){
		        dir = "LEFT";
		    }else if(key == 38 && dir != "DOWN"){
		        dir = "UP";
		    }else if(key == 39 && dir != "LEFT"){
		        dir = "RIGHT";
		    }else if(key == 40 && dir != "UP"){
		        dir = "DOWN";
		    }
		}

		function collision(head,array){
		    for(let i = 0; i < array.length; i++){
		        if(head.x == array[i].x && head.y == array[i].y){
		            return true;
		        }
		    }
		    return false;
		}


		function draw(){
		    
		    ctx.drawImage(ground,0,72);
		    
		    for( let i = 0; i < snake.length ; i++){
		        ctx.fillStyle = ( i == 0 )? "#99CC33" : "#99CC33";
		        ctx.fillRect(snake[i].x,snake[i].y,box,box);
		        
		        ctx.strokeStyle = "black";
		        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
		    }
		    
		    ctx.drawImage(foodImg, food.x, food.y);
		    
		    let snakeX = snake[0].x;
		    let snakeY = snake[0].y;
		    
		    if( dir == "LEFT") snakeX -= box;
		    if( dir == "RIGHT") snakeX += box;
		    if( dir == "UP") snakeY -= box;
		    if( dir == "DOWN") snakeY += box;
		    
		    if(snakeX == food.x && snakeY == food.y){
		        score= score+10;
		        hit += 1;
		        eat.play();
		        food = {
		            x : Math.floor(Math.random()*17+1) * box,
		            y : Math.floor(Math.random()*15+3) * box
		        }
		    }else{
		        snake.pop();
		    }
		    
		    
		    let newHead = {
		        x : snakeX,
		        y : snakeY
		    }
		    
		   
		    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake))
		    {
		        clearInterval(game);
		        dead.play();
		        showScoreBoard();

		        reload();
		    }
		    
		    snake.unshift(newHead);

		    let increaseSpeed = false;

		    if(hit && hit % 3 === 0 && movement > 100)
		    {
		    	hit = 0;
		    	clearInterval(game);
		    	movement -= 20;
		    	game = setInterval(draw, movement);
		    }
		   
		    document.getElementById('scoring').innerHTML = `Score: ${score}`;
		}


		function showScoreBoard(){
			var end = document.getElementById('end');
			end.innerHTML = `Score: ${score} <br> Game over`;
			end.style.display = "block";
		}

		function reload()
		{
			setTimeout(() => {
				window.location.reload();
			}, 5000)
		}

		let movement = 200;
		let game = setInterval(draw,movement);