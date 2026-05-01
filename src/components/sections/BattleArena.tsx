import {
  BattleIcon,
  ChartIcon,
  CrownIcon,
  PlusIcon,
} from "@/components/icons";
import Badge from "@/components/ui/Badge";
import Panel from "@/components/ui/Panel";
import StatBar from "@/components/ui/StatBar";

function PlayerCard({
  name,
  nameClassName,
}: {
  name: string;
  nameClassName: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`w-36 rounded-2xl px-6 py-2 text-center ${nameClassName}`}>
        <span className="text-lg font-semibold">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm"
        >
          <PlusIcon className="h-4 w-4" />
          Add
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm"
        >
          <ChartIcon className="h-4 w-4" />
          Stats
        </button>
      </div>
    </div>
  );
}

export default function BattleArena() {
  return (
    <Panel
      title="Battle Arena"
      icon={<BattleIcon className="h-6 w-6 text-violet-500" />}
      className="min-h-[640px]"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <PlayerCard
            name="Aarsh"
            nameClassName="bg-violet-50 text-violet-700"
          />
          <span className="text-xl font-semibold text-violet-500">VS</span>
          <PlayerCard
            name="Aman"
            nameClassName="bg-blue-50 text-blue-600"
          />
        </div>

        <div className="space-y-8">
          <StatBar
            label="Total Completed"
            leftValue="28144"
            rightValue="26400"
            centerValue="1744"
          />
          <StatBar
            label="Correct Answers"
            leftValue="23491"
            rightValue="22836"
            centerValue="655"
          />
          <StatBar
            label="Accuracy"
            leftValue="83.47%"
            rightValue="86.50%"
            centerValue="3.03%"
            gradientClassName="from-slate-400 via-slate-500 to-violet-500"
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-700 shadow-sm">
            <CrownIcon className="h-5 w-5" />
            <span>Aarsh leads by 265 points</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Badge variant="softViolet" size="sm">
            Updated just now
          </Badge>
        </div>
      </div>
    </Panel>
  );
}
