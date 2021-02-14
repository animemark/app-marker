import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function LikeAndHate(props) {
  const { markOid } = props;

  const [isVoteing, set_isVoteing] = useState(0);

  const dispatch = useDispatch();
  const { markKvs, voteKvs } = useSelector((state) => state.marking);
  const markDoc = markKvs?.[markOid];
  const voteVal = voteKvs?.[markOid];

  const meLiked = voteVal === 1 ? true : false;
  const meHated = voteVal === 2 ? true : false;

  const onClick_vote = (type) => {
    let voteVal = 0;
    if (type === 'like' && meLiked === false) {
      voteVal = 1;
    }
    if (type === 'hate' && meHated === false) {
      voteVal = 2;
    }

    const data = {
      markOid,
      voteVal,
    };
    set_isVoteing(1);
    Redux.networks.marking_voteMark(data)
      .then((resp) => resp.json())
      .then((json) => {

        const {
          markOid,
          voteVal,
          incLike,
          incHate,
        } = json.res;

        dispatch(Redux.actions.marking.set_voteKvs({
          markOid,
          voteVal,
        }));

        dispatch(Redux.actions.marking.inc_mark_LikeAndHate({
          markOid,
          incLike,
          incHate,
        }));

        set_isVoteing(0);
      })
      .catch((err) => {
        console.log(err);
        set_isVoteing(0);
      });
  };

  const LikeBtnDom = () => {
    return (
      <span className={`cursor-pointer ${meLiked ? 'text-success' : ''}`} onClick={() => onClick_vote('like')}>
        { markDoc.countLike > 0 &&
          <small className="me-1 d-inline-block">{markDoc.countLike}</small>
        }
        <i className="fas fa-chevron-up"></i>
      </span>
    );
  };

  const HateBtnDom = () => {
    return (
      <span className={`cursor-pointer ${meHated ? 'text-danger' : ''}`} onClick={() => onClick_vote('hate')}>
        <i className="fas fa-chevron-down"></i>
        { markDoc.countHate > 0 &&
          <small className="ms-1 d-inline-block">{markDoc.countHate}</small>
        }
      </span>
    );
  };

  const LikeAndHateBtnsDom = () => {
    if (isVoteing) {
      return (<i className="fas fa-circle-notch fa-spin"></i>);
    }
    return (
      <>
        <LikeBtnDom />
        <small className="mx-2">|</small>
        <HateBtnDom />
      </>
    );
  };

  return (
    <div className="d-flex align-items-center marking-vote">
      <LikeAndHateBtnsDom />
    </div>
  );
}

export default LikeAndHate;