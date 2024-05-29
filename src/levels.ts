export const levelCount = 5

export enum LevelStatus {
  Completed = 'Completed',
  InProgress = 'In progress',
  NotCompleted = 'Not completed'
}

export const levels = [...Array(levelCount).keys()].map((index) => ({
  title: `Level ${index + 1}`,
  status: LevelStatus.NotCompleted
}))
