window.onload = function() {

    var canvasWidth = 800;
    var canvasHeight = 475;
    var blockSize = 25;
    var ctx;
    var delay = 100;
    var snaky;
    var pommy;
    var widthInBlock = canvasWidth / blockSize;
    var heightInBlock = canvasHeight / blockSize;
    var score;
    var timeout;

    init();


    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "20px solid brown";
        canvas.style.borderRadius = "15px";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundImage = "url('junglebackground.jpg')";
        canvas.style.backgroundPosition = "center";
        canvas.style.backgroundSize = "cover";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snaky = new snake([[6, 4], [5, 4], [4, 4]], "right");
        pommy = new pomme([10, 10]);
        score = 0;
        refreshCanvas();
        
    }

    function refreshCanvas() {
        console.log('Refresh Canvas');
        snaky.advance();
        if (snaky.checkCollision()) {
            /* GAME OVER */
            gameOver();
        }
        else {
            if(snaky.isEatingApple(pommy)) {
                // LE SERPENT A MANGE LA POMME
                score ++;
                snaky.ateApple = true;
                do {
                    pommy.setNewPositionForApple();
                }
                while(pommy.isAppleOnSnake(snaky))
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snaky.draw();
            pommy.draw();
            timeout = setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver() {
        ctx.save();
        ctx.font = "bold 60px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.strokeText('Game Over', centreX, centreY - 180);
        ctx.fillText('Game Over', centreX, centreY - 180);
        ctx.font = "bold 25px sans-serif";
        ctx.strokeText('Appuyez sur la touche ESPACE pour rejouer !', centreX, centreY - 120);
        ctx.fillText('Appuyez sur la touche ESPACE pour rejouer !', centreX, centreY - 120);
        ctx.restore();
    }

    function restartGame() {
        snaky = new snake([[6, 4], [5, 4], [4, 4]], "right");
        pommy = new pomme([10, 10]);
        score = 0;
        clearTimeout(timeout);
        refreshCanvas();
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function() {
            ctx.save();
            /* ctx.fillStyle = "#ff0000"; */
            ctx.fillStyle = "#33cc33";
            for(var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };

        this.advance = function() {
            var nextPostion = this.body[0].slice();
            switch(this.direction) {
                case "left": nextPostion[0] -= 1;
                    break;
                case "right": nextPostion[0] += 1;
                    break;
                case "down": nextPostion[1] += 1;
                    break;
                case "up": nextPostion[1] -= 1;
                    break;
                default: throw("Invalid Direction");
            }
            this.body.unshift(nextPostion);
            // AGGRANDISSEMENT SERPENT APRES AVOIR MANGER UNE POMME
            if(!this.ateApple) {
                this.body.pop();
            }
            else {
                this.ateApple = false
            }
        };

        this.setDirection = function(newDirection) {
            var allowedDirection;
            switch(this.direction) {
                case "left":
                case "right": allowedDirection = ["up", "down"];
                    break;
                case "down":
                case "up": allowedDirection = ["left", "right"];
                    break;
                default: throw("Invalid Direction");
            }
            if(allowedDirection.indexOf(newDirection) > - 1) {
                this.direction = newDirection;
            }
        };

        this.checkCollision = function() {
            var wallCollision = false;
            var snakeCollision = false;
            var headSnake = this.body[0];
            var restSnake = this.body.slice(1);
            var snakeX = headSnake[0];
            var snakeY = headSnake[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlock - 1;
            var maxY = heightInBlock - 1;
            var notHorizontalWall = snakeX < minX || snakeX > maxX;
            var notVerticalWall = snakeY < minY || snakeY > maxY;

            if(notHorizontalWall || notVerticalWall) {
                wallCollision = true;
            }
            for(var i = 0; i < restSnake.length; i++) {
                if(snakeX === restSnake[i][0] && snakeY === restSnake[i][1] ) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;
        };

        this.isEatingApple = function(appleToEat) {
            var headSnake = this.body[0];
            if(headSnake[0] === appleToEat.position[0] && headSnake[1] === appleToEat.position[1]) {
                return true;
            }
            else {
                return false;
            }
                
        }
    };

    function pomme(position) {
        this.position = position;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
        this.setNewPositionForApple = function() {
            var newX = Math.round(Math.random() * (widthInBlock - 1));
            var newY = Math.round(Math.random() * (heightInBlock - 1));
            this.position = [newX, newY];
        };
        this.isAppleOnSnake = function(snakeToCheck) {
            var isAppleOnSnake = false;
            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isAppleOnSnake = true;
                }
            }
            return isAppleOnSnake;
        }
    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch(key) {
            case 37: newDirection = "left";
                break;
            case 38: newDirection = "up";
                break;
            case 39: newDirection = "right";
                break;
            case 40: newDirection = "down";
                break;
            case 32: restartGame();
                return;
            default: return;
        }
        snaky.setDirection(newDirection);
    }
    
}