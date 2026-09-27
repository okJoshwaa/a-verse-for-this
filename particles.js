(function () {
  "use strict";

  var canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var width, height;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  var mouse = { x: width / 2, y: height / 2, active: false };
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener("mouseleave", function () {
    mouse.active = false;
  });
  window.addEventListener("touchmove", function (e) {
    if (e.touches && e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  // Warm, quiet palette — this page reads more like a night sky than a network.
  var COLORS = ["#f4d99a", "#e8c273", "#fff6df", "#d9b168"];
  var COUNT = Math.min(90, Math.floor((width * height) / 18000));

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 1.6 + 0.6;
    this.vx = (Math.random() - 0.5) * 0.12;
    this.vy = (Math.random() - 0.5) * 0.12;
    this.twinkleSpeed = Math.random() * 0.015 + 0.005;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.twinklePhase += this.twinkleSpeed;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    if (mouse.active) {
      var dx = this.x - mouse.x;
      var dy = this.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var minDist = 100;
      if (dist < minDist && dist > 0.01) {
        var force = (minDist - dist) / minDist;
        this.x += (dx / dist) * force * 0.8;
        this.y += (dy / dist) * force * 0.8;
      }
    }
  };
  Particle.prototype.draw = function () {
    var twinkle = 0.35 + Math.sin(this.twinklePhase) * 0.25;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0.1, twinkle);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  var particles = [];
  for (var i = 0; i < COUNT; i++) particles.push(new Particle());

  function connect() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 70) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(232, 194, 115, " + (0.05 * (1 - dist / 70)) + ")";
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(10, 12, 20, 0.22)";
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();

    requestAnimationFrame(animate);
  }

  if (reduceMotion) {
    ctx.fillStyle = "rgba(10, 12, 20, 1)";
    ctx.fillRect(0, 0, width, height);
    particles.forEach(function (p) { p.draw(); });
    connect();
  } else {
    animate();
  }
})();
