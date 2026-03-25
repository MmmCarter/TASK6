class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.context = context;

    //microphone-driven properties
    this.micVolume = 0;

    //base size
    this.baseWidth = w;
    this.baseHeight = h;

    //drifting position
    this.angle = 0;
    this.orbitRadius = 40;
    this.centerX = x;
    this.centerY = y;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    //update freestyle
    // this.x+=1;
    //console.log("rectangle update")
    //orbit around center point
    this.angle += 0.02;
    this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
    this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

    //size scales with mic volume
    this.width = this.baseWidth + this.micVolume * 100;
    this.height = this.baseHeight + this.micVolume * 80;

    //color shifts with mic volume
    let red = Math.floor(255 * this.micVolume);
    let green = Math.floor(255 * (1 - this.micVolume));
    let blue = Math.floor(255 * (1 - this.micVolume));
    this.fill_color = `rgb(${red}, ${green}, ${blue})`;
  }
}
