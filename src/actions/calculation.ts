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

  return sum / num;
};

export const calTotalMoney = async (
  totalScores: { [key: string]: string },
  mpu: number,
  num: number,
): Promise<{ [key: string]: string }> => {
  let sumTotalScore = 0;
  for (const key in totalScores) {
    sumTotalScore += parseInt(totalScores[key]);
  }
  const avgTotalScore = sumTotalScore / num;

  let totalMoney = {};
  for (const key in totalScores) {
    totalMoney = {
      ...totalMoney,
      [key]: (avgTotalScore - parseInt(totalScores[key])) * mpu,
    };
  }

  return totalMoney;
};
