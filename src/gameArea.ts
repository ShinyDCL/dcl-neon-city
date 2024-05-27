import { engine, Entity, GltfContainer, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

import { maps } from './maps/maps'
import { Road } from './road'
import { createTile, tileSize } from './tile'
import { getIsVisible, showLabel } from './ui/ui'

const size = 13 // Game area size

export const setUpGameArea = (parent: Entity) => {
  const gameArea = engine.addEntity()
  Transform.create(gameArea, { parent })

  // Shift the game tiles so that they are in center
  const startPos = -((size * tileSize) / 2) + tileSize / 2
  const gameTiles = engine.addEntity()
  Transform.create(gameTiles, {
    position: { x: startPos, y: 0, z: startPos },
    parent: gameArea
  })

  const roadTiles: Road[] = []
  const map = maps[1]

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const tile = createTile(map, i, j, gameTiles)
      if (tile.constructor.name === Road.name) {
        roadTiles.push(tile as Road)
      }
    }
  }

  addSystem(roadTiles)

  const startSign = engine.addEntity()
  GltfContainer.create(startSign, { src: 'models/startSign.glb' })
  Transform.create(startSign, {
    position: { x: 12 * tileSize, y: 0, z: 6 * tileSize },
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    parent: gameTiles
  })

  const finishSign = engine.addEntity()
  GltfContainer.create(finishSign, { src: 'models/finishSign.glb' })
  Transform.create(finishSign, {
    position: { x: 0 * tileSize, y: 0, z: 6 * tileSize },
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    parent: gameTiles
  })
}

const addSystem = (roadTiles: Road[]) => {
  const tilesInWinningPath = roadTiles.filter((road) => road.getIsPartOfWinningPath()).length

  engine.addSystem(() => {
    let validTileCount = 0

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

      if (road.getIsRotationValid()) validTileCount++
    })

    if (validTileCount === tilesInWinningPath && !getIsVisible()) showLabel()
  })
}
