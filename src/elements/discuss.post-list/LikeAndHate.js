import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function LikeAndHate(props) {
  const { postOid } = props;

  const [isVoteing, set_isVoteing] = useState(0);

  const dispatch = useDispatch();
  const { postKvs, voteKvs } = useSelector((state) => state.discuss);
  const postDoc = postKvs?.[postOid];
  const voteVal = voteKvs?.[postOid];

  const meLiked = voteVal === 1 ? true : false;
  const meHated = voteVal === 2 ? true : false;

  useEffect(() => {
    window.resizeFrameHeight();
  });

  const onClick_vote = (type) => {
    let voteVal = 0;
    if (type === 'like' && meLiked === false) {
      voteVal = 1;
    }
    if (type === 'hate' && meHated === false) {
      voteVal = 2;
    }

    const data = {
      postOid,
      voteVal,
    };
    set_isVoteing(1);
    Redux.networks.discuss_votePost(data)
      .then((resp) => resp.json())
      .then((json) => {

        const {
          postOid,
          voteVal,
          incLike,
          incHate,
        } = json.res;

        dispatch(Redux.actions.discuss.set_voteKvs({
          postOid,
          voteVal,
        }));

        dispatch(Redux.actions.discuss.inc_post_LikeAndHate({
          postOid,
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
        { postDoc.countLike > 0 &&
          <small className="me-1 d-inline-block">{postDoc.countLike}</small>
        }
        <i className="fas fa-chevron-up"></i>
      </span>
    );
  };

  const HateBtnDom = () => {
    return (
      <span className={`cursor-pointer ${meHated ? 'text-danger' : ''}`} onClick={() => onClick_vote('hate')}>
        <i className="fas fa-chevron-down"></i>
        { postDoc.countHate > 0 &&
          <small className="ms-1 d-inline-block">{postDoc.countHate}</small>
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
    <div className="d-flex align-items-center discuss-vote">
      <LikeAndHateBtnsDom />
    </div>
  );
}

export default LikeAndHate;