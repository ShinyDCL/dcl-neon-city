import { engine, Entity, InputAction, inputSystem, PointerEventType, Transform } from '@dcl/sdk/ecs'

import { maps } from './maps/maps'
import { Road } from './road'
import { createTile, tileSize } from './tile'

const size = 10 // Game area size

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
  const map = maps[0]

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const tile = createTile(map, i, j, gameTiles)
      if (tile.constructor.name === Road.name) {
        roadTiles.push(tile as Road)
      }
    }
  }

  addSystem(roadTiles)
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

    if (validTileCount === tilesInWinningPath) console.log('won')
  })
}
