import shapes from "./shapes";

function drawPath(ctx, { d, fill }) {
  const path = new Path2D(d);
  ctx.fillStyle = fill;
  ctx.fill(path);
  ctx.stroke(path);
}

function getSpecs(shape, result) {
  const specifications = {
    d: shape.path, // svg path data
    fill: shape.fill, // shades of grey for default
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
  shapes.forEach(shape => {
    // loop it by shape because there isn't always data for each canton
    const canton = shape.canton; // get the canton code from the shapes array
    const result = results ? results.find(x => x.canton === canton) : null; // get the results that correspond to the canton code
    const specifications = getSpecs(shape, result); // { path, fill, alpha, yes, no }

    ctx.globalAlpha = specifications.alpha; // reset the alpha value

    drawPath(ctx, specifications);
  });
}

export { drawCanvas };
