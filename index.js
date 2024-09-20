const str = "Node.js course"
console.log(str.length)

function multiplyByTwo(num) {
  const len = num.toString().length
  let res = num

  for (let i = 0; i < len; i++) {
    res *= 2
  }

  return res
}

const number = 33
const result = multiplyByTwo(number)
console.log(result)
