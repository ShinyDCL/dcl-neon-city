import {
  engine,
  Entity,
  GltfContainer,
  InputAction,
  PointerEvents,
  PointerEventType,
  Transform,
  TransformType
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export enum RoadType {
  Straight = 'Straight',
  Turn = 'Turn',
  Intersection3 = 'Intersection3', // 3 way intersection
  Intersection4 = 'Intersection4' // 4 way intersection
}

export type RoadTypeKey = keyof typeof RoadType
export const roadTypeKeys = Object.keys(RoadType) as RoadTypeKey[]
export const roadTypeEnums: RoadType[] = roadTypeKeys.map((key) => RoadType[key])

const roadModels: Record<RoadType, string> = {
  [RoadType.Straight]: 'models/straight.glb',
  [RoadType.Turn]: 'models/turn.glb',
  [RoadType.Intersection3]: 'models/intersection3.glb',
  [RoadType.Intersection4]: 'models/intersection4.glb'
} as const

export class Road {
  private tileEntity: Entity
  private borderEntity: Entity

  constructor(transform: Partial<TransformType>, type: RoadType) {
    const tile = engine.addEntity()
    GltfContainer.create(tile, { src: roadModels[type] })
    Transform.create(tile, transform)

    const border = engine.addEntity()
    Transform.create(border, {
      scale: { x: 0, y: 0, z: 0 },
      parent: tile
    })
    GltfContainer.create(border, { src: 'models/tileBorder.glb' })

    PointerEvents.create(tile, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_POINTER,
            hoverText: 'Rotate'
          }
        },
        {
          eventType: PointerEventType.PET_HOVER_ENTER,
          eventInfo: {
            button: InputAction.IA_POINTER
          }
        },
        {
          eventType: PointerEventType.PET_HOVER_LEAVE,
          eventInfo: {
            button: InputAction.IA_POINTER
          }
        }
      ]
    })

    this.tileEntity = tile
    this.borderEntity = border
  }

  getEntity = (): Entity => this.tileEntity

  /*
   * Rotates road tile 90 degrees clockwise
   */
  rotate = () => {
    const transform = Transform.getMutable(this.tileEntity)
    const currentRotation = Quaternion.toEulerAngles(transform.rotation)
    transform.rotation = Quaternion.fromEulerDegrees(currentRotation.x, currentRotation.y + 90, currentRotation.z)
  }

  /*
   * Shows border around road tile
   */
  showBorder = () => {
    const transform = Transform.getMutable(this.borderEntity)
    transform.scale = Vector3.create(1, 1, 1)
  }

  /*
   * Hides border around road tile
   */
  hideBorder = () => {
    const transform = Transform.getMutable(this.borderEntity)
    transform.scale = Vector3.create(0, 0, 0)
  }
}
