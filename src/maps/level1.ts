import { Tile } from '../tile'

export const level1: Tile[][] = [
  [
    { tileType: 'HL' },
    { tileType: 'HS' },
    { tileType: 'HS' },
    { tileType: 'HM' },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [0, 180] },
    { tileType: 'HL' },
    { tileType: 'RS' },
    { tileType: 'RS' },
    { tileType: 'RT' },
    { tileType: 'HS' }
  ],
  [
    { tileType: 'RT' },
    { tileType: 'RS' },
    { tileType: 'RT' },
    { tileType: 'HL' },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [0, 180] },
    { tileType: 'HS' },
    { tileType: 'HL' },
    { tileType: 'HS' },
    { tileType: 'RS' },
    { tileType: 'HS' }
  ],
  [
    { tileType: 'RS' },
    { tileType: 'HM' },
    { tileType: 'RS' },
    { tileType: 'OL' },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [270] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [90] },
    { tileType: 'OL' },
    { tileType: 'RS' },
    { tileType: 'HM' }
  ],
  [
    { tileType: 'RT' },
    { tileType: 'R3W' },
    { tileType: 'RT' },
    { tileType: 'OM' },
    { tileType: 'OL' },
    { tileType: 'OM' },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [270] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'R3W', partOfWinningPath: true, validRotations: [180] },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [90] }
  ],
  [
    { tileType: 'HM' },
    { tileType: 'RS' },
    { tileType: 'OS' },
    { tileType: 'OL' },
    { tileType: 'OS' },
    { tileType: 'OM' },
    { tileType: 'OS' },
    { tileType: 'OS' },
    { tileType: 'HM' },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [0, 180] }
  ],
  [
    { tileType: 'HS' },
    { tileType: 'RT' },
    { tileType: 'R3W', partOfWinningPath: true, validRotations: [0] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [90] },
    { tileType: 'OM' },
    { tileType: 'HM' },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [0, 180] }
  ],
  [
    { tileType: 'RS' },
    { tileType: 'HS' },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [0, 180] },
    { tileType: 'OL' },
    { tileType: 'OS' },
    { tileType: 'OL' },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [270] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [180] }
  ],
  [
    { tileType: 'RS' },
    { tileType: 'HM' },
    { tileType: 'R3W', partOfWinningPath: true, validRotations: [270] },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [90, 270] },
    { tileType: 'RT', partOfWinningPath: true, validRotations: [90] },
    { tileType: 'OS' },
    { tileType: 'OL' },
    { tileType: 'OL' },
    { tileType: 'HL' },
    { tileType: 'HM' }
  ],
  [
    { tileType: 'RS' },
    { tileType: 'HM' },
    { tileType: 'RS' },
    { tileType: 'HS' },
    { tileType: 'R3W', partOfWinningPath: true, validRotations: [270] },
    { tileType: 'RS' },
    { tileType: 'RS' },
    { tileType: 'RS' },
    { tileType: 'RS' },
    { tileType: 'HS' }
  ],
  [
    { tileType: 'RT' },
    { tileType: 'RS' },
    { tileType: 'RT' },
    { tileType: 'HL' },
    { tileType: 'RS', partOfWinningPath: true, validRotations: [0, 180] },
    { tileType: 'HS' },
    { tileType: 'HM' },
    { tileType: 'HS' },
    { tileType: 'HM' },
    { tileType: 'HS' }
  ]
] as Tile[][]
