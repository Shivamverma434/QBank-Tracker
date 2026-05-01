import ActivityLog from "@/components/sections/ActivityLog";
import BattleArena from "@/components/sections/BattleArena";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <BattleArena />
        <ActivityLog />
      </main>
    </div>
  );
}
