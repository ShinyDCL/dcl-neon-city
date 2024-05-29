import { Entity } from '@dcl/sdk/ecs'

import { setUpGameArea } from './gameArea'
import { openModal } from './ui/modal'
import { updateSidebar } from './ui/sidebar'

export abstract class GameManager {
  private static currentLevel: number = 0
  private static root: Entity | null = null

  public static startGame = (root: Entity) => {
    this.root = root
    this.startLevel(0)
  }

  public static startLevel = (level: number) => {
    if (!this.root) return

    this.currentLevel = level
    updateSidebar(level)
    setUpGameArea(this.root, level, this.finishLevel)
    // teleport user to start area
  }

  public static finishLevel = (cleanup: () => void) => {
    openModal(() => {
      cleanup()
      this.startLevel(this.currentLevel + 1)
    })
  }
}
