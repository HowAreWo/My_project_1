import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { memberApi } from "../api"

export default function Home() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const [membership, setMembership] = useState(null)

  useEffect(() => {
    memberApi.status().then(r => setMembership(r.data)).catch(() => {})
  }, [])

  return (
    React.createElement("div", { className: "page pt-8" },
      React.createElement("div", { className: "flex items-center justify-between mb-6" },
        React.createElement("div", null,
          React.createElement("h1", { className: "text-lg font-bold text-gray-800" },
            "Hi, " + (user?.nickname || user?.username)),
          React.createElement("p", { className: "text-sm text-gray-400" },
            membership?.membership === "FREE" ? "免费用户" : membership?.membership + "会员")
        ),
        React.createElement("button", { onClick: logout, className: "text-sm text-gray-400 hover:text-gray-600" }, "退出")
      ),
      React.createElement("div", { className: "card mb-4 text-center py-8 cursor-pointer", onClick: () => navigate("/play") },
        React.createElement("div", { className: "text-6xl mb-3" }, "\uD83C\uDFB2"),
        React.createElement("p", { className: "text-lg font-bold text-gray-800" }, "开始游戏"),
        React.createElement("p", { className: "text-sm text-gray-400 mt-1" }, "随机抽取真心话或大冒险")
      ),
      React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-4" },
        React.createElement("button", { onClick: () => navigate("/play?mode=truth"), className: "card text-center py-5" },
          React.createElement("div", { className: "text-3xl mb-2" }, "\uD83D\uDCAC"),
          React.createElement("p", { className: "font-semibold text-gray-700" }, "真心话")
        ),
        React.createElement("button", { onClick: () => navigate("/play?mode=dare"), className: "card text-center py-5" },
          React.createElement("div", { className: "text-3xl mb-2" }, "\uD83D\uDD25"),
          React.createElement("p", { className: "font-semibold text-gray-700" }, "大冒险")
        )
      ),
      (!membership || membership.membership === "FREE") && (
        React.createElement("div", { className: "card bg-gradient-to-r from-brand-500 to-brand-600 text-white text-center py-5 cursor-pointer",
          onClick: () => navigate("/membership") },
          React.createElement("p", { className: "text-sm opacity-80" }, "解锁更多玩法"),
          React.createElement("p", { className: "text-xl font-bold mt-1" }, "\uD83D\uDC51 开通会员")
        )
      ),
      React.createElement("div", { className: "card mt-4" },
        React.createElement("p", { className: "text-sm font-semibold text-gray-700 mb-2" }, "玩法介绍"),
        React.createElement("ul", { className: "text-sm text-gray-500 space-y-1" },
          React.createElement("li", null, "\uD83C\uDFAF 随机抽取真心话或大冒险题目"),
          React.createElement("li", null, "\uD83D\uDC95 和你的伴侣轮流接受挑战"),
          React.createElement("li", null, "\uD83D\uDC51 会员解锁更多高能题目"),
          React.createElement("li", null, "\uD83D\uDD04 分享给你的TA一起玩")
        )
      )
    )
  )
}
