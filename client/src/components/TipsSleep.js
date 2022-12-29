/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion } from 'react-bootstrap/';
import { fetchTips } from '../actions';
import { loopingTip } from '../hooks/displayTips';
import Loading from './Loading';

export default function TipsSleep() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTips());
  }, []);
  const tips = useSelector((state) => state.tips);
  console.log(tips)
  const tipsMap = tips.map((tip,i) => (
          <Accordion.Item style={{width: '75%'}} eventKey={i} key={tip._id}>
            <Accordion.Header>{tip.name}</Accordion.Header>
            <Accordion.Body>{loopingTip(tip.content)}</Accordion.Body>
          </Accordion.Item>
        )
      )

  return ( 
    <div
      className="p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        marginTop: '5%',
        float: 'left',
        minWidth: '89%',
        minHeight: '100%',
      }}
    > {tips.length >0 ? 
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {tipsMap}
      </Accordion>
 : <Loading />}    </div>
  );
}
