const RandomAvatar = (size) => {
    const randomColor = () =>
      '#' + Math.floor(Math.random() * 8388607 + 8388607).toString(16);
    const randomRotation = () => Math.random() * 360;
    const randomPosition = () => ({
      x: Math.random() * size * 0.7,
      y: Math.random() * size * 0.7
    });
  
    const rectangles = Array.from({ length: 3 }).map((_, index) => {
      const color = randomColor();
      const rotation = randomRotation();
      const position = randomPosition();
  
      return `<rect
          key="${index}"
          x="${0}"
          y="${0}"
          width="100%"
          height="100%"
          transform="${`translate(${position.x} ${
            position.y
          }) rotate(${rotation} ${size / 2} ${size / 2})`}"
          fill="${color}"
        />`;
    });
  
    return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
          <rect width="${size}" height="${size}" fill="${randomColor()}" />
        ${rectangles.join('')}
      </svg>`;
};
  
const svg2img = (size = 100) =>
    `data:image/svg+xml;base64,${Buffer.from(RandomAvatar(size)).toString(
      'base64'
)}`;
  
const removeW = (word) => {
    if (word.startsWith('w') || word.startsWith('W')) {
      return word.slice(1); // Remove the first character
    } else {
      return word; // Return the original string
    }
}

module.exports = {
    RandomAvatar,
    svg2img,
    removeW
}
