"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Signin failed");
        setBusy(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/todos");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

        <label className="block mb-2 text-sm text-gray-600">Email</label>
        <input
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <label className="block mb-2 text-sm text-gray-600">Password</label>
        <input
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          {busy ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-blue-600 underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
