import {
  engine,
  Entity,
  InputAction,
  inputSystem,
  PointerEventType,
  removeEntityWithChildren,
  Transform
} from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

import { maps } from './maps/maps'
import { Road } from './road'
import { createTile, tileSize } from './tile'

const size = 13 // Game area size

export const setUpGameArea = (parent: Entity, level: number, onLevelFinished: (cleanup: () => void) => void) => {
  const map = maps[level]
  const roads: Road[] = []

  const gameArea = engine.addEntity()
  Transform.create(gameArea, { rotation: Quaternion.fromEulerDegrees(0, -90, 0), parent })

  // Shift the game tiles so that they are in center
  const startPos = -((size * tileSize) / 2) + tileSize / 2
  const tileParent = engine.addEntity()
  Transform.create(tileParent, {
    position: { x: startPos, y: 0, z: startPos },
    parent: gameArea
  })

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const tile = createTile(map, i, j, tileParent)
      if (tile.constructor.name === Road.name) {
        roads.push(tile as Road)
      }
    }
  }

  addSystem(roads, gameArea, onLevelFinished)
}
const addSystem = (roads: Road[], gameArea: Entity, onLevelFinished: (cleanup: () => void) => void) => {
  const roadsInWinningPath = roads.filter((road) => road.getIsPartOfWinningPath()).length

  const roadSystem = () => {
    let validRoadCount = 0

    roads.forEach((road) => {
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

      if (road.getIsRotationValid()) validRoadCount++
    })

    if (validRoadCount === roadsInWinningPath) {
      engine.removeSystem(roadSystem)
      roads.forEach((road) => road.removePointerEvents())

      onLevelFinished(() => {
        removeEntityWithChildren(engine, gameArea)
      })
    }
  }

  engine.addSystem(roadSystem)
}
