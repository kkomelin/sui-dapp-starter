import { FC } from 'react'

// Animal emojis are represented by the range [1F400-1F43F] https://apps.timwhitlock.info/unicode/inspect/hex/1F400-1F43F
// The number of possible animal emojis (63) is hardcoded on chain,
// so the chain chooses a number from the range [0,63] randomly,
// and we convert it to the corresponding animal emoji.

const RANGE_LOWEST = Number('0x1F400')

interface IProps {
  index: number
}
const AnimalEmoji: FC<IProps> = ({ index }) => {
  // If a wrong index given for some reason, we render nothing.
  if (index < 0 || index > 63) {
    console.error('A wrong emoji index given', index)
    return <></>
  }
  return <>{numToAnimalEmoji(index)}</>
}

export default AnimalEmoji

/**
 * Convert the numeric emoji index to the unicode representation of the corresponding animal emoji.
 *
 * @param index
 * @returns
 */
const numToAnimalEmoji = (index: number) => {
  const codePoint = RANGE_LOWEST + index
  return String.fromCodePoint(codePoint)
}
