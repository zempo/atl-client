export const splitColorData = dataStr => {
  const exp1 = /[\{}]+/g;
  let str = dataStr.replace(exp1, "").split(",");
  return str;
};

export const splitByTags = (str) => { 
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

export const sortScriptSentences = (str, callback = splitByTags) => {
  let scriptBody = []
  let splitStr = callback(str)
  splitStr.forEach((el, i) => {
      let para = {lines: null, tag: null, actor: null} 
      if (el.includes('[')) {
          let midpoint = el.indexOf(']') + 1
          if (el.includes('((')) {
              midpoint = el.indexOf('))') + 2
          }
          para.tag = el.slice(1, midpoint - 1)

          let sortLn = el.slice(midpoint)
            sortLn = el.slice(midpoint).split('')
            sortLn.forEach((char, i, chars) => {
              if (el.includes('...') && (char === '.') && ((chars[i - 1] !== char && chars[i + 1] !== char) || (chars[i - 1] === char && chars[i + 1] !== char))) {
                chars[i] = `${char}||`  
              }
              if ((char === '?' || char === '!' || char === ')') && para.tag !== 'Header'){
                chars[i] = `${char}||` 
              }
              if (char === '(') {
                chars[i] = `||${char}`
              }
            })
            sortLn = sortLn.join('').split('||')
            sortLn = sortLn.filter((l) => l !== ' ')
          para.lines = sortLn  
          scriptBody.push(para)
      }
      if (el.includes('{')) {
          let midpoint = el.indexOf('}') + 1
          if (el.includes('((')) {
              midpoint = el.indexOf('))') + 2
          }
          para.actor = el.slice(0, midpoint).replace('{', '').replace('}', '').replace('(', '').replace(')', '')
          let sortLn = el.slice(midpoint).split('')
          sortLn.forEach((char, i, chars) => {
            if (el.includes('...') && (char === '.') && ((chars[i - 1] !== char && chars[i + 1] !== char) || (chars[i - 1] === char && chars[i + 1] !== char))) {
              chars[i] = `${char}||`  
            }
            if ((char === '?' || char === '!' || char === ')') && para.tag !== 'Header'){
              chars[i] = `${char}||` 
            }
            if (char === '(') {
              chars[i] = `||${char}`
            }
          })
          sortLn = sortLn.join('').split('||')
          sortLn = sortLn.filter((l) => l !== ' ')
          para.lines = sortLn  
          scriptBody.push(para)
      } 

      // scriptBody.push(line)
  })
  return scriptBody 
} 

export const compareDatesAsc = (a, b) => {
  const dateA = Date.parse(a.date_created);
  const dateB = Date.parse(b.date_created);
  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison;
};
export const compareDatesDesc = (a, b) => {
  const dateA = Date.parse(a.date_created);
  const dateB = Date.parse(b.date_created);
  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison * -1;
};

export const sortByKeyword = (scriptsValue, keyword) => {
  if (keyword) {
    const byKeyword = scriptsValue.filter((script) => {
      let title = script.title.toLowerCase()
      let author = script.author.toLowerCase()
      let subtitle = script.subtitle.toLowerCase()
      let body = script.body.toLowerCase()
      let searchTerm = keyword.toLowerCase()
      if (title.includes(searchTerm) || author.includes(searchTerm) || subtitle.includes(searchTerm) || body.includes(searchTerm)) {
        return 1
      } else {
        return 0
      }
    })
    return byKeyword
  } else {
    return scriptsValue
  }
}

export const sortBySelection = (scriptsValue, selection, direction) => {
  if (selection === 'abc') {
    
  } else if (selection === 'date') {
    
  } else if (selection === 'size') {

  } else {
    return scriptsValue
  }
}