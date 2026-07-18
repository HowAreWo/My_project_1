import { useState, useEffect } from "react"
import { memberApi } from "../api"
import useAuthStore from "../store/useAuthStore"

const e = React.createElement

export default function Membership() {
  const [plans, setPlans] = useState([])
  const [status, setStatus] = useState(null)
  const [loadingId, setLoadingId] = useState(null)

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
      alert("购买成功！")
      await loadData()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    e("div", { className: "page pt-6" },
      e("h1", { className: "text-lg font-bold text-gray-800 mb-2" }, "会员中心"),
      status && e("div", { className: "card bg-gradient-to-r from-brand-500 to-brand-600 text-white mb-5" },
        e("p", { className: "text-sm opacity-80" }, "当前身份"),
        e("p", { className: "text-2xl font-bold mt-1" },
          status.membership === "FREE" ? "免费用户" : status.membership + " 会员"),
        status.expireAt && e("p", { className: "text-xs opacity-70 mt-1" }, "有效期至 " + (status.expireAt?.split("T")[0] || ""))
      ),
      e("div", { className: "space-y-3" },
        plans.map((plan) =>
          e("div", { key: plan.id, className: "card flex items-center justify-between" },
            e("div", null,
              e("p", { className: "font-semibold text-gray-800" }, plan.name),
              e("p", { className: "text-xs text-gray-400" }, "时长 " + plan.days + " 天 · " + plan.level + " 等级"),
              e("p", { className: "text-xl font-bold text-brand-500 mt-1" },
                "\u00A5" + plan.price,
                e("span", { className: "text-sm font-normal text-gray-400" }, " /" + plan.days + "天")
              )
            ),
            e("button", {
              onClick: () => handleBuy(plan.id),
              disabled: loadingId === plan.id,
              className: "px-6 py-2.5 rounded-xl bg-brand-500 text-white font-semibold text-sm active:scale-95 transition-all disabled:opacity-50"
            }, loadingId === plan.id ? "处理中..." : "购买")
          )
        )
      ),
      e("div", { className: "card mt-4" },
        e("p", { className: "text-sm font-semibold text-gray-700 mb-2" }, "会员特权"),
        e("ul", { className: "text-sm text-gray-500 space-y-1" },
          e("li", null, "\u2705 解锁全部真心话题库"),
          e("li", null, "\uD83D\uDD25 解锁全部大冒险题库"),
          e("li", null, "\uD83D\uDC8E 专属高难度挑战"),
          e("li", null, "\uD83C\uDF81 定期更新专属题目")
        )
      )
    )
  )
}
