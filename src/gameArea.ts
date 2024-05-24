import { engine, Entity, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

import { Building, BuildingType, buildingTypeEnums } from './building'
import { Road, RoadType, roadTypeEnums } from './road'
import { getRandomItem } from './utils'

const tileSize = 3.2 // Tile model size in meters
const size = 10 // Game area size

export const setUpGameArea = (parent: Entity) => {
  const gameArea = engine.addEntity()
  Transform.create(gameArea, { parent })

  const roadTiles: Road[] = []
  const startPos = -((size * tileSize) / 2) + tileSize / 2

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const transform = {
        position: { x: startPos + i * tileSize, y: 0, z: startPos + j * tileSize },
        rotation: Quaternion.fromEulerDegrees(0, 0, 0),
        parent: gameArea
      }
      const isRoadTile = Math.random() < 0.5

      if (isRoadTile) {
        const roadType = getRandomItem<RoadType>(roadTypeEnums)
        roadTiles.push(new Road(transform, roadType))
      } else {
        const buildingType = getRandomItem<BuildingType>(buildingTypeEnums)
        new Building(transform, buildingType)
      }
    }
  }

  engine.addSystem(() => {
    roadTiles.forEach((road) => {
      const entity = road.getEntity()
      if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, entity)) {
        road.rotate()
      }

      if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {
        road.showBorder()
      }

      if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)) {
        road.hideBorder()
      }
    })
  })
}
