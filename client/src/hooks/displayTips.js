/* eslint-disable no-plusplus */
export const loopingTip = (content) => {
  const checkExpertTips = (par) => {
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
      <h5>{p.title}</h5>
      <div>{loopText(p.text)}</div> {checkExpertTips(p)}{' '}
    </>
  ));
  return contentTOreturn;
};
