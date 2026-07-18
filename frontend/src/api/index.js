const BASE = "/api"

async function request(path, options = {}) {
  const token = localStorage.getItem("token")
  const headers = { "Content-Type": "application/json", ...options.headers }
  if (token) headers["Authorization"] = "Bearer " + token
  const res = await fetch(BASE + path, { ...options, headers })
  const data = await res.json()
  if (data.code !== 200) throw new Error(data.message || "请求失败")
  return data
}

export const authApi = {
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) })
}

export const gameApi = {
  randomPair: () => request("/game/random"),
  randomTruth: () => request("/game/random/truth"),
  randomDare: () => request("/game/random/dare")
}

export const memberApi = {
  plans: () => request("/membership/plans"),
  status: () => request("/membership/status"),
  createOrder: (planId) => request("/membership/order?planId=" + planId, { method: "POST" }),
  payOrder: (orderId) => request("/membership/pay/" + orderId, { method: "POST" }),
  orders: () => request("/membership/orders")
}
