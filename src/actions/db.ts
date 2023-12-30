"use server";

import { connect } from "@/db/connection";
import { History } from "@/db/schema";

interface TotalScores {
  [key: string]: string;
}

export const insertData = async (data: TotalScores) => {
  await connect();
  console.log(data);
  const history = new History({
    money: data,
    date: new Date(),
  });
  await history.save();
};

export const findData = async () => {
  await connect();
  const result = await History.find();
  console.log(result);
};
