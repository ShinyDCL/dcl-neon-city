import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'

import { SCENE_MIDDLE } from './config'
import { GameManager } from './gameManager'
import { setUpUI } from './ui/ui'

export function main() {
  const root = engine.addEntity()
  Transform.create(root, { position: { x: SCENE_MIDDLE, y: 0, z: SCENE_MIDDLE } })
  GltfContainer.create(root, { src: 'models/base.glb' })

  setUpUI()
  GameManager.startGame(root)
}
