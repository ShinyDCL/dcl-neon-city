import { engine, Entity, TextAlignMode, TextShape, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { colors } from './ui/colors'

export const setUpInstructions = (parent: Entity) => {
  const instructions = engine.addEntity()
  Transform.create(instructions, {
    position: Vector3.create(10.2, 3.9, 21.9),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent
  })

  const title = engine.addEntity()
  Transform.create(title, {
    parent: instructions
  })
  TextShape.create(title, {
    text: 'Instructions',
    fontSize: 6,
    textColor: colors.orange
  })

  const text = engine.addEntity()
  Transform.create(text, {
    position: Vector3.create(-3.25, -0.4, 0),
    parent: instructions
  })
  TextShape.create(text, {
    text: '- Create a road from start to finish\n- Rotate roads by clicking on them\n- If you leave the scene, progress will be lost',
    fontSize: 3,
    textColor: colors.orange,
    textAlign: TextAlignMode.TAM_TOP_LEFT
  })
}
