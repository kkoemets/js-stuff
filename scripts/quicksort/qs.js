const _ = require('lodash')

const arr = [7, 4, 1, 5, 9, 2, 3]

const quicksort = (currentArr) => {
    if (!currentArr) {
        return []
    }

    const pivotIndex = parseInt(`${currentArr.length / 2}`)
    const pivot = {
        pivotIndex,
        value: currentArr[pivotIndex],
    }

    const { lowerThanPivot, higherThanPivot } = _.chain([
        ...currentArr.slice(0, pivotIndex),
        ...currentArr.slice(pivotIndex + 1),
    ])
        .groupBy((val) =>
            val >= pivot.value ? 'higherThanPivot' : 'lowerThanPivot'
        )
        .value()

    return [
        ...quicksort(lowerThanPivot),
        pivot.value,
        ...quicksort(higherThanPivot),
    ]
}

console.log('result', quicksort(arr))
