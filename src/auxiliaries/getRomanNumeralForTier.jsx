const getRomanNumeralForTier = (tier) => {
    if (tier === 1) return 'I'
    else if (tier === 2) return 'II'
    else if (tier === 3) return 'III'
    else if (tier === 4) return 'IV'
    else if (tier === 5) return 'V'
    else return null
}

export default getRomanNumeralForTier