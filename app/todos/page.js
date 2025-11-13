"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export default function TodosPage() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTodos(token);
  }, []);

  async function fetchTodos(token) {
    try {
      const res = await fetch("/api/getTodos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      const data = await res.json();
      setTodos(data.todos || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function addTodo() {
    if (!title) return;
    setLoading(true);
    const token = getToken();
    try {
      const res = await fetch("/api/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, title }),
      });
      if (res.ok) {
        setTitle("");
        fetchTodos(token);
      } else {
        alert("Failed to add");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTodo(t) {
    const token = getToken();
    try {
      const res = await fetch("/api/removeTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, title: t }),
      });
      if (res.ok) {
        fetchTodos(token);
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Your Todos</h1>
          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-600" onClick={signOut}>Sign out</button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="New todo title"
          />
          <button onClick={addTodo} className="bg-green-500 text-white px-4 py-2 rounded">
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        <ul className="space-y-2">
          {todos.length === 0 && <li className="text-gray-500">No todos yet.</li>}
          {todos.map((t) => (
            <li key={t._id} className="flex justify-between items-center p-2 border rounded">
              <span>{t.titles}</span>
              <button onClick={() => deleteTodo(t.titles)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
