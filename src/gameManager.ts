import { movePlayerTo } from '~system/RestrictedActions'

import { Entity } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { SCENE_ROTATION } from './config'
import { setUpGameArea } from './gameArea'
import { levelCount } from './levels'
import { openModal } from './ui/modal'
import { updateSidebar } from './ui/sidebar'

export abstract class GameManager {
  // Levels starts with 0, but to user it is displayed +1
  private static currentLevel: number = 0
  private static root: Entity | null = null

  public static startGame = (root: Entity) => {
    this.root = root
    this.startLevel(0)
  }

  public static finishGame = () => {
    openModal(`All levels completed!`, 'Ok', () => {})
    updateSidebar(this.currentLevel + 1)
  }

  public static startLevel = (level: number) => {
    if (!this.root) return

    this.teleportPlayer()
    this.currentLevel = level
    updateSidebar(level)
    setUpGameArea(this.root, level, this.finishLevel)

    if (level === 1) {
      // Win condition here - finished first (level 0) and started second (level 1)
      console.log('win')
    }
  }

  public static finishLevel = (cleanup: () => void) => {
    // Finishing last level
    if (this.currentLevel + 1 >= levelCount) {
      this.finishGame()
      return
    }

    openModal(`Level ${this.currentLevel + 1} completed!`, 'Start next level', () => {
      cleanup()
      this.startLevel(this.currentLevel + 1)
    })
  }

  private static teleportPlayer = () => {
    // Teleport player to correct position relative to scene rotation
    const sceneRotation = SCENE_ROTATION % 360
    let x = 32
    let z = 62

    if (sceneRotation === 90) {
      x = 62
      z = 32
    } else if (sceneRotation === 180) {
      x = 32
      z = 2
    } else if (sceneRotation === 270) {
      x = 2
      z = 32
    }

    movePlayerTo({
      newRelativePosition: Vector3.create(x, 0, z),
      cameraTarget: Vector3.create(32, 1, 32)
    })
  }
}
