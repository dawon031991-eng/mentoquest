import { useState } from "react";

export default function Register({ setPage, setUser }) {
  const [form, setForm] = useState({
    school: "",
    name: "",
    studentId: "",
    password: "",
    role: "mentor",
    intro: "",
  });

  const register = () => {
    if (!form.school || !form.name || !form.studentId || !form.password) {
      alert("학교, 이름, 학번, 비밀번호를 모두 입력해줘!");
      return;
    }

    localStorage.setItem("mentoquestUser", JSON.stringify(form));
    setUser(form);
    setPage("dashboard");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[460px]">
        <h1 className="text-3xl font-black text-blue-700 text-center">회원가입</h1>

        <input className="mt-6 w-full border rounded-xl p-3" placeholder="학교 이름"
          onChange={(e) => setForm({ ...form, school: e.target.value })} />

        <input className="mt-3 w-full border rounded-xl p-3" placeholder="이름"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="mt-3 w-full border rounded-xl p-3" placeholder="학번"
          onChange={(e) => setForm({ ...form, studentId: e.target.value })} />

        <input className="mt-3 w-full border rounded-xl p-3" type="password" placeholder="비밀번호"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setForm({ ...form, role: "mentor" })}
            className={`p-3 rounded-xl font-bold ${form.role === "mentor" ? "bg-blue-700 text-white" : "bg-gray-100"}`}
          >
            멘토
          </button>

          <button
            onClick={() => setForm({ ...form, role: "mentee" })}
            className={`p-3 rounded-xl font-bold ${form.role === "mentee" ? "bg-blue-700 text-white" : "bg-gray-100"}`}
          >
            멘티
          </button>
        </div>

        <textarea
          className="mt-4 w-full border rounded-xl p-3 h-24"
          placeholder={form.role === "mentor" ? "나의 강점" : "도움이 필요한 부분"}
          onChange={(e) => setForm({ ...form, intro: e.target.value })}
        />

        <button onClick={register} className="mt-5 w-full bg-blue-700 text-white py-3 rounded-xl font-bold">
          가입하고 시작하기
        </button>
      </div>
    </div>
  );
}