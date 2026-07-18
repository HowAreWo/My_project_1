import { useState, useEffect } from 'react'
import { memberApi } from '../api'
import useAuthStore from '../store/useAuthStore'

export default function Membership() {
  const [plans, setPlans] = useState([])
  const [status, setStatus] = useState(null)
  const [loadingId, setLoadingId] = useState(null)
  const user = useAuthStore((s) => s.user)

  const loadData = async () => {
    try {
      const [p, s] = await Promise.all([memberApi.plans(), memberApi.status()])
      setPlans(p.data)
      setStatus(s.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { loadData() }, [])

  const handleBuy = async (planId) => {
    setLoadingId(planId)
    try {
      const order = await memberApi.createOrder(planId)
      await memberApi.payOrder(order.data.id)
      alert('购买成功！')
      await loadData()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="page pt-6">
      <h1 className="text-lg font-bold text-gray-800 mb-2">会员中心</h1>

      {status && (
        <div className="card bg-gradient-to-r from-brand-500 to-brand-600 text-white mb-5">
          <p className="text-sm opacity-80">当前身份</p>
          <p className="text-2xl font-bold mt-1">
            {status.membership === 'FREE' ? '免费用户' : status.membership + ' 会员'}
          </p>
          {status.expireAt && (
            <p className="text-xs opacity-70 mt-1">有效期至 {status.expireAt?.split('T')[0]}</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {plans.map((plan) => (
          <div key={plan.id} className="card flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{plan.name}</p>
              <p className="text-xs text-gray-400">时长 {plan.days} 天 · {plan.level} 等级</p>
              <p className="text-xl font-bold text-brand-500 mt-1">
                ¥{plan.price}
                <span className="text-sm font-normal text-gray-400"> /{plan.days}天</span>
              </p>
            </div>
            <button
              onClick={() => handleBuy(plan.id)}
              disabled={loadingId === plan.id}
              className="px-6 py-2.5 rounded-xl bg-brand-500 text-white font-semibold text-sm active:scale-95 transition-all disabled:opacity-50"
            >
              {loadingId === plan.id ? '处理中...' : '购买'}
            </button>
          </div>
        ))}
      </div>

      <div className="card mt-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">会员特权</p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>✅ 解锁全部真心话题库</li>
          <li>🔥 解锁全部大冒险题库</li>
          <li>💎 专属高难度挑战</li>
          <li>🎁 定期更新专属题目</li>
        </ul>
      </div>
    </div>
  )
}
