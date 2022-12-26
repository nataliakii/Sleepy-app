/* eslint-disable prefer-const */
import _ from 'lodash';

const checkColForRender = (arr) => {
  let w3 = [];
  let w4 = [];
  let w5 = [];
  for (const doc of arr) {
    w3.push(doc.ww3);
    w4.push(doc.ww4);
    w5.push(doc.ww5);
  }
  return { w3: _.compact(w3), w4: _.compact(w4), w5: _.compact(w5) };
};

export default checkColForRender;
