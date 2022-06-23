const getRomanNumeralForTier = tier => {
  switch (tier) {
    case 1:
      return 'I'
    case 2:
      return 'II'
    case 3:
      return 'III'
    case 4:
      return 'IV'
    case 5:
      return 'V'
    default:
      return null
  }
}

export default getRomanNumeralForTier
