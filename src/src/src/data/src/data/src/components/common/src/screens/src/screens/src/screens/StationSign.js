import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStationStore } from '../data/store'
import TimeDisplay from '../components/common/TimeDisplay'
import '../styles/station-sign.css'

const STATION_EN_MAP = {
  '漯河西站': 'Luohexi Railway Station',
  '北京西站': 'Beijingxi Railway Station',
  '郑州东': 'Zhengzhou East',
  '广州南': 'Guangzhou South',
  '厦门': 'Xiamen',
  '宜昌东': 'Yichang East',
  '深圳北': 'Shenzhen North',
  '昆明南': 'Kunming South',
  '武汉': 'Wuhan'
}

export default function StationSign() {
  const navigate = useNavigate()
  const { station } = useStationStore()
  const stationName = station.Name
  const enName = STATION_EN_MAP[stationName] || `${stationName} Railway Station`
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="station-sign">
      <div className="time-top">
        <TimeDisplay currentTime={now} />
      </div>
      <div className="cn">{stationName}</div>
      <div className="en">{enName}</div>
      <div className="nav-btn-group">
        <button onClick={() => navigate('/')}>返回管理后台</button>
        <button onClick={() => navigate('/hall')}>候车大屏</button>
        <button onClick={() => navigate('/platforms')}>站台分屏</button>
      </div>
    </div>
  )
}
