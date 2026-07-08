import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStationStore } from '../data/store'
import TimeDisplay from '../components/common/TimeDisplay'
import '../styles/platform-screen.css'

export default function PlatformScreen() {
  const navigate = useNavigate()
  const { getPlatformScreens } = useStationStore()
  const screenList = getPlatformScreens()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="top-time-bar">
        <TimeDisplay currentTime={now} />
      </div>
      <div className="platform-grid">
        {screenList.map(({ platform, train }) => (
          <div className="platform-card" key={platform.Name}>
            <div className="info-text">
              {train ? (
                <>
                  <div className="train-num">{train.Number}次 {train.DepartureTime.slice(0,5)}开</div>
                  <div className="route">{train.Origin} → {train.Terminal}</div>
                  <div className="tip">地标：{train.Landmark} | 编组{train.Length}节</div>
                </>
              ) : (
                <div className="empty-tip">暂无停靠列车</div>
              )}
            </div>
            <div className="big-no">{platform.Name}</div>
          </div>
        ))}
      </div>
      <div className="nav-btn-group">
        <button onClick={() => navigate('/')}>返回管理后台</button>
        <button onClick={() => navigate('/hall')}>候车大屏</button>
        <button onClick={() => navigate('/sign')}>车站门头牌</button>
      </div>
    </>
  )
}
