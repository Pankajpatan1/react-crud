import React, { useState } from "react";

const CreateUser = props => {
  const initialData = { id: null, title: "", content: "", date: "" };
  const [post, setPost] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!post.title || !post.content) return;
        props.createPost(post);
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
        <label>date</label>
        <input
          type="date"
          name="date"
          value={post.date}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
