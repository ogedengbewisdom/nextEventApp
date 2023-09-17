import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const [list, setList] = useState([])

  const fetchComment = async () => {
    try {
      const response = await fetch("/api/comment/" + eventId)
      if (!response.ok) {
        throw new Error("Something went wrong")
      }
      const data = await response.json();
      setList(data.comment)
    } catch(error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    if (eventId || showComments) {
      fetchComment()
    }
  }, [eventId, showComments]);

  const addCommentHandler = async (commentData) => {
    // send data to API
    try {
      const response = await fetch("/api/comment/" + eventId, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(!response.ok) {
        throw new Error("Something went wrong")
      }
      const resData = await response.json();
      console.log(resData.comment)
    } catch(error) {
      console.log(error.message)
    }
    
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={list} />}
    </section>
  );
}

export default Comments;