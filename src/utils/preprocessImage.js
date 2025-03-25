
export function preprocessImage(image) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = img.width;
        canvas.height = img.height;
  
        ctx.drawImage(img, 0, 0);
        
        // Convert to Grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
  
        for (let i = 0; i < data.length; i += 4) {
          let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // Red
          data[i + 1] = avg; // Green
          data[i + 2] = avg; // Blue
        }
  
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL());
      };
    });
  }