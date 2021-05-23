import React from 'react';

export default function combineData(catArr, timeArr) {
  let focusTotal = 0;
  let meditateTotal = 0;
  let moveTotal = 0;
  let connectTotal = 0;
  let otherTotal = 0;

  let combinedTimeValuesArray = catArr.reduce((acc, currentVal, index) => {
    if (currentVal === 'Focus') focusTotal += timeArr[index];
    if (currentVal === 'Mediate') meditateTotal += timeArr[index];
    if (currentVal === 'Move') moveTotal += timeArr[index];
    if (currentVal === 'Connect') connectTotal += timeArr[index];
    if (currentVal === 'Other') otherTotal += timeArr[index];

    acc = [focusTotal, meditateTotal, moveTotal, connectTotal, otherTotal];
    return acc;
  }, []);

  return combinedTimeValuesArray;
}
