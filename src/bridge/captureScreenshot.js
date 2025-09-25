const CANVAS_SCALE = 3;

const readBlobAsDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

export const captureScreenshot = async () => {
  if (typeof window === 'undefined') {
    throw new Error('captureScreenshot can only run in a browser context');
  }

  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(document.body, {
    backgroundColor: null,
    scale: CANVAS_SCALE,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      try {
        if (!blob) {
          reject(new Error('Unable to produce a screenshot blob.'));
          return;
        }

        const dataUrl = await readBlobAsDataUrl(blob);
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const handleScreenshotRequest = async (callback) => {
  try {
    const dataUrl = await captureScreenshot();
    callback(dataUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to capture screenshot via html2canvas', error);
    callback(undefined);
  }
};
