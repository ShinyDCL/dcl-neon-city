import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'

import { Modal } from './modal'
import { Sidebar } from './sidebar'

export const setUpUI = () => {
  const uiComponent = () => [Modal(), Sidebar()]

  ReactEcsRenderer.setUiRenderer(uiComponent)
}
