/* eslint-disable no-plusplus */
import _ from 'lodash';

export const loopingTip = (content) => {
  const keyRand = _.random(9329);
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
  const loopText = (text) => text.map((t) => <div>{t}</div>);

  const contentTOreturn = content.map((p) => (
    <>
      {' '}
      <h5 key={keyRand}>{p.title}</h5>
      <div>{loopText(p.text)}</div> {checkExpertTip(p)}{' '}
    </>
  ));
  return contentTOreturn;
};
