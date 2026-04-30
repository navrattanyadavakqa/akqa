import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const CELL_CLASSES = [
  'product-list-image',
  'product-list-title',
  'product-list-price',
  'product-list-description',
];

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    [...row.children].forEach((cell, i) => {
      cell.className = CELL_CLASSES[i] || 'product-list-cell';
      li.append(cell);
    });
    ul.append(li);
  });
  ul.querySelectorAll('.product-list-image picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);
}
