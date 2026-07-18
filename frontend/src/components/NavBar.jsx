import { NavLink, useLocation } from "react-router-dom"

const tabs = [
  { path: "/", label: "首页", icon: "🏠" },
  { path: "/play", label: "游戏", icon: "🎮" },
  { path: "/membership", label: "会员", icon: "👑" }
]

export default function NavBar() {
  const loc = useLocation()
  if (["/login", "/register"].includes(loc.pathname)) return null

  return (
    React.createElement("nav", { className: "fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-100 flex justify-around py-2 px-4 z-50" },
      tabs.map((t) => {
        const active = loc.pathname === t.path
        return React.createElement(NavLink, {
          key: t.path, to: t.path,
          className: "flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors " + (active ? "text-brand-500" : "text-gray-400")
        },
          React.createElement("span", { className: "text-xl" }, t.icon),
          React.createElement("span", { className: "text-xs font-medium" }, t.label)
        )
      })
    )
  )
}
