class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });

    // right click to remove circle in partA
    this.canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault(); //prevent default right-click menu
      self.rightClickCanvas(e);
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
    //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      console.log("in A")

      //Update target position of all circles to follow mouse
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        this.objectsOnCanvas[i].targetX = this.mouseOffsetX;
        this.objectsOnCanvas[i].targetY = this.mouseOffsetY;
      }

    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
    if(this.drawingBoardId === "partD"){
      this.objectsOnCanvas[0].updatePositionRect(this.mouseOffsetX, this.mouseOffsetY);
    }
  }

  clickCanvas(e) {
    // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);

    //differentiate which canvas
    //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      console.log("in A")

      //Add a new circle at click position
      let radius = Math.floor(Math.random() * 25 + 10); //random size
      let r = Math.floor(Math.random() * 206 + 50);
      let g = Math.floor(Math.random() * 206 + 50);
      let b = Math.floor(Math.random() * 206 + 50);
      let color = `rgb(${r},${g},${b})`; //random color
      let newCircle = new CircularObj(this.mouseOffsetX, this.mouseOffsetY, radius, color, "#FFFFFF", this.context);
      this.addObj(newCircle);

    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
     if(this.drawingBoardId === "partD"){
      // pick a random color each click
      let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");
      this.objectsOnCanvas[0].changeColor(randomColor);
    }
  }

  rightClickCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    let mx = parseInt(e.clientX - this.canvasBoundingRegion.x);
    let my = parseInt(e.clientY - this.canvasBoundingRegion.y);

    if (this.drawingBoardId === "partA") {
      //remove the circle closest to right click position
      let closestIndex = -1;
      let closestDistance = Infinity;

      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        let obj = this.objectsOnCanvas[i];
        let distance = Math.sqrt((obj.x - mx) ** 2 + (obj.y - my) ** 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }
      if (closestIndex !== -1) {
        this.objectsOnCanvas = this.objectsOnCanvas.filter(function (obj, index) {
          return index !== closestIndex;
        });
      }
    }
  }

  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }

  }
}
