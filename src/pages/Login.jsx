import { useState } from "react";
import { supabase } from "../supabase";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setMessage("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        throw error;
      }

      if (!data?.session || !data?.user) {
        throw new Error("로그인 세션이 생성되지 않았습니다.");
      }

      setMessage("로그인 성공!");

      // App.jsx의 onAuthStateChange가 dashboard로 이동시킴
      setPage("dashboard");
    } catch (error) {
      console.error("이메일 로그인 오류:", error);

      setMessage(
        `로그인 실패: ${
          error?.message || "알 수 없는 오류가 발생했습니다."
        }`
      );
    } finally {
      setLoading(false);
    }
  }

  async function googleLogin() {
    try {
      setLoading(true);
      setMessage("");

      const { data, error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/`,
          },
        });

      if (error) {
        throw error;
      }

      if (!data?.url) {
        throw new Error(
          "Google 로그인 주소를 불러오지 못했습니다."
        );
      }
    } catch (error) {
      console.error("Google 로그인 오류:", error);

      setMessage(
        `Google 로그인 실패: ${
          error?.message || "알 수 없는 오류가 발생했습니다."
        }`
      );

      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-5">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-96">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          로그인
        </h1>

        <input
          type="email"
          autoComplete="email"
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="이메일"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          autoComplete="current-password"
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !loading) {
              login();
            }
          }}
          disabled={loading}
        />

        {message && (
          <p className="mb-4 text-sm text-center text-red-500 break-words">
            {message}
          </p>
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
          {loading ? "연결 중..." : "Google로 로그인"}
        </button>

        <button
          type="button"
          onClick={() => setPage("register")}
          disabled={loading}
          className="w-full mt-4 text-blue-600"
        >
          회원가입하기
        </button>

        <button
          type="button"
          onClick={() => setPage("home")}
          disabled={loading}
          className="w-full mt-3 text-sm text-gray-500"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}