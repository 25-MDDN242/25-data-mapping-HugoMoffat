let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let curLayer = 0;

// change these three lines as appropiate
let sourceFile = "input_3.jpg";
let maskFile   = "mask_3.png";
let outputFile = "output_3.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  colorMode(HSB);
}

function draw () {
  if (curLayer == 0) {
    let num_lines_to_draw = 40; // get one scanline
    for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<1080; j++) {
      for(let i=0; i<1920; i++) {
        
        colorMode(RGB);
        let pixData = sourceImg.get(i, j); // pulls colour from input
        let col = color(pixData);

        colorMode(HSB, 360, 100, 100); // grayscale
        let h = hue(col);
        let s = saturation(col);
        let b = brightness(col);
        let new_brt = map(b, 0, 100, 30, 50);
        let new_col = color(h, 0, new_brt);
        set(i, j, new_col);
      }
    }
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  }
  else if (curLayer == 1) {

    for(let i=0; i<500; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      let maskData = maskImg.get(x1, y1);
      let x2 = x1 + random(-20, 20);
      let y2 = y1 + random(-20, 20);

      if(maskData[1] < 128) {
     
        colorMode(HSB);
        fill(color(sourceImg.get(x1, y1)))
        // RGB values from input now read in HSB
        rect(x1, y1, 4+(random(-3, 3)), 4+(random(-3, 3))) // varying sizes makes a cobbled texture

      }
    }
    renderCounter = renderCounter + 1;
  }
  else {
    rectMode(CORNERS);
    for(let i=0; i<100; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      let x2 = x1 + random(-10, 10);
      let y2 = y1 + random(-10, 10);
      colorMode(RGB);
      let pixData = sourceImg.get(x1, y1);
      let maskData = maskImg.get(x1, y1);
      let col = color(pixData);
      stroke(col);
      fill(col);
      if(maskData[1] < 128) {
      }
      else {
        quad(x1, y1, x2, y2, x1+0.5, y1+5, x2+5, y2+5)
        ellipse(x1, y1, 4+(random(-3, 3)), 4+(random(-3, 3)))
        // quads and ellipses together create a fuzzy, feltlike texture
      }
    }
    renderCounter = renderCounter + 1;
    // set(i, j, new_col);
  }
  // print(renderCounter);
  if(curLayer == 0 && renderCounter > 1080) {
    curLayer = 1;
    renderCounter = 0;
    print("Switching to curLayer 1");
  }
  if(curLayer == 1 && renderCounter > 500) {
    curLayer = 2;
    renderCounter = 0;
    print("Switching to curLayer 2");
  }
  else if(curLayer == 2 && renderCounter > 1500) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
