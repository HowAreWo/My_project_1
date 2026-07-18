import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gameApi } from '../api'

export default function GamePlay() {
  const [searchParams] = useSearchParams()
  const initialMode = searchParams.get('mode')
  const [mode, setMode] = useState(initialMode || 'random')
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const fetchQuestion = async () => {
    setLoading(true)
    setFlipped(false)
    setItem(null)
    try {
      let res
      if (mode === 'truth') res = await gameApi.randomTruth()
      else if (mode === 'dare') res = await gameApi.randomDare()
      else res = await gameApi.randomPair()
      setItem(res.data)
      setTimeout(() => setFlipped(true), 200)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialMode) return
    fetchQuestion()
  }, [initialMode])

  return (
    <div className="page pt-6">
      <div className="flex justify-center gap-2 mb-6">
        {['random', 'truth', 'dare'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setItem(null); setFlipped(false) }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === m ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {m === 'random' ? '🎲 随机' : m === 'truth' ? '💬 真心话' : '🔥 大冒险'}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        {!item && !loading && (
          <button onClick={fetchQuestion} className="btn-primary max-w-xs">
            🎯 点击抽取
          </button>
        )}

        {loading && (
          <div className="card w-full text-center py-10 animate-pulse">
            <div className="text-4xl mb-3">🎰</div>
            <p className="text-gray-400">抽取中...</p>
          </div>
        )}

        {item && !loading && mode === 'random' && (
          <div className="w-full space-y-3">
            <div className={`card bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 transition-all duration-500 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💬</span>
                <span className="text-xs font-semibold text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full">
                  真心话 · 难度 {item.truth?.level || 1}
                </span>
                <span className="text-xs text-gray-400">{item.truth?.category}</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{item.truth?.content}</p>
            </div>
            <div className={`card bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 transition-all duration-500 delay-100 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🔥</span>
                <span className="text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">
                  大冒险 · 难度 {item.dare?.level || 1}
                </span>
                <span className="text-xs text-gray-400">{item.dare?.category}</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{item.dare?.content}</p>
            </div>
          </div>
        )}

        {item && !loading && mode !== 'random' && (
          <div className="w-full">
            <div className={`card bg-gradient-to-br ${mode === 'truth' ? 'from-pink-50 to-rose-50 border-pink-100' : 'from-orange-50 to-red-50 border-orange-100'} border transition-all duration-500 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{mode === 'truth' ? '💬' : '🔥'}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${mode === 'truth' ? 'text-pink-500 bg-pink-100' : 'text-orange-500 bg-orange-100'}`}>
                  {mode === 'truth' ? '真心话' : '大冒险'} · 难度 {item.level || 1}
                </span>
                <span className="text-xs text-gray-400">{item.category}</span>
              </div>
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">{item.content}</p>
            </div>
          </div>
        )}

        {item && !loading && (
          <button onClick={fetchQuestion} className="btn-primary max-w-xs mt-6">
            🔄 再抽一次
          </button>
        )}
      </div>
    </div>
  )
}
