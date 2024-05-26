import { Entity } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

import { Building, BuildingType } from './building'
import { Road, RoadType } from './road'
import { getRandomItem } from './utils'

export type Rotation = 0 | 90 | 180 | 270

export interface Tile {
  tileType: RoadType | BuildingType
  partOfWinningPath?: boolean
  validRotations?: Rotation[]
}

export const tileSize = 3.2 // Tile model size in meters
export const rotations: Rotation[] = [0, 90, 180, 270]

export const createTile = (map: Tile[][], row: number, column: number, parent: Entity): Road | Building => {
  const { tileType, validRotations, partOfWinningPath } = map[row][column]
  const rotationY = getRandomItem(rotations)
  const transform = {
    position: { x: row * tileSize, y: 0, z: column * tileSize },
    rotation: Quaternion.fromEulerDegrees(0, rotationY, 0),
    scale: { x: 1, y: 1, z: 1 },
    parent
  }

  if (isRoadType(tileType)) {
    return new Road(transform, tileType as RoadType, partOfWinningPath, validRotations)
  } else {
    return new Building(transform, tileType as BuildingType)
  }
}

const isRoadType = (value: any): value is RoadType => Object.values(RoadType).includes(value)
