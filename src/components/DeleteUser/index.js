import React, { useState, useEffect } from "react";

const DeleteUser = props => {
  const [post, setPost] = useState(props.currentPost);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setPost(props.currentPost);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.deletePost(post.id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {post.title} ?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Delete</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DeleteUser;