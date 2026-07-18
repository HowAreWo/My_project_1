import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authApi } from "../api"
import useAuthStore from "../store/useAuthStore"

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", phone: "", nickname: "", gender: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const loginStore = useAuthStore((s) => s.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (form.password.length < 6) { setError("密码至少6位"); return }
    setLoading(true)
    try {
      const res = await authApi.register(form)
      loginStore(res.data, res.data.token)
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    React.createElement("div", { className: "page flex flex-col items-center justify-center min-h-screen" },
      React.createElement("div", { className: "w-full max-w-sm" },
        React.createElement("div", { className: "text-center mb-6" },
          React.createElement("span", { className: "text-4xl" }, "\uD83D\uDC9D"),
          React.createElement("h1", { className: "text-xl font-bold text-gray-800 mt-2" }, "创建账号")
        ),
        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-3" },
          React.createElement("input", { className: "input", placeholder: "用户名 *", value: form.username,
            onChange: (e) => setForm({ ...form, username: e.target.value }), required: true }),
          React.createElement("input", { className: "input", type: "password", placeholder: "密码（至少6位）*", value: form.password,
            onChange: (e) => setForm({ ...form, password: e.target.value }), required: true }),
          React.createElement("input", { className: "input", placeholder: "昵称（选填）", value: form.nickname,
            onChange: (e) => setForm({ ...form, nickname: e.target.value }) }),
          React.createElement("div", { className: "flex gap-3" },
            React.createElement("input", { className: "input flex-1", placeholder: "手机号（选填）", value: form.phone,
              onChange: (e) => setForm({ ...form, phone: e.target.value }) }),
            React.createElement("select", { className: "input w-24", value: form.gender,
              onChange: (e) => setForm({ ...form, gender: e.target.value }) },
              React.createElement("option", { value: "" }, "性别"),
              React.createElement("option", { value: "男" }, "男"),
              React.createElement("option", { value: "女" }, "女")
            )
          ),
          error && React.createElement("p", { className: "text-red-500 text-sm text-center" }, error),
          React.createElement("button", { className: "btn-primary", type: "submit", disabled: loading },
            loading ? "注册中..." : "注册")
        ),
        React.createElement("p", { className: "text-center mt-4 text-sm text-gray-500" },
          "已有账号？", React.createElement(Link, { to: "/login", className: "text-brand-500 font-medium" }, "去登录"))
      )
    )
  )
}
