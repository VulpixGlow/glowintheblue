import React from 'react'

export default function filterUserData(arr, email) {
  console.log('Inside FilterDataFunction')
  let focusTotal = 0
  let meditateTotal = 0
  let moveTotal = 0
  let connectTotal = 0
  let otherTotal = 0

  let filterArr = arr.filter(obj => {
    if (obj.user.email === email) {
      return obj
    }
  })

  console.log('Filtered Arr- should only see the user data', filterArr)

  filterArr.forEach(obj => {
    if (obj.categoryName === 'Focus') {
      focusTotal += obj.time
    } else if (obj.categoryName === 'Meditate') {
      meditateTotal += obj.time
    } else if (obj.categoryName === 'Move') {
      moveTotal += obj.time
    } else if (obj.categoryName === 'Connect') {
      connectTotal += obj.time
    } else {
      otherTotal += obj.time
    }
  })

  let categoryDataArr = [
    {
      time: focusTotal,
      title: 'Focus',
      description: `I've spent a total of ${focusTotal} minutes on different task with a focused mind .`
    },
    {
      time: meditateTotal,
      title: 'Meditate',
      description: `I've spent a total of ${meditateTotal} minutes allowing my mind and body to rest through meditation.`
    },
    {
      time: moveTotal,
      title: 'Move',
      description: `I've spent a total of ${moveTotal} minutes moving my body and being active .`
    },
    {
      time: connectTotal,
      title: 'Connnect',
      description: `I've spent a total of ${connectTotal} minutes connecting with friends, family, co-workers and pets.`
    },
    {
      time: otherTotal,
      title: 'Other',
      description: `I've spent a total of ${otherTotal} minutes on other task that enhance my emotional, mental and physical well-being.`
    }
  ]
  console.log('Data structure returned from FilterDataFunction', categoryDataArr)
  return categoryDataArr
}
