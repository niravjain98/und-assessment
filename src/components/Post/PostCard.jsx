import React from "react";
import "./PostCard.css";
import useModal from "../../hooks/useModal";
import PostDetail from "./PostDetail";

const parseTagElementsFromMessage = (message, handleHashTagClick) => {
  return message.split(/(\s#[\w]+)/g).map((part, index) => {
    if (part.startsWith(" #")) {
      const hashtag = part.trim();
      return (
        <span key={index} className='click-link' value={hashtag} onClick={handleHashTagClick}>
          {" "}{hashtag}
        </span>
      );
    }
    return part;
  });
};

const PostCard = ({ post, handleHashTagClick }) => {
  const { Modal, updateModalState, isModalOpen } = useModal();

  const showPost = (event) => {
    updateModalState(true);
    event.preventDefault();
  };

  return (
    <>
    <div className='post-card' onClick={showPost}>
      <div className='profile-section'>
        <div className='profile-icon'>
          <img src={post.image} alt={post.author} />
        </div>
        <div className='user-info'>
          <div className='name'>{post.author}</div>
          <div className='handle'>{"@"+post.username}</div>
        </div>
      </div>
      <div className='message'>{parseTagElementsFromMessage(post.message, handleHashTagClick)}</div>
    </div>
    {isModalOpen && (
      <Modal>
        <PostDetail post={post}/>
      </Modal>
    )}
    </>
  );
};

export default PostCard;
