import { Clock } from 'lucide-react'

const TimeDisplay = ({ currentTime }) => {
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const week = weekArr[date.getDay()]
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${year}/${month}/${day} ${week} ${h}:${m}:${s}`
  }

  return (
    <div className="time-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Clock size={16} />
      <span>{formatDate(currentTime)}</span>
    </div>
  )
}

export default TimeDisplay
