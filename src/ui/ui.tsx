import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

import { Modal } from './modal'
import { Sidebar } from './sidebar'

export const setUpUI = () => {
  ReactEcsRenderer.setUiRenderer(() => (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%'
      }}
    >
      <Modal />
      <Sidebar />
    </UiEntity>
  ))
}
