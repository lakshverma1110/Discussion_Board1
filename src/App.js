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
    { title: "Welcome!", posts: ["Hello world 👋"] },
    { title: "General Chat", posts: ["Start the discussion here!"] },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddDiscussion = (newDiscussion) => {
    setDiscussions([...discussions, newDiscussion]);
    setSelectedIndex(discussions.length);
  };

  const handleAddPost = (newPost) => {
    const updated = [...discussions];
    updated[selectedIndex].posts.push(newPost);
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
            selectedIndex={selectedIndex}
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
