import { MdLocationOn, MdAlternateEmail } from "react-icons/md";
import { FaRetweet } from "react-icons/fa6";
import { FaRegGrinHearts } from "react-icons/fa";
import "./PostDetail.css";

const parseTagElementsFromMessage = (message) => {
  return message.split(/(\s#[\w]+)/g).map((part, index) => {
    if (part.startsWith(" #")) {
      const hashtag = part.trim();
      return (
        <span key={index} className='click-link' value={hashtag}>
          {" "}
          {hashtag}
        </span>
      );
    }
    return part;
  });
};


const parsePostedTime = (timestamp) => {
  const date = new Date(`${timestamp}Z`);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 86400000) {
    if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    }
    return `${Math.floor(diff / 3600000)}h ago`;
  }
 
  if (diff < 604800000) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }

  if (diff < 31536000000) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const PostDetail = ({ post }) => {
  return (
    <>
      <div className='post'>
        <div className='profile-section'>
          <div className='profile-icon'>
            <img src={post.image} alt={post.author} />
          </div>
          <div className='user-info'>
            <div className='name'>{post.author}</div>
            <div className='handle'>
              <MdAlternateEmail />
              {post.username}
            </div>
            <div className='location'>
              <MdLocationOn />
              {post.location}
            </div>
            <div className='date'>Posted: {parsePostedTime(post.date)}</div>
          </div>
        </div>
        <div className='message'>{parseTagElementsFromMessage(post.message)}</div>

        <div className='social-stats'>
              <div className='likes'>
                <FaRegGrinHearts />
                {post.likes}
              </div>
              <div className='reposts'>
                <FaRetweet />
                {post.reposts}
              </div>
            </div>
      </div>
    </>
  );
};

export default PostDetail;
