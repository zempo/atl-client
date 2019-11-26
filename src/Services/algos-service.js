export const splitColorData = dataStr => {
  const exp1 = /[\{}]+/g;
  let str = dataStr.replace(exp1, "").split(",");
  return str;
};

export const splitByTags = str => {
  let chars = str.split("");
  chars.forEach((char, i, text) => {
    if (char === "[" || char === "{") {
      // insert break if char is a parenthetical
      text[i] = `||${char}`;
    }
  });

  chars = chars.join("").split("||");

  return chars;
};

export const sortScriptSentences = (str, callback = splitByTags) => {
  let scriptBody = [];
  let splitStr = callback(str);
  splitStr.forEach((el, i) => {
    let para = { lines: null, tag: null, actor: null };
    if (el.includes("[")) {
      let midpoint = el.indexOf("]") + 1;
      if (el.includes("((")) {
        midpoint = el.indexOf("))") + 2;
      }
      para.tag = el.slice(1, midpoint - 1);

      let sortLn = el.slice(midpoint);
      sortLn = el.slice(midpoint).split("");
      sortLn.forEach((char, i, chars) => {
        if (
          el.includes("...") &&
          char === "." &&
          ((chars[i - 1] !== char && chars[i + 1] !== char) ||
            (chars[i - 1] === char && chars[i + 1] !== char))
        ) {
          chars[i] = `${char}||`;
        }
        if (
          (char === "?" || char === "!" || char === ")") &&
          para.tag !== "Header"
        ) {
          chars[i] = `${char}||`;
        }
        if (char === "(") {
          chars[i] = `||${char}`;
        }
      });
      sortLn = sortLn.join("").split("||");
      sortLn = sortLn.filter(l => l !== " ");
      para.lines = sortLn;
      scriptBody.push(para);
    }
    if (el.includes("{")) {
      let midpoint = el.indexOf("}") + 1;
      if (el.includes("((")) {
        midpoint = el.indexOf("))") + 2;
      }
      para.actor = el
        .slice(0, midpoint)
        .replace("{", "")
        .replace("}", "")
        .replace("(", "")
        .replace(")", "");
      let sortLn = el.slice(midpoint).split("");
      sortLn.forEach((char, i, chars) => {
        if (
          el.includes("...") &&
          char === "." &&
          ((chars[i - 1] !== char && chars[i + 1] !== char) ||
            (chars[i - 1] === char && chars[i + 1] !== char))
        ) {
          chars[i] = `${char}||`;
        }
        if (
          (char === "?" || char === "!" || char === ")") &&
          (para.tag !== "Header" ||
            para.tag !== "Shot" ||
            para.tag !== "Transition")
        ) {
          chars[i] = `${char}||`;
        }
        if (char === "(") {
          chars[i] = `||${char}`;
        }
      });
      sortLn = sortLn.join("").split("||");
      sortLn = sortLn.filter(l => l !== " ");
      para.lines = sortLn;
      scriptBody.push(para);
    }

    // scriptBody.push(line)
  });
  return scriptBody;
};

export const compareDatesAsc = (a, b) => {
  let dateA = Date.parse(a.date_created);
  if (a.date_updated !== null) {
    dateA = Date.parse(a.date_updated);
  }
  let dateB = Date.parse(b.date_created);
  if (b.date_updated !== null) {
    dateB = Date.parse(b.date_updated);
  }
  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison;
};

export const compareDatesDesc = (a, b) => {
  let dateA = Date.parse(a.date_created);
  if (a.date_updated !== null) {
    dateA = Date.parse(a.date_updated);
  }
  let dateB = Date.parse(b.date_created);
  if (b.date_updated !== null) {
    dateB = Date.parse(b.date_updated);
  }
  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison * -1;
};

export const compareAlphaAsc = (a, b) => {
  let titleA = a.title;
  let titleB = b.title;
  let comparison = 0;
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
};

export const compareAlphaDesc = (a, b) => {
  let titleA = a.title;
  let titleB = b.title;
  let comparison = 0;
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison * -1;
};

export const compareSizeAsc = (a, b) => {
  let bodyA = a.body.length;
  let bodyB = b.body.length;
  let comparison = 0;
  if (bodyA > bodyB) {
    comparison = 1;
  } else if (bodyA < bodyB) {
    comparison = -1;
  }
  return comparison;
};

export const compareSizeDesc = (a, b) => {
  let bodyA = a.body.length;
  let bodyB = b.body.length;
  let comparison = 0;
  if (bodyA > bodyB) {
    comparison = 1;
  } else if (bodyA < bodyB) {
    comparison = -1;
  }
  return comparison * -1;
};

export const sortByKeyword = (scriptsValue, keyword) => {
  if (keyword) {
    const byKeyword = scriptsValue.filter(script => {
      let title = script.title.toLowerCase();
      let author = script.author.toLowerCase();
      let subtitle = script.subtitle.toLowerCase();
      let body = script.body.toLowerCase();
      let searchTerm = keyword.toLowerCase();
      if (
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        subtitle.includes(searchTerm) ||
        body.includes(searchTerm)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    return byKeyword;
  } else {
    return scriptsValue;
  }
};

export const sortBySelection = (scriptsValue, selection, direction) => {
  if (selection === "abc" && direction === "asc") {
    let sortedScripts = scriptsValue.sort(compareAlphaAsc);
    return sortedScripts;
  } else if (selection === "abc" && direction === "desc") {
    let sortedScripts = scriptsValue.sort(compareAlphaDesc);
    return sortedScripts;
  } else if (selection === "date" && direction === "asc") {
    let sortedScripts = scriptsValue.sort(compareDatesAsc);
    return sortedScripts;
  } else if (selection === "date" && direction === "desc") {
    let sortedScripts = scriptsValue.sort(compareDatesDesc);
    return sortedScripts;
  } else if (selection === "size" && direction === "asc") {
    let sortedScripts = scriptsValue.sort(compareSizeAsc);
    return sortedScripts;
  } else if (selection === "size" && direction === "desc") {
    let sortedScripts = scriptsValue.sort(compareSizeDesc);
    return sortedScripts;
  } else {
    return scriptsValue;
  }
};

export const ProcessMsg = (message, maxLength) => {
  if (message.length > maxLength) {
    return message.substring(0, maxLength) + "...";
  } else {
    return message;
  }
};

export const formateScriptDate = isoStr => {
  let dateToFormat = isoStr;
  let getDateStr = dateToFormat.split("T")[0];
  let d = getDateStr.split("-");
  let newDate = {};
  newDate.year = d[0];
  newDate.month = d[1];
  newDate.day = d[2];

  let months = new Array();
  months[1] = "January";
  months[2] = "February";
  months[3] = "March";
  months[4] = "April";
  months[5] = "May";
  months[6] = "June";
  months[7] = "July";
  months[8] = "August";
  months[9] = "September";
  months[10] = "October";
  months[11] = "November";
  months[12] = "December";
  newDate.month = months[newDate.month];

  let fullDate = `${newDate.month} ${newDate.day}, ${newDate.year}`;
  return fullDate;
};
