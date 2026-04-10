export const resizeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      const size = 200; 

      canvas.width = size;
      canvas.height = size;

      const minSide = Math.min(img.width, img.height);
      const sx = (img.width - minSide) / 2;
      const sy = (img.height - minSide) / 2;

      ctx?.drawImage(
        img,
        sx,
        sy,
        minSide,
        minSide,
        0,
        0,
        size,
        size
      );

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/jpeg", 0.9);
    };

    img.src = URL.createObjectURL(file);
  });
};