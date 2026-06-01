import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

function copy(src, dest) {
  if (!existsSync(dirname(dest))) {
    mkdirSync(dirname(dest), { recursive: true });
  }
  copyFileSync(src, dest);
  console.log('Copied ' + src + ' to ' + dest);
}

copy('C:\\Projects\\raymond-gray-platform\\public\\RaymondGray.svg', 'C:\\Projects\\raymond-gray-remote-support\\public\\RaymondGray.svg');
copy('C:\\Projects\\raymond-gray-platform\\public\\raymond-gray-logo.webp', 'C:\\Projects\\raymond-gray-remote-support\\public\\raymond-gray-logo.webp');

// Fonts
const fontsToCopy = [
  'Avenir Next Font.ttf',
  'Cardo-Regular.ttf',
  'Gotham-Book.otf',
  'Gotham-Medium.otf',
  'Gotham-Bold.otf',
  'Montserrat-Regular.ttf',
  'Montserrat-Medium.ttf',
  'Montserrat-Bold.ttf'
];

fontsToCopy.forEach(font => {
  try {
    copy('C:\\Projects\\raymond-gray-platform\\fonts\\fonts\\' + font, 'C:\\Projects\\raymond-gray-remote-support\\public\\fonts\\' + font);
  } catch(e) {
    console.error('Failed to copy ' + font);
  }
});

console.log('Done.');
