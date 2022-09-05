import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPost,
  getCreatePost,
  getUpdatePost,
  getDeletedPost,
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [loading, setLoading] = useState(false);

  const [currentPost, setCurrentPost] = useState({
    title : "",
    content : "",
    date : null ,
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedPosts, setSavedPosts] = useState(users);

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination

  // Search
  const search = term => {
    if (term.length > 2) {
      const results = savedPosts.filter(post =>
        Object.keys(post).some(key =>
          post[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );
          console.log(results ,'result')
      dispatch({ type: "SET_USERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_USERS", data: savedPosts });
    }
  };


  // Create Post
  const createPost = async Post => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatePost(Post).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Post created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_USER", data: result });
          setSavedPosts([...users, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create Post."
      });
    } finally {
      setLoading(false);
    }
  };


  // Update Post
  const updateRow = post => {
    setModal("Update Post");

    setCurrentPost({
      id : post._id,
      title : post.title,
      content : post.content,
      date : post.date ,
    });
  };

  const updatePost = async (id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatePost(id, updatedUser).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Post updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.map(post =>
              post.id === id ? Object.assign(post, result) : post
            )
          });
          fetchUsers();
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update Post."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Post
  const deleteRow = post => {
    setModal("Delete Post");

    setCurrentPost({
      id : post._id,
      title : post.title,
      content : post.content,
      date : post.date ,
    });
  };

  const deletePost = async id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedPost(id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "Post deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.filter(post => post.id !== id)
          });
          setSavedPosts(savedPosts.filter(post => post.id !== id));
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete Post."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      await getPost().then(({ data }) => {
        console.log(data ,'data')
        setSavedPosts(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch posts."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <Search search={search} resetSearch={search} />
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create Post")}
                >
                  Create New Post
                </button>
              </div>
              <DataTable
                users={savedPosts}
                updateRow={updateRow}
                deleteRow={deleteRow}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create Post" && (
            <CreateUser
              createPost={createPost}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Post" && (
            <UpdateUser
              currentPost={currentPost}
              updatePost={updatePost}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Post" && (
            <DeleteUser
              currentPost={currentPost}
              deletePost={deletePost}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default App;
