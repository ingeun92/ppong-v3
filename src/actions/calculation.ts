"use server";

export const calCurrScore = async (scores: string[]): Promise<string> => {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += parseInt(scores[i]);
  }

  return sum.toString();
};

export const calAvgScore = async (
  currScores: { [key: string]: string },
  num: number,
): Promise<number> => {
  let sum = 0;
  for (const key in currScores) {
    sum += parseInt(currScores[key]);
  }

  return Math.round((sum / num) * 100) / 100;
};

export const calTotalMoney = async (
  totalScores: { [key: string]: string },
  inGamePlayers: { [key: string]: boolean },
  mpu: number,
  num: number,
): Promise<{ [key: string]: string }> => {
  let sumTotalScore = 0;
  for (const key in totalScores) {
    if (inGamePlayers[key]) {
      sumTotalScore += parseInt(totalScores[key]);
    }
  }
  const avgTotalScore = sumTotalScore / num;

  let totalMoney = {};
  for (const key in totalScores) {
    if (inGamePlayers[key]) {
      totalMoney = {
        ...totalMoney,
        [key]: (avgTotalScore - parseInt(totalScores[key])) * mpu,
      };
    } else {
      totalMoney = { ...totalMoney, [key]: "0" };
    }
  }

  return totalMoney;
};
