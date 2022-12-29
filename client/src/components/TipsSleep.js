/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion } from 'react-bootstrap/';
import { fetchTips } from '../actions';
// import { loopingTip } from '../hooks/displayTips';
import Loading from './Loading';

export default function TipsSleep() {
  const keyRand = useMemo(() => _.random(9345329), []);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('dispatching Tips')
    dispatch(fetchTips());
  }, []);
  const tips = useSelector((state) => state.tips);

  const loopingTip = (content) => {
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
    const loopText = (text) =>
      text.map((t,i) => <div key={`looptext${keyRand}${i}`}>{t}</div>);
  
    const contentTOreturn = content.map((p, i) => (
      <div key={`content${keyRand}${i}`}>
        {' '}
        <h5>{p.title}</h5>
        <div>{loopText(p.text)}</div> {checkExpertTip(p)}{' '}
      </div>
    ));
    return contentTOreturn;
  };
  
  return ( 
    <div
      className="p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        marginTop: '5%',
        minWidth: '85%',
        minHeight: '100%',
      }}
    > {tips.length >0 ? 
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {tips.map((tip,i) => (
          <Accordion.Item style={{width: '75%'}} eventKey={i} key={tip._id}>
            <Accordion.Header>{tip.name}</Accordion.Header>
            <Accordion.Body>{loopingTip(tip.content)}</Accordion.Body>
          </Accordion.Item>
        )
      )}
      </Accordion>
 : <Loading />}    </div>
  );
}
