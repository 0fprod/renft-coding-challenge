import type { Options as UserOptions } from '@testing-library/user-event/dist/types/options'
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

interface Options<T extends object> extends RenderOptions {
  props?: T
}

export const Render = function <P extends object>(
  component: any,
  options?: Options<P>,
  userOptions?: UserOptions
): { user: UserEvent } & RenderResult {
  const user = userEvent.setup(userOptions)
  return {
    user,
    ...render(component, {
      ...options
    })
  }
}
