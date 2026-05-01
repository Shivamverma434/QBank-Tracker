import { BellIcon, ClockIcon, ListIcon, RefreshIcon } from "@/components/icons";
import Badge from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import Panel from "@/components/ui/Panel";

function ViewToggle() {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-600"
      >
        <ClockIcon className="h-4 w-4" />
        Clock View
      </button>
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white"
      >
        <ListIcon className="h-4 w-4" />
        List View
      </button>
    </div>
  );
}

function PlayerSummaryCard({
  name,
  headerClassName,
  bodyClassName,
  accentTextClassName,
}: {
  name: string;
  headerClassName: string;
  bodyClassName: string;
  accentTextClassName: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${bodyClassName}`}>
      <div
        className={`flex items-center justify-between px-4 py-3 text-sm font-semibold text-white ${headerClassName}`}
      >
        <span>{name}</span>
        <Badge size="sm" variant="slate" className="bg-white/25 text-white">
          0 sessions
        </Badge>
      </div>
      <div className="flex items-center justify-between gap-6 px-4 py-4">
        <div>
          <p className={`text-2xl font-semibold ${accentTextClassName}`}>0.0%</p>
          <p className="text-sm text-slate-500">Accuracy</p>
        </div>
        <div className="flex gap-6 text-right text-sm text-slate-500">
          <div>
            <p className="text-lg font-semibold text-slate-700">0</p>
            <p>Completed</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700">0</p>
            <p>Correct</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActivityLog() {
  return (
    <Panel
      title="Activity Log"
      icon={<ClockIcon className="h-6 w-6 text-amber-500" />}
      actions={
        <div className="flex items-center gap-3">
          <IconButton>
            <BellIcon className="h-5 w-5" />
          </IconButton>
          <IconButton>
            <RefreshIcon className="h-5 w-5" />
          </IconButton>
        </div>
      }
      className="min-h-[640px]"
    >
      <div className="flex flex-col gap-6">
        <ViewToggle />

        <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
          <span>Select Date</span>
          <button type="button" className="text-violet-600">
            Date Range
          </button>
        </div>

        <select
          className="w-full rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm"
          defaultValue="01/03/2025"
        >
          <option>01/03/2025</option>
          <option>01/02/2025</option>
          <option>01/01/2025</option>
        </select>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge variant="violet">Aarsh</Badge>
          <Badge variant="violet">Aman</Badge>
        </div>

        <div className="flex flex-col gap-4">
          <PlayerSummaryCard
            name="Aarsh"
            headerClassName="bg-gradient-to-r from-violet-600 to-indigo-500"
            bodyClassName="border-violet-100 bg-violet-50/40"
            accentTextClassName="text-violet-600"
          />
          <PlayerSummaryCard
            name="Aman"
            headerClassName="bg-gradient-to-r from-sky-500 to-blue-600"
            bodyClassName="border-blue-100 bg-blue-50/40"
            accentTextClassName="text-blue-600"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-sm text-slate-500">
          No entries found for this date
        </div>
      </div>
    </Panel>
  );
}
