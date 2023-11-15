import { Dispatch, SetStateAction } from "react";

interface ScoreTableProps {
  id: string;
  name: string;
  score: string[];
  setScore: Dispatch<SetStateAction<Record<string, string[]>>>;
  currentScore: string;
  totalScore: string;
  totalMoney: string;
}

export default function ScoreTable({
  id,
  name,
  score,
  setScore,
  currentScore,
  totalScore,
  totalMoney,
}: ScoreTableProps) {
  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    idx: number,
  ) {
    setScore((prev) => {
      const prevScore = prev[id];

      e.target.value == ""
        ? (prevScore[idx] = "0")
        : (prevScore[idx] = e.target.value);

      return {
        ...prev,
        [id]: prevScore,
      };
    });
  }

  return (
    <div className="flex flex-col gap-4 px-10">
      <div className="flex gap-8">
        <div className="gap flex w-[30%] items-end">
          <span className="text-2xl font-bold">{name}</span>의
          <span className="px-2 font-bold text-highlight">현재 라운드</span>
          점수:
          <div className="ml-2 text-2xl font-bold">{currentScore}</div>
        </div>
        <div className="flex w-[30%] items-end">
          <span className="text-2xl font-bold">{name}</span>의
          <span className="px-2 font-bold text-highlight">저번 라운드까지</span>
          총 점수:
          <div className="ml-2 text-2xl font-bold">{totalScore}</div>
        </div>
        <div className="flex w-[30%] items-end">
          <span className="text-2xl font-bold">{name}</span>의
          <span className="px-2 font-bold text-highlight">모든 게임</span>총
          정산:
          <div className="ml-2 text-2xl font-bold">
            {(Math.round(parseInt(totalMoney) / 100) * 100).toLocaleString(
              "ko-KR",
              { style: "currency", currency: "KRW" },
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-secondary">
        <input
          value={score[0] == "0" ? "" : score[0]}
          tabIndex={1}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 0)}
        />
        <input
          value={score[1] == "0" ? "" : score[1]}
          tabIndex={2}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 1)}
        />
        <input
          value={score[2] == "0" ? "" : score[2]}
          tabIndex={3}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 2)}
        />
        <input
          value={score[3] == "0" ? "" : score[3]}
          tabIndex={4}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 3)}
        />
        <input
          value={score[4] == "0" ? "" : score[4]}
          tabIndex={5}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 4)}
        />
        <input
          value={score[5] == "0" ? "" : score[5]}
          tabIndex={6}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 5)}
        />
        <input
          value={score[6] == "0" ? "" : score[6]}
          tabIndex={7}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 6)}
        />
        <input
          value={score[7] == "0" ? "" : score[7]}
          tabIndex={8}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 7)}
        />
        <input
          value={score[8] == "0" ? "" : score[8]}
          tabIndex={9}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 8)}
        />
        <input
          value={score[9] == "0" ? "" : score[9]}
          tabIndex={10}
          className="w-full bg-inputbg px-2 outline-highlight"
          onChange={(e) => onChangeHandler(e, id, 9)}
        />
      </div>
    </div>
  );
}
