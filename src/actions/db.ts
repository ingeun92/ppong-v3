"use server";

import { connect } from "@/db/connection";
import { History } from "@/db/schema";

interface ITotalMoney {
  [key: string]: string;
}

export const insertData = async (totalMoney: ITotalMoney) => {
  await connect();
  console.log("totalMoney: ", totalMoney);
  Object.keys(totalMoney).forEach((key) => {
    totalMoney[key] = (
      Math.round(parseFloat(totalMoney[key]) / 100) * 100
    ).toString();
  });

  const history = new History({
    money: totalMoney,
    date: new Date(),
  });
  await history.save();
};

export const findData = async () => {
  await connect();
  const result = await History.find();
  console.log(result);
};
