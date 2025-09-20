import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import DiscussionList from "./DiscussionList";
import PostList from "./PostList";
import AddDiscussion from "./AddDiscussion";
import "./App.css";

function AppContent() {
  const { user, logout } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch discussions from backend
  const fetchDiscussions = async () => {
    const res = await fetch("http://localhost:5000/api/discussions");
    const data = await res.json();
    setDiscussions(data);
  };

  useEffect(() => {
    if (user) fetchDiscussions();
  }, [user]);

  // Add new discussion
  const handleAddDiscussion = async (title) => {
    if (!title) return;
    const res = await fetch("http://localhost:5000/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, createdBy: user.username }),
    });
    const newDiscussion = await res.json();
    setDiscussions((prev) => [...prev, newDiscussion]);
  };

  // Delete discussion
  const handleDeleteDiscussion = async (id) => {
    await fetch(`http://localhost:5000/api/discussions/${id}`, {
      method: "DELETE",
    });
    setDiscussions((prev) => prev.filter((d) => d._id !== id));
    setSelectedIndex(0);
  };

  // Add post
  const handleAddPost = async (discussionId, text) => {
    if (!text) return;
    const res = await fetch(
      `http://localhost:5000/api/discussions/${discussionId}/posts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author: user.username }),
      }
    );
    const updatedDiscussion = await res.json();
    setDiscussions((prev) =>
      prev.map((d) => (d._id === discussionId ? updatedDiscussion : d))
    );
  };

  // Delete post
  const handleDeletePost = async (discussionId, postId) => {
    await fetch(
      `http://localhost:5000/api/discussions/${discussionId}/posts/${postId}`,
      { method: "DELETE" }
    );
    setDiscussions((prev) =>
      prev.map((d) =>
        d._id === discussionId
          ? { ...d, posts: d.posts.filter((p) => p._id !== postId) }
          : d
      )
    );
  };

  // Like/Dislike (only once per user)
  const handleVote = async (discussionId, type) => {
    setDiscussions((prev) =>
      prev.map((d) => {
        if (d._id === discussionId) {
          const hasLiked = d.likedBy?.includes(user.username);
          const hasDisliked = d.dislikedBy?.includes(user.username);

          // Stop if user already voted the same way
          if ((type === "like" && hasLiked) || (type === "dislike" && hasDisliked)) {
            return d;
          }

          // Send vote to backend
          fetch(`http://localhost:5000/api/discussions/${discussionId}/vote`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user.username, type }),
          })
            .then((res) => res.json())
            .then((updatedDiscussion) => {
              setDiscussions((prev) =>
                prev.map((disc) =>
                  disc._id === discussionId ? updatedDiscussion : disc
                )
              );
            });

          return d; // optimistic update handled by backend
        }
        return d;
      })
    );
  };

  if (!user) return <Login />;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Discussion Board</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <AddDiscussion onAdd={handleAddDiscussion} />
          <DiscussionList
            discussions={discussions}
            onSelect={setSelectedIndex}
            onVote={handleVote}
            onDelete={handleDeleteDiscussion}
            selectedIndex={selectedIndex}
            currentUser={user.username}
          />
        </aside>

        <section className="content">
          <PostList
            posts={discussions[selectedIndex]?.posts || []}
            onAddPost={(text) =>
              handleAddPost(discussions[selectedIndex]._id, text)
            }
            onDeletePost={(postId) =>
              handleDeletePost(discussions[selectedIndex]._id, postId)
            }
            currentUser={user.username}
          />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
