document.addEventListener('DOMContentLoaded', (event) => {
    // Your Pong game code here
    const canvas = document.getElementById('pongCanvas');
    const context = canvas.getContext('2d');

    // Game elements: Ball, Paddles, Scores
    let ball, paddle1, paddle2, score1, score2;

    // Canvas event handler to ensure game can be played with arrow keys when clicked
    canvas.addEventListener('keydown', function(event) {

        // Prevent default action for arrow keys
        if([38, 40, 87, 83].includes(event.keyCode)) {
            event.preventDefault();
        }
    });
    canvas.addEventListener('click', function() {
        canvas.focus();
    });

    // Initialize Game Elements
    function initGame() {
        ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speedX: 5, speedY: 5 };
        paddle1 = { x: 0, y: canvas.height / 2 - 40, width: 10, height: 80 };
        paddle2 = { x: canvas.width - 10, y: canvas.height / 2 - 40, width: 10, height: 80 };
        score1 = score2 = 0;
        window.requestAnimationFrame(drawGame);
    }

    // Draw Game Elements
    function drawGame() {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Ball
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        // Draw Paddles
        context.fillStyle = 'white';
        context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
        context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

        // Update Game State
        updateGame();

        // Request next frame
        window.requestAnimationFrame(drawGame);
    }

    // Update Game State: Ball Movement, Collision, Scoring
    function updateGame() {
        // Update Ball Position
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Ball Collision with Top/Bottom Walls
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.speedY = -ball.speedY;
        }

        // Ball Collision with Paddles
        if (ball.x - ball.radius < paddle1.x + paddle1.width && ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
            ball.speedX = -ball.speedX;
        }
        if (ball.x + ball.radius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
            ball.speedX = -ball.speedX;
        }

        // Scoring
        if (ball.x + ball.radius < 0) {
            score2++;
            resetBall();
        } else if (ball.x - ball.radius > canvas.width) {
            score1++;
            resetBall();
        }
    }

    // Reset Ball to Center after Scoring
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX;
    }

    // Paddle Movement Controls
    document.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case 87: // W key
                paddle1.y = Math.max(paddle1.y - 10, 0);
                break;
            case 83: // S key
                paddle1.y = Math.min(paddle1.y + 10, canvas.height - paddle1.height);
                break;
            case 38: // Up Arrow
                paddle2.y = Math.max(paddle2.y - 10, 0);
                break;
            case 40: // Down Arrow
                paddle2.y = Math.min(paddle2.y + 10, canvas.height - paddle2.height);
                break;
        }
    });

    // Start Game
    initGame();

});