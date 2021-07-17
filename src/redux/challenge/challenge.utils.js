import { statuses } from "./challenge.types";

export const checkStatus = (startTime, endTime) => {
  const currTime = new Date();

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
  //   if ((currTime > startTime) && (currTime< endTime))
};
