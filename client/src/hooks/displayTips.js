/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-plusplus */
import _ from 'lodash';
import React, { useMemo } from 'react';

export const loopingTip = (content) => {
  const keyRand = useMemo(() => _.random(9329), []);
  const checkExpertTip = (par) => {
    if (par.expertTip) {
      return (
        <>
          <code>Expert Tip : </code>
          {par.expertTip}
        </>
      );
    }
  };
  const loopText = (text, i) =>
    text.map((t) => <div key={`looptext${keyRand}${i}`}>{t}</div>);

  const contentTOreturn = content.map((p, i) => (
    <div key={`content${keyRand}${i}`}>
      {' '}
      <h5>{p.title}</h5>
      <div>{loopText(p.text)}</div> {checkExpertTip(p)}{' '}
    </div>
  ));
  return contentTOreturn;
};
