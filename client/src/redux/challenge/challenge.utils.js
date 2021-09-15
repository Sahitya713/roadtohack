import { statuses } from "./challenge.types";

export const checkStatus = (start, end) => {
  const currTime = new Date();
  const startTime = new Date(start);
  const endTime = new Date(end);

  if (currTime < startTime) {
    return {
      status: statuses.W,
      message: `The challenge will start on ${startTime}`,
    };
  }
  if (currTime > endTime) {
    return { status: statuses.F, message: "The challenge has finished" };
  }
  return { status: statuses.O, message: "" };
};
