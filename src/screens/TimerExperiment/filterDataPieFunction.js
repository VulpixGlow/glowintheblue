import React from 'react'

export default function filterUserDataPieChart(arr, email) {
  let focusTotal = 0
  let mediateTotal = 0
  let moveTotal = 0
  let connectTotal = 0
  let otherTotal = 0

  let filterArr = arr.filter(obj => {
    if (obj.user.email === email) {
      return obj
    }
  })

  console.log('Filtered Arr', filterArr)

  filterArr.forEach(obj => {
    if (obj.categoryName === 'Focus') {
      focusTotal += obj.time
      console.log(focusTotal, 'Focus Total')
    } else if (obj.categoryName === 'Mediate') {
      mediateTotal += obj.time
    } else if (obj.categoryName === 'Move') {
      moveTotal += obj.time
    } else if (obj.categoryName === 'Connect') {
      connectTotal += obj.time
    } else {
      otherTotal += obj.time
    }
  })

  let catDataObj = [
    {
      name: 'Focus',
      time: focusTotal,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Mediate',
      time: mediateTotal,
      color: 'darkpurple',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Move',
      time: moveTotal,
      color: 'gold',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Connnect',
      time: connectTotal,
      color: 'white',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Other',
      time: otherTotal,
      color: 'pink',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ]

  return catDataObj
}
