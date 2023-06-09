const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      
      const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        speed: 5,
        dx: 3,
        dy: -3
      };
      const player1 = {
        x: 10,
        y: canvas.height / 2 - 40,
        width: 10,
        height: 80,
        score: 0,
        speed: 0,
        //μεταβλητή για τη φορά της μπάλας
        vector:-1
		
      };
      const player2 = {
        x: canvas.width - 20,
        y: canvas.height / 2 - 40,
        width: 10,
        height: 80,
        score: 0,
        speed: 0,
        //μεταβλητή για τη φορά της μπάλας
        vector:1
      };
      
      function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
      
      function drawPaddle(x, y, width, height) {
        ctx.fillRect(x, y, width, height);
      }
      
      function drawScore() {
        ctx.font = "30px Arial";
        ctx.fillText(player1.score, canvas.width / 4, 50);
        ctx.fillText(player2.score, canvas.width * 3 / 4, 50);
      }
      
      function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.fillstyle = "black";
        ctx.fillStyle = "#ffffff";
        // Draw the ball and paddles
        drawBall();
        ctx.fillStyle = "#ff00ff";
        drawPaddle(player1.x, player1.y, player1.width, player1.height);
        ctx.fillStyle = "00FFFF"; //αλλαγή του χρώματος σε κίτρινο γιατί δεν ήξερα τι είναι τί
        drawPaddle(player2.x, player2.y, player2.width, player2.height);
        ctx.fillStyle = "#ffffff";
        drawScore();
        
        
        ball.x += ball.dx;
        ball.y += ball.dy;
		
        
        
        if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
          ball.dy = -ball.dy;
        }
        
        
        function checkCollision(player) {
          if (ball.x + ball.radius > player.x && ball.x - ball.radius < player.x + player.width && ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height) {
            //ball.dx = -ball.dx;
            //ένα block μαθηματικά για την αλλαγή της γωνίας της μπάλας
            //όσο ποιο κοντά στο κέντρο της ρακέτας τόσοσ ποιο flat η γωνία επιστροφής
            //όσο ποιο προς τα άκρα, τόσο ακραία η γωνία επιστροφής
			      var relatY = player.y + player.height / 2. - ball.y; //είναι η σχετική θέση που χτυπά η μπάλα τη ρακέτα
            var normalrelatY = (relatY / (player.height / 2));// είναι η κανονικοποίηση της θέσης
            var bounce_angle = normalrelatY * (65 * Math.PI / 180); //υπολογισμός της γωνίας επιστροφής με μεγιστο 55μοίρες(με μετατροπή σε ακτίνια)
            ball.dx = -8 * Math.cos(bounce_angle) *player.vector ;//υπολογισμός του dx kai dy (με μέγιστη ταχυτητα το 4(διάνυσμα))
            ball.dy = 8 * (-Math.sin(bounce_angle) );
          }
        }
        checkCollision(player1);
        checkCollision(player2);
        
        
        function checkOutOfBounds() {
          if (ball.x - ball.radius < 0) {
            player2.score++;
            resetBall();
          } else if (ball.x + ball.radius > canvas.width) {
            player1.score++;
            resetBall();
          }
        }
        checkOutOfBounds();
        
        
        function movePaddle(player) {
          player.y+= player.speed;
      
      // Prevent the paddle from going out of bounds
      if (player.y < 0) {
        player.y = 0;
      } else if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
      }
    }
    movePaddle(player1);
    movePaddle(player2);
    
    
    document.addEventListener("keydown", function(e) {
      if (e.code === "KeyW") {
        player1.speed = -7;
      } else if (e.code === "KeyS") {
        player1.speed = 7;
      }
      if (e.code === "ArrowUp") {
        player2.speed = -7;
      } else if (e.code === "ArrowDown") {
        player2.speed = 7;
      }
    });
    document.addEventListener("keyup", function(e) {
      if (e.code === "KeyW" || e.code === "KeyS") {
        player1.speed = 0;
      }
      if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        player2.speed = 0;
      }
    });
    
    
    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = -ball.dx;
      ball.speed = 5;
    }
  }
  
  
  setInterval(draw, 20);