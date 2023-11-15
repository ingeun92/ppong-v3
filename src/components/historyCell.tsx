type HistoryCellProps = {};

export default function HistoryCell({}: HistoryCellProps) {
  async function getFromDB() {
    "use server";
    return {
      props: {},
    };
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[80%] justify-between font-bold">
        <div className="flex">
          <p>
            <span className="text-highlight">날짜</span>: 2023 / 11 / 14
          </p>
        </div>
        <div className="flex">
          <p>
            <span className="text-highlight">참여자 수</span>: 4 명
          </p>
        </div>
      </div>
    </div>
  );
}
