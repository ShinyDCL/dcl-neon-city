import {
  AudioSource,
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
  Straight = 'RS',
  Turn = 'RT',
  Intersection3 = 'R3W', // 3 way intersection
  Intersection4 = 'R4W' // 4 way intersection
}

export const roadTypeEnums: RoadType[] = Object.values(RoadType)

const roadModels: Record<RoadType, string> = {
  [RoadType.Straight]: 'models/straight.glb',
  [RoadType.Turn]: 'models/turn.glb',
  [RoadType.Intersection3]: 'models/intersection3.glb',
  [RoadType.Intersection4]: 'models/intersection4.glb'
} as const

export class Road {
  private entity: Entity
  private border: Entity
  private partOfWinningPath?: boolean
  private validRotations?: number[]
  private isRotationValid?: boolean

  constructor(transform: TransformType, type: RoadType, partOfWinningPath?: boolean, validRotations?: number[]) {
    this.partOfWinningPath = partOfWinningPath
    this.validRotations = validRotations
    this.setIsRotationValid(Quaternion.toEulerAngles(transform.rotation).y)

    const entity = engine.addEntity()
    GltfContainer.create(entity, { src: roadModels[type] })
    Transform.create(entity, transform)
    this.entity = entity

    AudioSource.create(entity, {
      audioClipUrl: 'sounds/click.mp3',
      loop: false,
      playing: false
    })

    const border = engine.addEntity()
    Transform.create(border, {
      scale: { x: 0, y: 0, z: 0 },
      parent: entity
    })
    GltfContainer.create(border, { src: 'models/tileBorder.glb' })
    this.border = border

    this.addPointerEvents()
  }

  getEntity = (): Entity => this.entity

  getIsPartOfWinningPath = (): boolean => this.partOfWinningPath || false

  getIsRotationValid = (): boolean => this.isRotationValid || false

  setIsRotationValid = (rotation: number) => {
    this.isRotationValid = this.validRotations?.includes(Math.round(rotation))
  }

  /*
   * Rotates road tile 90 degrees clockwise
   */
  rotate = () => {
    const transform = Transform.getMutable(this.entity)
    const currentRotation = Quaternion.toEulerAngles(transform.rotation)
    const newRotationY = (currentRotation.y + 90) % 360
    console.log(newRotationY, this.validRotations)

    transform.rotation = Quaternion.fromEulerDegrees(currentRotation.x, newRotationY, currentRotation.z)
    this.setIsRotationValid(newRotationY)
    this.playSound()
  }

  /*
   * Shows border around the road tile
   */
  showBorder = () => {
    const transform = Transform.getMutable(this.border)
    transform.scale = Vector3.create(1, 1, 1)
  }

  /*
   * Hides border around the road tile
   */
  hideBorder = () => {
    const transform = Transform.getMutable(this.border)
    transform.scale = Vector3.create(0, 0, 0)
  }

  addPointerEvents = () => {
    PointerEvents.create(this.entity, {
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
  }

  removePointerEvents = () => {
    PointerEvents.deleteFrom(this.entity)
  }

  playSound = () => {
    const audioSource = AudioSource.getMutable(this.entity)
    audioSource.playing = true
  }
}
