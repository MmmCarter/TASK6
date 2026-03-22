class FreeStyleObj {
    constructor(x, y, length, f_color, s_color,context) {
      // We write instructions to set up a Flower here
      // Position and size information
      this.x = x;
      this.y = y;
      this.fill_color = f_color;
      this.stroke_color = s_color;
      this.theta = 0;
      this.length = length;
      this.yOffset = 20;
      this.angularSpeed = .07;
      this.context =context;

      // NEW: mic-driven properties
      this.micVolume = 0;
      this.waveHeight = 5;

      // NEW: for animation
      this.yDirection = 1;
    }
  
    display() {
      this.theta =0; //reset everytime
      this.context.fillStyle = this.fill_color; // change the color we are using
      this.context.strokeStyle = this.stroke_color; // change the color we are using
      this.context.beginPath();
      this.context.moveTo(this.x,this.y)
      for(let i =this.x; i< this.x+this.length; i++){
      this.context.lineTo(i,(Math.sin(this.theta)*5)+this.y)
      this.context.lineTo(i,(Math.sin(this.theta)*5)+this.y+this.yOffset)
      this.theta+=this.angularSpeed;
      }
      this.context.stroke(); //set the stroke
    }

    update(){
      this.y += this.yDirection * 0.5;
      if (this.y > 200 || this.y < 50) {
        this.yDirection *= -1; // reverse direction
      }

      // MIC: volume affects wave height and angular speed
      this.waveHeight = 5 + this.micVolume * 30;      // louder = taller waves
      this.angularSpeed = 0.07 + this.micVolume * 0.1; // louder = faster waves
    }
  }