var getClosestColor = function(yourColor, colorList) {
  var yourRgb = hexToRgb(yourColor);
  var yourHsv = rgbToHsv(yourRgb[0], yourRgb[1], yourRgb[2]);
  var goalHue = yourHsv[0];
  var currRgb, currHsv;
  var currHueDistance;
  var closestHueDistance = 360;
  var closestColor;
  for (color in colorList) {
    currRgb = hexToRgb(colorList[color]);
    currHsv = rgbToHsv(currRgb[0], currRgb[1], currRgb[2]);
    currHueDistance = Math.abs(goalHue - currHsv[0]);
    if (currHueDistance < closestHueDistance) {
      closestHueDistance = currHueDistance;
      closestColor = colorList[color];
    }
  }

  return closestColor;
};

function rgbToHex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ?
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

// yourColor is a hex color. 6 digits 0-9 and A-F. Do not include #.
// colorList is an array of hex colors.
var getComplimentaryColor = function(yourColor, colorList) {
  var yourRgb = hexToRgb(yourColor);
  var yourHsv = rgbToHsv(yourRgb[0], yourRgb[1], yourRgb[2]);
  var goalComplimentaryHue = yourHsv[0] - 180;
  if (goalComplimentaryHue < 0) {
    goalComplimentaryHue = 360 + goalComplimentaryHue;
  }
  var currRgb, currHsv;
  var currHueDistance;
  var closestHueDistance = 360;
  var closestColor;
  for (color in colorList) {
    currRgb = hexToRgb(colorList[color]);
    currHsv = rgbToHsv(currRgb[0], currRgb[1], currRgb[2]);
    currHueDistance = Math.abs(goalComplimentaryHue - currHsv[0]);
    if (currHueDistance < closestHueDistance) {
      closestHueDistance = currHueDistance;
      closestColor = colorList[color];
    }
  }

  return closestColor;
};


// Hex color is 6 digits 0-9 and A-F. Do not include #.
var hexToRgb = function(hexColor) {
  var r = parseInt(hexColor.substr(0, 2), 16);
  var g = parseInt(hexColor.substr(2, 2), 16);
  var b = parseInt(hexColor.substr(4, 2), 16);

  return [r, g, b];
};


// Red, green, blue are each in the range 0-255.
var rgbToHsv = function(red, green, blue) {
  var max = Math.max(Math.max(red, green), blue);
  var min = Math.min(Math.min(red, green), blue);
  var hue;
  var saturation;
  var value = max;
  if (min == max) {
    hue = 0;
    saturation = 0;
  } else {
    var delta = (max - min);
    saturation = delta / max;

    if (red == max) {
      hue = (green - blue) / delta;
    } else if (green == max) {
      hue = 2 + ((blue - red) / delta);
    } else {
      hue = 4 + ((red - green) / delta);
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
    if (hue > 360) {
      hue -= 360;
    }
  }

  return [hue, saturation, value];
};
