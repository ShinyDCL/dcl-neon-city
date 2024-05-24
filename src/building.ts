import { engine, GltfContainer, Transform, TransformType } from '@dcl/sdk/ecs'

export enum BuildingType {
  OfficeSmall = 'OfficeSmall',
  OfficeMedium = 'OfficeMedium',
  OfficeLarge = 'OfficeLarge',
  HouseSmall = 'HouseSmall',
  HouseMedium = 'HouseMedium',
  HouseLarge = 'HouseLarge'
}

export type BuildingTypeKey = keyof typeof BuildingType
export const buildingTypeKeys = Object.keys(BuildingType) as BuildingTypeKey[]
export const buildingTypeEnums: BuildingType[] = buildingTypeKeys.map((key) => BuildingType[key])

const buildingModels: Record<BuildingType, string> = {
  [BuildingType.OfficeSmall]: 'models/officeSmall.glb',
  [BuildingType.OfficeMedium]: 'models/officeMedium.glb',
  [BuildingType.OfficeLarge]: 'models/officeLarge.glb',
  [BuildingType.HouseSmall]: 'models/houseSmall.glb',
  [BuildingType.HouseMedium]: 'models/houseMedium.glb',
  [BuildingType.HouseLarge]: 'models/houseLarge.glb'
} as const

export class Building {
  constructor(transform: Partial<TransformType>, type: BuildingType) {
    const tile = engine.addEntity()
    GltfContainer.create(tile, { src: buildingModels[type] })
    Transform.create(tile, transform)
  }
}
