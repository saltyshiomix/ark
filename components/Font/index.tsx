const FontFaceObserver = require('fontfaceobserver');

require('typeface-roboto');

export const InitializeFonts = () => {
  const roboto = new FontFaceObserver('Roboto');

  // non-blocking loading fonts
  roboto.load().then(() => {
    document.documentElement.classList.add('roboto');
  });
};
