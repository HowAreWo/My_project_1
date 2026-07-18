import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../api'
import useAuthStore from '../store/useAuthStore'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const loginStore = useAuthStore((s) => s.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login(form)
      loginStore(res.data, res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl">💕</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">情侣互动</h1>
          <p className="text-gray-400 text-sm mt-1">真心话 · 大冒险</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" placeholder="用户名" value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <input className="input" type="password" placeholder="密码" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-500">
          还没有账号？<Link to="/register" className="text-brand-500 font-medium">立即注册</Link>
        </p>
      </div>
    </div>
  )
}
