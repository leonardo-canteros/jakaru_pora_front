import type { Measurement } from '../types'

export interface ChartSeries {
  label: string
  color: string
  measurements: Measurement[]
}

const dateLabel = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', timeZone: 'America/Argentina/Buenos_Aires' })
const numberLabel = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })

export default function MeasurementChart({ series, unit, title }: { series: ChartSeries[]; unit: string; title: string }) {
  const all = series.flatMap((line) => line.measurements)
  if (!all.length) return <div className="chart-empty">No hay mediciones para mostrar en este período.</div>

  const values = all.map((item) => item.value)
  const times = all.map((item) => Date.parse(item.date))
  const firstTime = Math.min(...times)
  const lastTime = Math.max(...times)
  const low = Math.min(...values)
  const high = Math.max(...values)
  const spread = high - low || Math.max(Math.abs(high) * .1, 1)
  const min = low - spread * .16
  const max = high + spread * .16
  const left = 52
  const right = 724
  const top = 18
  const bottom = 190
  const x = (date: string) => firstTime === lastTime ? (left + right) / 2 : left + (Date.parse(date) - firstTime) * (right - left) / (lastTime - firstTime)
  const y = (value: number) => bottom - ((value - min) / (max - min)) * (bottom - top)
  const levels = [0, 1, 2, 3].map((step) => max - (max - min) * step / 3)
  const days = [...new Map([...all].sort((a, b) => a.date.localeCompare(b.date)).map((item) => [item.date.slice(0, 10), item.date])).values()]
  const tickCount = Math.min(days.length, 5)
  const ticks = days.filter((_, index) => tickCount === 1 ? index === 0 : Array.from({ length: tickCount }, (_, tick) => Math.round(tick * (days.length - 1) / (tickCount - 1))).includes(index))

  return (
    <figure className="chart-figure">
      <svg className="measurement-chart" viewBox="0 0 760 236" role="img" aria-label={title}>
        {levels.map((value, index) => <g key={index}><line x1={left} x2={right} y1={y(value)} y2={y(value)} className="chart-gridline" /><text x={left - 10} y={y(value) + 4} textAnchor="end" className="chart-axis">{numberLabel.format(value)}{unit}</text></g>)}
        {series.map((line) => {
          const points = [...line.measurements].sort((a, b) => a.date.localeCompare(b.date)).map((item) => ({ x: x(item.date), y: y(item.value), item }))
          if (!points.length) return null
          return <g key={line.label}>
            <polyline fill="none" stroke={line.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points.map((point) => `${point.x},${point.y}`).join(' ')} />
            {points.map((point) => <g key={point.item.id}><circle cx={point.x} cy={point.y} r="4.5" fill="white" stroke={line.color} strokeWidth="2.5"><title>{line.label}: {numberLabel.format(point.item.value)}{unit}, {dateLabel.format(new Date(point.item.date))}</title></circle></g>)}
          </g>
        })}
        {ticks.map((date) => <text key={date} x={x(date)} y="216" textAnchor="middle" className="chart-axis">{dateLabel.format(new Date(date))}</text>)}
      </svg>
      <figcaption className="chart-legend">{series.map((line) => <span key={line.label}><i style={{ backgroundColor: line.color }} />{line.label}</span>)}</figcaption>
    </figure>
  )
}

