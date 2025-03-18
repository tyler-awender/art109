let particles = [];

function setup()
{
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++)
    {
    particles.push(new Particle());
  }
}

function draw()
{
  background(20, 20, 30, 50);
  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Particle
{
  constructor()
  {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.color = color(random(255), random(255), random(255));
  }

  update()
  {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    let d = dir.mag();
    dir.setMag(map(d, 0, width, 3, 0)); // strength of attraction fades with distance
    this.acc = dir;
    
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

  }

  show()
  {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 8, 8);
  }
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}
