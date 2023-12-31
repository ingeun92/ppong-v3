/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ScoreTable from "@/components/scoreTable";
import { useEffect, useState } from "react";
import {
  calCurrScore,
  calAvgScore,
  calTotalMoney,
} from "@/actions/calculation";
import { findData, insertData } from "@/actions/db";

export default function Score() {
  interface Scores {
    [key: string]: string[];
  }

  interface CurrScores {
    [key: string]: string;
  }

  interface TotalScores {
    [key: string]: string;
  }

  interface Player {
    [key: string]: string;
  }

  interface InGamePlayer {
    [key: string]: boolean;
  }

  const player: Player = {
    "1": "인근",
    "2": "재이",
    "3": "찬웅",
    "4": "지훈",
    "5": "강원",
  };

  const [playerNum, setPlayerNum] = useState<number>(1);
  const [moneyPerUnit, setMoneyPerUnit] = useState<number>(0);
  const [roundNum, setRoundNum] = useState<number>(0);
  const [avgScore, setAvgScore] = useState<number>(0);
  const [firstPlayer, setFirstPlayer] = useState<string>("");
  const [lastPlayer, setLastPlayer] = useState<string>("");
  const [inGamePlayerNum, setInGamePlayerNum] = useState<number>(0);

  const [inGamePlayer, setInGamePlayer] = useState<InGamePlayer>({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
  });

  const [scores, setScores] = useState<Scores>({
    "1": new Array(10).fill("0"),
    "2": new Array(10).fill("0"),
    "3": new Array(10).fill("0"),
    "4": new Array(10).fill("0"),
    "5": new Array(10).fill("0"),
  });
  const [currScores, setCurrScores] = useState<CurrScores>({
    "1": "0",
    "2": "0",
    "3": "0",
    "4": "0",
    "5": "0",
  });
  const [totalScores, setTotalScores] = useState<TotalScores>({
    "1": "0",
    "2": "0",
    "3": "0",
    "4": "0",
    "5": "0",
  });
  const [totalMoney, setTotalMoney] = useState<TotalScores>({
    "1": "0",
    "2": "0",
    "3": "0",
    "4": "0",
    "5": "0",
  });

  async function clearScores() {
    for (const key in scores) {
      setScores((prev) => ({ ...prev, [key]: new Array(10).fill("0") }));
    }
  }

  async function updateCurrScores() {
    for (const key in scores) {
      const currScore = await calCurrScore(scores[key]);
      setCurrScores((prev) => ({ ...prev, [key]: currScore }));
    }
  }

  async function clearCurrScores() {
    for (const key in currScores) {
      setCurrScores((prev) => ({ ...prev, [key]: "0" }));
    }
  }

  async function updateTotalScores() {
    for (const key in totalScores) {
      setTotalScores((prev) => ({
        ...prev,
        [key]: (
          parseInt(currScores[key]) + parseInt(totalScores[key])
        ).toString(),
      }));
    }
  }

  async function clearTotalScores() {
    for (const key in currScores) {
      setTotalScores((prev) => ({ ...prev, [key]: "0" }));
    }
  }

  async function updateAvgScores() {
    const avg = await calAvgScore(currScores, playerNum);
    setAvgScore(avg);
  }

  async function updateFirstPlayer() {
    let firstPlayerValue = 99999;
    for (const key in currScores) {
      if (inGamePlayer[key] && Number(currScores[key]) <= firstPlayerValue) {
        firstPlayerValue = Number(currScores[key]);
      }
    }
    console.log("firstPlayerValue: ", firstPlayerValue);
    // const firstPlayerValue = Math.min(...Object.values(currScores).map(Number));
    const firstPlayerIdx: any = Object.keys(currScores).find(
      (key) =>
        inGamePlayer[key] && currScores[key] == firstPlayerValue.toString(),
    );
    console.log("firstPlayerIdx: ", firstPlayerIdx);

    setFirstPlayer(player[firstPlayerIdx]);
  }

  async function updateLastPlayer() {
    let lastPlayerValue = -99999;
    for (const key in currScores) {
      if (inGamePlayer[key] && Number(currScores[key]) >= lastPlayerValue) {
        lastPlayerValue = Number(currScores[key]);
      }
    }
    // const lastPlayerValue = Math.max(...Object.values(currScores).map(Number));
    const lastPlayerIdx: any = Object.keys(currScores).find(
      (key) =>
        inGamePlayer[key] && currScores[key] == lastPlayerValue.toString(),
    );

    setLastPlayer(player[lastPlayerIdx]);
  }

  async function updateTotalMonies() {
    setTotalMoney(
      await calTotalMoney(totalScores, inGamePlayer, moneyPerUnit, playerNum),
    );
  }

  async function clearTotalMoney() {
    for (const key in currScores) {
      setTotalMoney((prev) => ({ ...prev, [key]: "0" }));
    }
  }

  // async function checkInGamePlayer() {
  //   Object.keys(totalScores).forEach((player) => {
  //     if (
  //       totalScores[player] == "0" &&
  //       scores[player][0] == "0" &&
  //       scores[player][9] == "0"
  //     ) {
  //       setInGamePlayer((prev) => ({ ...prev, [player]: false }));
  //     }
  //   });
  // }

  async function clearInGamePlayer() {
    for (const key in inGamePlayer) {
      setInGamePlayer((prev) => ({ ...prev, [key]: false }));
    }
    setInGamePlayerNum(0);
  }

  async function handlePlayerCheckboxes(e: any, idx: string) {
    console.log(e.target.checked);
    setInGamePlayer((prev) => ({ ...prev, [idx]: !prev[idx] }));
    if (e.target.checked) {
      setInGamePlayerNum((prev) => prev + 1);
    } else {
      setInGamePlayerNum((prev) => prev - 1);
    }
  }

  useEffect(() => {
    updateCurrScores();
    console.log("inGamePlayerNum: ", inGamePlayerNum);
    console.log("scores: ", scores);
  }, [scores]);

  useEffect(() => {
    updateAvgScores();
    if (avgScore != 0) {
      updateFirstPlayer();
      updateLastPlayer();
    }
    console.log("currScores: ", currScores);
  }, [currScores]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center text-4xl font-extrabold">Score</div>
      <div className="flex items-center justify-around text-xl font-bold">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex">플레이 유저 수:</div>
            <input
              className="flex bg-inputbg px-3 font-normal text-secondary outline-highlight"
              name="nou"
              value={playerNum == 1 ? "" : playerNum}
              onChange={(e) => {
                e.target.value == ""
                  ? setPlayerNum(0)
                  : setPlayerNum(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="flex w-full items-center justify-evenly gap-1">
            <label className="flex">|</label>
            <input
              type="checkbox"
              checked={inGamePlayer["1"]}
              onChange={(e) => handlePlayerCheckboxes(e, "1")}
              className="flex h-4 w-4 rounded accent-highlight"
            />
            <label className="flex">인근</label>
            <label className="flex">|</label>
            <input
              type="checkbox"
              checked={inGamePlayer["2"]}
              onChange={(e) => handlePlayerCheckboxes(e, "2")}
              className="flex h-4 w-4 rounded accent-highlight"
            />
            <label className="flex">재이</label>
            <label className="flex">|</label>
            <input
              type="checkbox"
              checked={inGamePlayer["3"]}
              onChange={(e) => handlePlayerCheckboxes(e, "3")}
              className="flex h-4 w-4 rounded accent-highlight"
            />
            <label className="flex">찬웅</label>
            <label className="flex">|</label>
            <input
              type="checkbox"
              checked={inGamePlayer["4"]}
              onChange={(e) => handlePlayerCheckboxes(e, "4")}
              className="flex h-4 w-4 rounded accent-highlight"
            />
            <label className="flex">지훈</label>
            <label className="flex">|</label>
            <input
              type="checkbox"
              checked={inGamePlayer["5"]}
              onChange={(e) => handlePlayerCheckboxes(e, "5")}
              className="flex h-4 w-4 rounded accent-highlight"
            />
            <label className="flex">강원</label>
            <label className="flex">|</label>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="">점 당 금액:</div>
          <input
            className="bg-inputbg px-3 font-normal text-secondary outline-highlight"
            name="mpu"
            value={moneyPerUnit == 0 ? "" : moneyPerUnit}
            onChange={(e) => {
              e.target.value == ""
                ? setMoneyPerUnit(0)
                : setMoneyPerUnit(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="flex gap-16">
          <button
            className="rounded-xl border p-2 hover:bg-highlight active:bg-highlight/75"
            onClick={() => {
              updateTotalScores();
              clearCurrScores();
              clearScores();
              setRoundNum((prev) => prev + 1);
            }}
          >
            Round End
          </button>
          <button
            className="rounded-xl border p-2 hover:bg-highlight active:bg-highlight/75"
            onClick={() => {
              updateTotalMonies();
              setRoundNum(0);
            }}
          >
            Game End
          </button>
          <button
            className="rounded-xl border p-2 hover:bg-highlight active:bg-highlight/75"
            onClick={() => {
              setRoundNum(0);
              setPlayerNum(1);
              setMoneyPerUnit(0);
              setAvgScore(0);
              setFirstPlayer("");
              setLastPlayer("");
              clearScores();
              clearCurrScores();
              clearTotalScores();
              clearTotalMoney();
              clearInGamePlayer();
            }}
          >
            All Clear
          </button>
          <button
            className="rounded-xl border p-2 hover:bg-highlight active:bg-highlight/75"
            onClick={() => {
              insertData(totalMoney);
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="my-3 flex items-center justify-around text-xl font-bold">
        <div className="flex items-center gap-4">
          <div className="">
            현재 <span className="text-highlight">라운드</span>:
          </div>
          <div className="text-3xl">{roundNum}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            현재 라운드 <span className="text-highlight">평균 점수</span>:
          </div>
          <div className="text-3xl">{avgScore}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            현재 라운드 <span className="text-highlight">1위</span>:
          </div>
          <div className="text-3xl">{firstPlayer}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            현재 라운드 <span className="text-highlight">꼴찌</span>:
          </div>
          <div className="text-3xl">{lastPlayer}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <ScoreTable
            id="1"
            name={player["1"]}
            score={scores["1"]}
            setScore={setScores}
            currentScore={currScores["1"]}
            totalScore={totalScores["1"]}
            totalMoney={totalMoney["1"]}
          />
          <div className="border-t-1 mx-6 flex border" />
        </div>
        <div className="flex flex-col gap-4">
          <ScoreTable
            id="2"
            name={player["2"]}
            score={scores["2"]}
            setScore={setScores}
            currentScore={currScores["2"]}
            totalScore={totalScores["2"]}
            totalMoney={totalMoney["2"]}
          />
          <div className="border-t-1 mx-6 flex border" />
        </div>
        <div className="flex flex-col gap-4">
          <ScoreTable
            id="3"
            name={player["3"]}
            score={scores["3"]}
            setScore={setScores}
            currentScore={currScores["3"]}
            totalScore={totalScores["3"]}
            totalMoney={totalMoney["3"]}
          />
          <div className="border-t-1 mx-6 flex border" />
        </div>
        <div className="flex flex-col gap-4">
          <ScoreTable
            id="4"
            name={player["4"]}
            score={scores["4"]}
            setScore={setScores}
            currentScore={currScores["4"]}
            totalScore={totalScores["4"]}
            totalMoney={totalMoney["4"]}
          />
          <div className="border-t-1 mx-6 flex border" />
        </div>
        <div className="flex flex-col gap-4">
          <ScoreTable
            id="5"
            name={player["5"]}
            score={scores["5"]}
            setScore={setScores}
            currentScore={currScores["5"]}
            totalScore={totalScores["5"]}
            totalMoney={totalMoney["5"]}
          />
        </div>
      </div>
    </div>
  );
}
