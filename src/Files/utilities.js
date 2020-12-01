import numeral from "numeral";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : +1));
};
// .......
export const NormalFiguresToCommas = (x) => {
  x = parseInt(x);
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};
// .......

export const prettyPrintStatPlus = (stat) => {
  if (stat > 10000) {
    return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
  } else {
    return `+${NormalFiguresToCommas(stat)}`;
  }
};

export const prettyPrintStat = (stat) => {
  if (stat > 10000) {
    return stat ? `${numeral(stat).format("0.0a")}` : "+0";
  } else {
    return NormalFiguresToCommas(stat);
  }
};
