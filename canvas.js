function load() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    drawBackground(ctx);
  }
}

function drawBackground(ctx) {
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(ctx, canvasWidth) {
  var text = document.getElementById("input-textarea").value;
  var lines = text.split('\n');

  var lineHeight = 128;
  var totalLineHeight = lineHeight * lines.length;
  // find the midpoint of the canvas. Lower the canvas midpoint by half the
  // line height so that the midpoint of the font lies on the midpoint of the
  // canvas.
  var topOffset = ((canvasWidth - totalLineHeight) / 2) + (lineHeight/2);
  var leftOffset = canvasWidth / 2;

  ctx.font = "96px 'Noto Serif'";
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.textAlign = "center";
  var count = 0;
  for (const v of lines) {
    ctx.fillText(v, leftOffset, topOffset+(lineHeight*count));
    count++;
  }
}

function handleTextChange() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  drawBackground(ctx);
  drawText(ctx, canvas.width);
}
