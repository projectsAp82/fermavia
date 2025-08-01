export default function DashboardStatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start min-h-[80px] animate-pulse space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 rounded" /> {/* icône */}
        <div className="w-24 h-4 bg-gray-200 rounded" /> {/* label */}
      </div>
      <div className="w-16 h-6 bg-gray-200 rounded" /> {/* valeur */}
    </div>
  )
}
