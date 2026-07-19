import { useState } from "react";
import { supabase } from "../supabase";

export default function Login({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("로그인 실패: 이메일 또는 비밀번호를 확인해 주세요.");
      setLoading(false);
      return;
    }

    const authUser = data.user;

    setUser({
      id: authUser.id,
      email: authUser.email,
      name:
        authUser.user_metadata?.name ||
        authUser.user_metadata?.full_name ||
        authUser.email?.split("@")[0] ||
        "사용자",
      school: authUser.user_metadata?.school || "학교 미설정",
      role: authUser.user_metadata?.role || "멘티",
    });

    setPage("dashboard");
    setLoading(false);
  }

  async function googleLogin() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(`Google 로그인 실패: ${error.message}`);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          로그인
        </h1>

        <input
          type="email"
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="이메일"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") login();
          }}
        />

        {message && (
          <p className="mb-4 text-sm text-center text-red-500">{message}</p>
        )}

        <button
          type="button"
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인하기"}
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">또는</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={googleLogin}
          disabled={loading}
          className="w-full border border-gray-300 bg-white py-3 rounded-xl font-bold text-gray-700 disabled:opacity-50"
        >
          Google로 로그인
        </button>

        <button
          type="button"
          onClick={() => setPage("register")}
          className="w-full mt-4 text-blue-600"
        >
          회원가입하기
        </button>

        <button
          type="button"
          onClick={() => setPage("home")}
          className="w-full mt-3 text-sm text-gray-500"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}