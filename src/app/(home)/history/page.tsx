import HistoryCell from "@/components/historyCell";

export default function History() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center text-5xl font-extrabold">History</div>
      <div>
        <HistoryCell />
      </div>
    </div>
  );
}
