import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

import { levels, LevelStatus } from '../levels'
import { colors } from './colors'

const gameLevels = [...levels]
const statusColor = {
  [LevelStatus.Completed]: colors.green,
  [LevelStatus.InProgress]: colors.orange,
  [LevelStatus.NotCompleted]: Color4.Gray()
}

export const Sidebar = () => (
  <UiEntity
    uiTransform={{
      flexGrow: 1,
      alignSelf: 'flex-start',
      justifyContent: 'flex-end',
      margin: { top: 100, right: 8 }
    }}
  >
    <UiEntity
      uiTransform={{
        flexDirection: 'column'
      }}
    >
      {gameLevels.map((level) => (
        <UiEntity
          key={level.title}
          uiTransform={{
            width: 170,
            height: 70,
            margin: { bottom: 8 },
            padding: 4,
            flexDirection: 'column'
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
              flexGrow: 1
            }}
            uiText={{
              value: level.title,
              fontSize: 26,
              color: colors.white
            }}
          />
          <UiEntity
            uiTransform={{
              flexGrow: 1
            }}
            uiText={{
              value: level.status,
              fontSize: 18,
              color: statusColor[level.status]
            }}
          />
        </UiEntity>
      ))}
    </UiEntity>
  </UiEntity>
)

export const updateSidebar = (newLevel: number) => {
  gameLevels.forEach((level, index) => {
    level.status =
      newLevel === index ? LevelStatus.InProgress : newLevel > index ? LevelStatus.Completed : LevelStatus.NotCompleted
  })
}
