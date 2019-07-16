// Gradients

// Horizontal gradient, from left to right
//
// Creates two color stops, start and end, by specifying a color and position for each color stop.
export const gradientHorizontal = (
  startColor = '#555',
  endColor = '#333',
  startPercent = '0%',
  endPercent = '100%'
) => `
  background-image: linear-gradient(to right, ${startColor} ${startPercent}, ${endColor} ${endPercent});
  background-repeat: repeat-x;
`;

// Vertical gradient, from top to bottom
//
// Creates two color stops, start and end, by specifying a color and position for each color stop.
export const gradientVertical = (
  startColor = '#555',
  endColor = '#333',
  startPercent = '0%',
  endPercent = '100%'
) => `
  background-image: linear-gradient(to bottom, ${startColor} ${startPercent}, ${endColor} ${endPercent});
  background-repeat: repeat-x;
`;

export const gradientDirectional = (
  startColor = '#555',
  endColor = '#333',
  deg = '45deg'
) => `
  background-repeat: repeat-x;
  background-image: linear-gradient(${deg}, ${startColor}, ${endColor});
`;
export const gradientHorizontalThreeColors = (
  startColor = '#00b3ee',
  midColor = '#7a43b6',
  colorStop = '50%',
  endColor = '#c3325f'
) => `
  background-image: linear-gradient(to right, ${startColor}, ${midColor} ${colorStop}, ${endColor});
  background-repeat: no-repeat;
`;
export const gradientVerticalThreeColors = (
  startColor = '#00b3ee',
  midColor = '#7a43b6',
  colorStop = '50%',
  endColor = '#c3325f'
) => `
  background-image: linear-gradient(${startColor}, ${midColor} ${colorStop}, ${endColor});
  background-repeat: no-repeat;
`;
export const gradientRadial = (innerColor = '#555', outerColor = '#333') => `
  background-image: radial-gradient(circle, ${innerColor}, ${outerColor});
  background-repeat: no-repeat;
`;
export const gradientStriped = (
  color = 'rgba(255,255,255,.15)',
  angle = '45deg'
) => `
  background-image: linear-gradient(${angle}, ${color} 25%, transparent 25%, transparent 50%, ${color} 50%, ${color} 75%, transparent 75%, transparent);
`;
