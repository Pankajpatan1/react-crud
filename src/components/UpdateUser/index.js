import React, { useState, useEffect } from "react";

const UpdateUser = props => {
  const [post, setPost] = useState(props.currentPost);

  const onInputChange = event => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

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
        props.updatePost(post.id, post);
      }}
    >
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <input
          type="text"
          name="content"
          value={post.content}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={post.date}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;
