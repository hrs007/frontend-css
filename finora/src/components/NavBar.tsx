import {
  ArrowLeft,
  ArrowUpDownIcon,
  ChartNoAxesCombined,
  Grid2x2,
  LayoutDashboardIcon,
  Settings,
  Target,
  TrendingUp,
} from "lucide-react";
export const NavBar = () => {
  return (
    <div className="flex flex-col px-4">
      <div className="flex p-2 py-7 gap-3">
        <div className="bg-violet-500 rounded-lg px-2.5 ">
          <div className="text-2xl font-bold text-white">f</div>
        </div>
        <div className="text-2xl font-bold justify-center items-center">
          finora.
        </div>
      </div>
      <div className="flex flex-row flex-nowrap border border-slate-200 rounded-lg p-2 items-center justify-between">
        <div className="flex gap-3">
          <div className="text-md font-semibold bg-gray-200 text-gray-500 py-1 rounded-lg px-2.5">
            A
          </div>
          <div className="flex-col">
            <div className="text-xs font-bold">Arjuns's workspace</div>
            <div className="text-[10px] text-slate-600">Personal account</div>
          </div>
        </div>
        <ArrowUpDownIcon height={18} className="text-neutral-400" />
      </div>
      <div className="flex flex-col gap-6 text-neutral-600 text-[14px] px-2 pt-6">
        <div className="text-[14px] text-neutral-400">overview</div>
        <div className="flex gap-3 items-center">
          <LayoutDashboardIcon height={18} />
          Dashboard
        </div>
        <div className="flex gap-3 items-center">
          <ArrowLeft height={18} /> Transaction
        </div>
        <div className="flex gap-3 items-center">
          <Grid2x2 height={18} /> Budgets
        </div>
        <div className="flex gap-3 items-center">
          <TrendingUp height={18} /> Investments
        </div>
        <div className="flex gap-3 items-center">
          <Target height={18} />
          Goals
        </div>
        <div className="flex gap-3 items-center">
          <ChartNoAxesCombined height={18} />
          Analytics
        </div>
      </div>
      <div className="flex flex-col pt-6 gap-6 text-neutral-600 text-[14px] ">
        <div className="text-[14px] text-neutral-400">Manage</div>
        <div className="flex gap-3 items-center">
          <Settings height={18} />
          Settings
        </div>
      </div>
    </div>
  );
};
