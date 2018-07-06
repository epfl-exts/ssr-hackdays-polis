import paths from "./map-paths"; // contains the paths for drawing the map

function drawPath(ctx, { d, fill }) {
  const path = new Path2D(d);
  ctx.fillStyle = fill;
  ctx.fill(path);
  ctx.stroke(path);
}

function getSpecs(path, result) {
  const specifications = {
    d: path.path, // svg path data
    fill: path.fill, // shades of grey for default
    alpha: 1, // default
    yes: null,
    no: null
  };

  if (result) {
    const yes = result.yes;
    const no = result.no;

    if (yes > no) {
      specifications.fill = "#007500"; // green
      specifications.alpha = yes / (yes + no); // % yes
    } else {
      specifications.fill = "#db2f27"; // red
      specifications.alpha = no / (yes + no); // % no
    }
  }

  return specifications;
}

function drawCanvas(ctx, results) {
  ctx.translate(0, - 68.5); // toDo: crop the SVG so that this isn't necessary
  paths.forEach(path => {
    // loop it by path because there isn't always data for each canton
    const canton = path.canton; // get the canton code from the paths array
    const result = results ? results.find(x => x.canton === canton) : null; // get the results that correspond to the canton code
    const specifications = getSpecs(path, result); // { path, fill, alpha, yes, no }

    ctx.globalAlpha = specifications.alpha; // reset the alpha value

    drawPath(ctx, specifications);
  });
  ctx.translate(0, 68.5); // toDo: crop the SVG so that this isn't necessary
}

export { drawCanvas };
