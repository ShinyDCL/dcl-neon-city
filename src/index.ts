import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'

import { SCENE_MIDDLE } from './config'
import { setUpGameArea } from './gameArea'

export function main() {
  const scene = engine.addEntity()
  Transform.create(scene, { position: { x: SCENE_MIDDLE, y: 0, z: SCENE_MIDDLE } })
  GltfContainer.create(scene, { src: 'models/base.glb' })

  setUpGameArea(scene)
}
