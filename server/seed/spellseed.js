const path = require('path')
const fs = require('fs')

const csvPath = path.join(__dirname, './skyrim_spells.csv')
const dataArr = fs.readFileSync(csvPath, 'utf8').split('\n')

const arrayOfDatabaseObjects = data => {
  const dbRows = data.slice(1, data.length)
  let arrayOfDBObjects = []

  for (let row = 0; row < dbRows.length; row++) {
    let obj = {}
    const properties = data[0].split(',')
    let currentRow = dbRows[row].split(',')

    for (let i = 0; i < properties.length; i++) {
      obj[properties[i]] = currentRow[i]
    }
    if (obj.title.length) {
      arrayOfDBObjects.push(obj)
    }
  }
  return arrayOfDBObjects
}

const allSpells = arrayOfDatabaseObjects(dataArr)

module.exports = allSpells
