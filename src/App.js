import React, { useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import DiscussionList from "./DiscussionList";
import PostList from "./PostList";
import AddDiscussion from "./AddDiscussion";
import Popup from "./Popup";

function AppContent() {
  const { user, logout, popup } = useAuth();
  const [discussions, setDiscussions] = useState([
    {
      title: "Welcome!",
      posts: [{ text: "Hello world 👋", author: "System" }],
      likes: 0,
      dislikes: 0,
      createdBy: "System",
      voters: {}, // { username: "like" | "dislike" }
    },
    {
      title: "General Chat",
      posts: [{ text: "Start the discussion here!", author: "System" }],
      likes: 0,
      dislikes: 0,
      createdBy: "System",
      voters: {},
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddDiscussion = (newDiscussion) => {
    setDiscussions([
      ...discussions,
      {
        ...newDiscussion,
        likes: 0,
        dislikes: 0,
        createdBy: user.username,
        voters: {},
      },
    ]);
    setSelectedIndex(discussions.length);
  };

  const handleDeleteDiscussion = (index) => {
    const updated = discussions.filter((_, i) => i !== index);
    setDiscussions(updated);
    setSelectedIndex(0);
  };

  const handleAddPost = (newPostText) => {
    if (!discussions[selectedIndex]) return;

    const updated = [...discussions];
    updated[selectedIndex] = {
      ...updated[selectedIndex],
      posts: [...updated[selectedIndex].posts, { text: newPostText, author: user.username }],
    };
    setDiscussions(updated);
  };

  const handleVote = (index, type) => {
    if (!discussions[index]) return;

    const updated = [...discussions];
    const discussion = updated[index];

    // prevent multiple votes from same user
    const prevVote = discussion.voters[user.username];

    if (prevVote === type) {
      // undo vote
      if (type === "like") discussion.likes -= 1;
      else discussion.dislikes -= 1;
      delete discussion.voters[user.username];
    } else {
      if (prevVote === "like") discussion.likes -= 1;
      if (prevVote === "dislike") discussion.dislikes -= 1;

      if (type === "like") discussion.likes += 1;
      if (type === "dislike") discussion.dislikes += 1;

      discussion.voters[user.username] = type;
    }

    setDiscussions(updated);
  };

  if (!user) {
    return (
      <>
        <Login />
        <Popup message={popup?.message} type={popup?.type} />
      </>
    );
  }

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
            onDelete={handleDeleteDiscussion}
            onVote={handleVote}
            selectedIndex={selectedIndex}
            currentUser={user.username}
          />
        </aside>

        <section className="content">
          <PostList
            posts={discussions[selectedIndex]?.posts || []}
            onAddPost={handleAddPost}
          />
        </section>
      </main>

      <Popup message={popup?.message} type={popup?.type} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
