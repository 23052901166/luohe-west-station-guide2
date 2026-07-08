import { useNavigate } from 'react-router-dom'
import { useStationStore } from '../data/store'
import '../styles/admin.css'

export default function Admin() {
  const navigate = useNavigate()
  const { station, updateStationName, updateTrain, deleteTrain, addTrain } = useStationStore()

  const handleAddTrain = () => {
    addTrain()
  }

  return (
    <div className="admin">
      <h1>国铁信息显示模拟 - 后台管理</h1>
      <div className="nav-buttons">
        <button onClick={() => navigate('/hall')}>候车大厅屏</button>
        <button onClick={() => navigate('/platforms')}>站台分屏</button>
        <button onClick={() => navigate('/sign')}>车站门头牌</button>
      </div>

      <section className="station-setting">
        <h2>车站基础设置</h2>
        <label>车站名称：</label>
        <input
          value={station.Name}
          onChange={e => updateStationName(e.target.value)}
        />
      </section>

      <section className="train-manage">
        <h2>车次管理</h2>
        <button className="add-btn" onClick={handleAddTrain}>新增车次</button>
        <div className="train-list">
          {station.TrainStops.map((t, idx) => (
            <div className="train-item" key={idx}>
              <input value={t.Number} readOnly placeholder="车次" />
              <input
                value={t.Platform}
                onChange={e => updateTrain(idx, { Platform: e.target.value })}
                placeholder="站台"
              />
              <input
                value={t.DepartureTime}
                onChange={e => updateTrain(idx, { DepartureTime: e.target.value })}
                placeholder="发车时间 HH:mm:ss"
              />
              <input
                value={t.Status}
                onChange={e => updateTrain(idx, { Status: e.target.value })}
                placeholder="晚点时长 00:03:00"
              />
              <button onClick={() => deleteTrain(idx)}>删除</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
