import { Character } from '../../shared/interfaces'

enum FlashbackActionType {
  START = 'start',
  RETURN = 'return',
}

interface FlashbackAction {
  type: FlashbackActionType
  payload: Partial<FlashbackState>
}

interface FlashbackState {
  charToReturnTo?: Character
  charOverride?: Character
}

const { START, RETURN } = FlashbackActionType

export function flashbackReducer(
  state: FlashbackState,
  action: FlashbackAction
) {
  switch (action.type) {
    case START: {
      return {
        charOverride: state.charOverride,
        charToReturnTo: state.charToReturnTo ?? action.payload.charToReturnTo,
      }
    }

    case RETURN: {
      return {
        charOverride: null,
        charToReturnTo: null,
      }
    }
  }
}
