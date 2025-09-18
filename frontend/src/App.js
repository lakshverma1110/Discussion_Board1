import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import DiscussionList from "./DiscussionList";
import PostList from "./PostList";
import AddDiscussion from "./AddDiscussion";

function AppContent() {
  const { user, logout } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchDiscussions = async () => {
    const res = await fetch("http://localhost:5000/api/discussions");
    const data = await res.json();
    setDiscussions(data);
  };

  const handleAddDiscussion = async (title) => {
    const res = await fetch("http://localhost:5000/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, createdBy: user.username }),
    });
    const newDiscussion = await res.json();
    setDiscussions([...discussions, newDiscussion]);
  };

  const handleAddPost = async (text) => {
    const discussion = discussions[selectedIndex];
    const res = await fetch(`http://localhost:5000/api/discussions/${discussion._id}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, author: user.username }),
    });
    const updated = await res.json();
    const newDiscussions = discussions.map(d => d._id === updated._id ? updated : d);
    setDiscussions(newDiscussions);
  };

  const handleVote = async (index, type) => {
    const discussion = discussions[index];
    const res = await fetch(`http://localhost:5000/api/discussions/${discussion._id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, type }),
    });
    const updated = await res.json();
    const newDiscussions = discussions.map(d => d._id === updated._id ? updated : d);
    setDiscussions(newDiscussions);
  };

  useEffect(() => { fetchDiscussions(); }, []);

  if (!user) return <Login />;

  return (
    <div className="app-container">
      <header>
        <h1>Discussion Board</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <div className="main">
        <aside>
          <AddDiscussion onAdd={handleAddDiscussion} />
          <DiscussionList
            discussions={discussions}
            onSelect={setSelectedIndex}
            selectedIndex={selectedIndex}
            onVote={handleVote}
            currentUser={user.username}
          />
        </aside>
        <section>
          <PostList
            posts={discussions[selectedIndex]?.posts || []}
            onAddPost={handleAddPost}
          />
        </section>
      </div>
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
