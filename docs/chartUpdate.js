// Function to start the snow effect
function startSnow() {
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];
    const numFlakes = 200;

    class Snowflake {
        constructor(x, y, speed, size, opacity) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.size = size;
            this.opacity = opacity;
            this.angle = Math.random() * 2 * Math.PI;
            this.spin = Math.random() * 0.02 - 0.01;
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.angle) * 0.5;
            this.angle += this.spin;

            // Reset snowflake position if it goes below the canvas
            if (this.y > canvas.height + this.size) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
                this.opacity = 1;
            }
            
            // Fade out snowflake as it approaches bottom of canvas
            if (this.y > canvas.height - 50) {
                this.opacity -= 0.01;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'white';
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < numFlakes; i++) {
        snowflakes.push(new Snowflake(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 3 + 1,
            Math.random() * 2 + 1,
            1
        ));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });
        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Function to start and update the connection chart
function startChart() {
    const ctx = document.getElementById('connectionChart').getContext('2d');
    const data = {
        labels: [],
        datasets: [{
            label: 'Connection Time (seconds)',
            data: [],
            fill: false,
            borderColor: 'white',
            tension: 0.1
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'linear', // Use linear scale for x-axis
                ticks: {
                    stepSize: 1 // Adjust step size as needed
                }
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const connectionChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    // Function to update chart data
    function updateChartData() {
        // Simulate new data points
        const newData = Math.random() < 0.2 ? Math.random() * 10 : Math.random() * 5;

        // Add new data point
        data.datasets[0].data.push(newData);

        // Remove old data if exceeding a certain number of points
        if (data.datasets[0].data.length > 50) {
            data.datasets[0].data.shift();
        }

        // Update chart
        connectionChart.update();
    }

    // Update chart data every second (adjust interval as needed)
    setInterval(updateChartData, 1000);
}

// Call functions to start the snow effect and update the connection chart
startSnow();
startChart();
