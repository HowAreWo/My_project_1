import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { memberApi } from '../api'

export default function Home() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const [membership, setMembership] = useState(null)

  useEffect(() => {
    memberApi.status().then(r => setMembership(r.data)).catch(() => {})
  }, [])

  return (
    <div className="page pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            Hi, {user?.nickname || user?.username}
          </h1>
          <p className="text-sm text-gray-400">
            {membership?.membership === 'FREE' ? '免费用户' : membership?.membership + '会员'}
          </p>
        </div>
        <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-600">退出</button>
      </div>

      <div className="card mb-4 text-center py-8 cursor-pointer" onClick={() => navigate('/play')}>
        <div className="text-6xl mb-3">🎲</div>
        <p className="text-lg font-bold text-gray-800">开始游戏</p>
        <p className="text-sm text-gray-400 mt-1">随机抽取真心话或大冒险</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button onClick={() => navigate('/play?mode=truth')} className="card text-center py-5">
          <div className="text-3xl mb-2">💬</div>
          <p className="font-semibold text-gray-700">真心话</p>
        </button>
        <button onClick={() => navigate('/play?mode=dare')} className="card text-center py-5">
          <div className="text-3xl mb-2">🔥</div>
          <p className="font-semibold text-gray-700">大冒险</p>
        </button>
      </div>

      {(!membership || membership.membership === 'FREE') && (
        <div className="card bg-gradient-to-r from-brand-500 to-brand-600 text-white text-center py-5 cursor-pointer"
          onClick={() => navigate('/membership')}>
          <p className="text-sm opacity-80">解锁更多玩法</p>
          <p className="text-xl font-bold mt-1">👑 开通会员</p>
        </div>
      )}

      <div className="card mt-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">玩法介绍</p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>🎯 随机抽取真心话或大冒险题目</li>
          <li>💕 和你的伴侣轮流接受挑战</li>
          <li>👑 会员解锁更多高能题目</li>
          <li>🔄 分享给你的TA一起玩</li>
        </ul>
      </div>
    </div>
  )
}
