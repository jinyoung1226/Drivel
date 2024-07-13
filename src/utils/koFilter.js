const decomposeHangul = s => {
  const CHO = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const JUNG = [
    'ㅏ',
    'ㅐ',
    'ㅑ',
    'ㅒ',
    'ㅓ',
    'ㅔ',
    'ㅕ',
    'ㅖ',
    'ㅗ',
    'ㅘ',
    'ㅙ',
    'ㅚ',
    'ㅛ',
    'ㅜ',
    'ㅝ',
    'ㅞ',
    'ㅟ',
    'ㅠ',
    'ㅡ',
    'ㅢ',
    'ㅣ',
  ];
  const JONG = [
    '',
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  const chars = s.split('');
  let result = '';
  let choResult = '';

  for (let i = 0; i < chars.length; i++) {
    const code = chars[i].charCodeAt(0) - 44032;

    if (code >= 0 && code <= 11171) {
      const cho = Math.floor(code / 588);
      const jung = Math.floor((code - cho * 588) / 28);
      const jong = code % 28;

      result += CHO[cho] + JUNG[jung] + JONG[jong];
      choResult += CHO[cho];
    } else {
      result += chars[i];
      choResult += chars[i];
    }
  }

  return {full: result, cho: choResult};
};

const koFilter = (data, query) => {
  const isHangul = /[가-힣ㄱ-ㅎ]/.test(query);
  if (!isHangul) {
    // 영어 검색
    const lowerCaseQuery = query.toLowerCase();
    const startsWith = data.filter(item =>
      item.title.toLowerCase().startsWith(lowerCaseQuery),
    );
    const contains = data.filter(
      item =>
        item.title.toLowerCase().includes(lowerCaseQuery) &&
        !item.title.toLowerCase().startsWith(lowerCaseQuery),
    );
    return [...startsWith, ...contains].slice(0, 10);
  }

  // 한글 검색
  const {full: decomposedQueryFull, cho: decomposedQueryCho} =
    decomposeHangul(query);
  const isChoSearch = query
    .split('')
    .every(char => 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.includes(char));

  const startsWith = [];
  const contains = [];

  data.forEach(item => {
    const {full: decomposedItemFull, cho: decomposedItemCho} = decomposeHangul(
      item.title,
    );
    if (isChoSearch) {
      if (
        decomposedItemCho.startsWith(decomposedQueryCho) ||
        item.title.startsWith(query)
      ) {
        startsWith.push(item);
      } else if (
        decomposedItemCho.includes(decomposedQueryCho) ||
        item.title.includes(query)
      ) {
        contains.push(item);
      }
    } else {
      if (
        decomposedItemFull.startsWith(decomposedQueryFull) ||
        item.title.startsWith(query)
      ) {
        startsWith.push(item);
      } else if (
        decomposedItemFull.includes(decomposedQueryFull) ||
        item.title.includes(query)
      ) {
        contains.push(item);
      }
    }
  });

  return [...startsWith, ...contains].slice(0, 10);
};

export default koFilter;
