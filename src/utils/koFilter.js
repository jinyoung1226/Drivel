const decomposeHangul = s => {
  const CHO = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ',
    'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ',
    'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];
  const JUNG = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
    'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
    'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ',
    'ㅡ', 'ㅢ', 'ㅣ',
  ];
  const JONG = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ',
    'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ',
    'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ',
    'ㅌ', 'ㅍ', 'ㅎ',
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

  return { full: result, cho: choResult };
};

const koFilter = (data, query) => {
  const isHangul = /[가-힣ㄱ-ㅎ]/.test(query);
  const lowerCaseQuery = query.toLowerCase();

  if (!isHangul) {
    // 영어 검색: title과 waypoints 모두 검색
    const startsWith = data.filter(item => {
      const title = item.title ? item.title.toLowerCase() : '';
      const waypoints = item.waypoints ? item.waypoints.toLowerCase() : '';
      // const region = item.region ? item.region.toLowerCase() : '';
      const address = item.address ? item.address.toLowerCase() : '';
      return title.startsWith(lowerCaseQuery) || waypoints.startsWith(lowerCaseQuery) || address.startsWith(lowerCaseQuery);
    });

    const contains = data.filter(item => {
      const title = item.title ? item.title.toLowerCase() : '';
      const waypoints = item.waypoints ? item.waypoints.toLowerCase() : '';
      // const region = item.region ? item.region.toLowerCase() : '';
      const address = item.address ? item.address.toLowerCase() : '';
      return (
        (title.includes(lowerCaseQuery) && !title.startsWith(lowerCaseQuery)) ||
        (waypoints.includes(lowerCaseQuery) && !waypoints.startsWith(lowerCaseQuery)) ||
        // (region.includes(lowerCaseQuery) && !region.startsWith(lowerCaseQuery)) ||
        (address.includes(lowerCaseQuery) && !address.startsWith(lowerCaseQuery))
      );
    });

    return [...startsWith, ...contains].slice(0, 10);
  }

  // 한글 검색
  const { full: decomposedQueryFull, cho: decomposedQueryCho } = decomposeHangul(query);
  const isChoSearch = query
    .split('')
    .every(char => 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.includes(char));

  const startsWith = [];
  const contains = [];

  data.forEach(item => {
    const title = item.title ? item.title : '';
    const waypoints = item.waypoints ? item.waypoints : '';
    // const region = item.region ? item.region : '';
    const address = item.address ? item.address : '';
    const combined = title + waypoints + address;

    const { full: decomposedItemFull, cho: decomposedItemCho } = decomposeHangul(combined);

    if (isChoSearch) {
      if (
        decomposedItemCho.startsWith(decomposedQueryCho) ||
        title.startsWith(query) ||
        waypoints.startsWith(query) ||
        // region.startsWith(query) ||
        address.startsWith(query)
      ) {
        startsWith.push(item);
      } else if (
        decomposedItemCho.includes(decomposedQueryCho) ||
        title.includes(query) ||
        waypoints.includes(query) ||
        // region.includes(query) ||
        address.includes(query)
      ) {
        contains.push(item);
      }
    } else {
      if (
        decomposedItemFull.startsWith(decomposedQueryFull) ||
        title.startsWith(query) ||
        waypoints.startsWith(query) ||
        // region.startsWith(query) ||
        address.startsWith(query)
      ) {
        startsWith.push(item);
      } else if (
        decomposedItemFull.includes(decomposedQueryFull) ||
        title.includes(query) ||
        waypoints.includes(query) ||
        // region.includes(query) ||
        address.includes(query)
      ) {
        contains.push(item);
      }
    }
  });

  // 중복 제거 및 상위 10개 반환
  const uniqueResults = [];
  const seen = new Set();

  [...startsWith, ...contains].forEach(item => {
    const identifier = JSON.stringify(item);
    if (!seen.has(identifier)) {
      seen.add(identifier);
      uniqueResults.push(item);
    }
  });

  return uniqueResults.slice(0, 10);
};

export default koFilter;
