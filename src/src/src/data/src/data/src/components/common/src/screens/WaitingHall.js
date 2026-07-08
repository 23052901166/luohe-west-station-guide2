import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStationStore } from '../data/store'
import TimeDisplay from '../components/common/TimeDisplay'
import '../styles/waiting-hall.css'

export default function WaitingHall() {
  const navigate = useNavigate()
  const { station } = useStationStore()
  const [now, setNow] = useState(new Date())
  const [noticeText, setNoticeText] = useState(
    '看管好自己的小孩不要乱跑。旅客们，请管理好自己的携带物品，杆状物品严禁超越安全线'
  )

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getTrainStatus = (trainItem) => {
    const delayMin = Number(trainItem.Status.split(':')[0])
    return delayMin > 0 ? '晚点' : '正在候车'
  }

  const splitIndex = Math.ceil(station.TrainStops.length / 2)
  const leftList = station.TrainStops.slice(0, splitIndex)
  const rightList = station.TrainStops.slice(splitIndex)

  return (
    <div className="waiting-hall">
      <div className="slogan">
        <div className="red">{station.Name}欢迎您</div>
        <div className="red">社会主义核心价值观</div>
        <div className="red">富强民主文明和谐</div>
        <div className="red">自由平等公正法治</div>
        <div className="red">爱国敬业诚信友善</div>
        <div className="yellow">开车前5分钟停止检票</div>
      </div>

      <div className="train-area">
        <div className="column">
          <div className="header">
            <span>车次</span>
            <span>始发站</span>
            <span>终到站</span>
            <span>开点</span>
            <span>站台</span>
            <span>状态</span>
          </div>
          {leftList.map((t, idx) => {
            const status = getTrainStatus(t)
            return (
              <div className="row" key={`left-${idx}`}>
                <span>{t.Number}</span>
                <span>{t.Origin}</span>
                <span>{t.Terminal}</span>
                <span>{t.DepartureTime?.slice(0, 5)}</span>
                <span>{t.Platform}</span>
                <span className={status === '晚点' ? 'yellow' : 'green'}>{status}</span>
              </div>
            )
          })}
        </div>

        <div className="column">
          <div className="header">
            <span>车次</span>
            <span>始发站</span>
            <span>终到站</span>
            <span>开点</span>
            <span>站台</span>
            <span>状态</span>
          </div>
          {rightList.map((t, idx) => {
            const status = getTrainStatus(t)
            return (
              <div className="row" key={`right-${idx}`}>
                <span>{t.Number}</span>
                <span>{t.Origin}</span>
                <span>{t.Terminal}</span>
                <span>{t.DepartureTime?.slice(0, 5)}</span>
                <span>{t.Platform}</span>
                <span className={status === '晚点' ? 'yellow' : 'green'}>{status}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="footer">
        <div className="time"><TimeDisplay currentTime={now} /></div>
        <div className="notice">
          {noticeText}
          <button onClick={() => {
            const val = prompt('修改候车提示语', noticeText)
            if (val !== null) setNoticeText(val)
          }}>✎ 修改提示</button>
        </div>
      </div>

      <div className="nav-btn-group">
        <button onClick={() => navigate('/')}>返回管理后台</button>
        <button onClick={() => navigate('/platforms')}>查看站台屏</button>
        <button onClick={() => navigate('/sign')}>车站门头牌</button>
      </div>
    </div>
  )
}
