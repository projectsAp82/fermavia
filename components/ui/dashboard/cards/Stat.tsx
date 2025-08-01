type Props = {
  icon: React.ReactNode
  label: string
  value?: string | number
}

export default function DashboardStatCard({ icon, label, value }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start min-h-[80px]">
      <div className="flex items-center gap-2 text-gray-600 mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-gray-800 text-2xl font-bold">{value ?? "-"}</div>
    </div>
  )
}

