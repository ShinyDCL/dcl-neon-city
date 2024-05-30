import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

import { SCENE_MIDDLE } from './config'
import { GameManager } from './gameManager'
import { setUpInstructions } from './instructionsBoard'
import { setUpUI } from './ui/ui'

export function main() {
  const root = engine.addEntity()
  Transform.create(root, {
    position: { x: SCENE_MIDDLE, y: 0, z: SCENE_MIDDLE },
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
  })
  GltfContainer.create(root, { src: 'models/scene.glb' })

  setUpUI()
  setUpInstructions(root)
  GameManager.startGame(root)
}
