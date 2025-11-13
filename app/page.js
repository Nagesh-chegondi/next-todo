"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6">📝 TodoMaster</h1>
        <p className="text-lg text-gray-600 mb-8">
          Organize your tasks, set goals and stay productive. Secure login using JWT.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg shadow"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("/todos")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Go to Todos
          </button>
        </div>
      </div>
    </main>
  );
}
