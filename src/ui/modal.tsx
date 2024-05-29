import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

import { colors } from './colors'

let isOpen = false
let closeCallback: (() => void) | null

export const Modal = () => (
  <UiEntity
    uiTransform={{
      display: isOpen ? 'flex' : 'none',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      positionType: 'absolute',
      pointerFilter: 'block'
    }}
  >
    <UiEntity
      uiTransform={{
        width: 600,
        height: 300,
        padding: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{
        textureMode: 'nine-slices',
        texture: {
          src: 'images/background1.png'
        },
        textureSlices: {
          top: 0.2,
          bottom: 0.2,
          left: 0.2,
          right: 0.2
        }
      }}
    >
      <UiEntity
        uiTransform={{
          height: 40
        }}
        uiText={{
          value: 'Level completed!',
          fontSize: 40,
          color: colors.white
        }}
      />
      <UiEntity
        uiTransform={{
          padding: 30,

          height: 40,
          width: 360
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: {
            src: 'images/background2.png'
          },
          textureSlices: {
            top: 0.2,
            bottom: 0.2,
            left: 0.2,
            right: 0.2
          }
        }}
        uiText={{
          value: 'Start next level',
          fontSize: 30,
          color: colors.orange
        }}
        onMouseUp={closeModal}
      />
    </UiEntity>
  </UiEntity>
)

export const openModal = (callback: () => void) => {
  isOpen = true
  closeCallback = callback
}
export const closeModal = () => {
  isOpen = false

  if (closeCallback) {
    closeCallback()
    closeCallback = null
  }
}
