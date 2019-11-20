export const splitColorData = dataStr => {
  const exp1 = /[\{}]+/g;
  let str = dataStr.replace(exp1, "").split(",");
  return str;
};

const splitByTags = (str) => {
  let tagSegments = []

  let chars = str.split('')
  chars.forEach((char, i, text) => {
      if (char === '[' || char === '{') {
          // insert break if char is a parenthetical
          text[i] = `||${char}`
      }
  })

  chars = chars.join('').split('||')

  return chars
}

export const sortScriptSentences = (str, fn = splitByTags) => {
  let scriptBody = []
  let splitStr = fn(str)
  splitStr.forEach((el, i) => {
      let line = {}
      if (el.includes('[')) {
          let midpoint = el.indexOf(']')
          line.tag = el.slice(0, midpoint + 1)
          line.text = el.slice(midpoint + 1)
          scriptBody.push(line)
      }
      if (el.includes('{')) {
          let midpoint = el.indexOf('}')
          line.tag = el.slice(0, midpoint + 1)
          line.text = el.slice(midpoint + 1)
          scriptBody.push(line)

      }

      // scriptBody.push(line)
  })
  return scriptBody 
}  