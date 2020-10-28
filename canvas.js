function load() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    drawBackground(ctx, canvas.width);
  }
}

function drawBackground(ctx, canvasWidth) {
  // ctx.fillStyle = '#f5f5f5';
  // ctx.fillRect(0, 0, canvasWidth, canvasWidth);

  var selectedBGColor = document.querySelector('input[name="bgColorRadio"]:checked');
  var selectedPalette = document.querySelector('label[for="' + selectedBGColor.id + '"] > svg');

  if (selectedPalette === null || selectedPalette.children.length === 0) {
    return false;
  } else if (selectedPalette.children.length === 1) {
    ctx.fillStyle = selectedPalette.children[0].attributes.fill.value;
  } else {
    var gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasWidth);
    var step = 1 / (selectedPalette.children.length - 1);
    for (i = 0; i < selectedPalette.children.length; i++) {
      var rect = selectedPalette.children[i];
      gradient.addColorStop(i*step, rect.attributes.fill.value);
    }
    ctx.fillStyle = gradient;
  }

  ctx.fillRect(0, 0, canvasWidth, canvasWidth);
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

function handleSubmit() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  drawBackground(ctx, canvas.width);
  drawText(ctx, canvas.width);
}
