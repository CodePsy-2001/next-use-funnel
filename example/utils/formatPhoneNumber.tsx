export function formatPhoneNumber(phoneNumber: string) {
  const isSeoulNumber = phoneNumber.startsWith("02");
  // 서울 국번(02)인 경우에만 지역번호가 2자리입니다.
  const areaCodeEndIndex = isSeoulNumber ? 2 : 3;

  // 10자리 전화번호 (또는 서울인 경우, 9자리 전화번호)에 대응하기 위해서
  // [0:areaCodeEndIndex], [areaCodeEndIndex:length-4], [length-4:length] 형식으로 나누고 join합니다.
  return [
    phoneNumber.slice(0, areaCodeEndIndex),
    phoneNumber.slice(areaCodeEndIndex, phoneNumber.length - 4),
    phoneNumber.slice(phoneNumber.length - 4),
  ].join("-");
}
