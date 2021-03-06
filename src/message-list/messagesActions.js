import { getMessages } from '../api';
import {
  SWITCH_NARROW,
  MESSAGE_FETCH_START,
  MESSAGE_FETCH_SUCCESS,
} from '../constants';

export const switchNarrow = (narrow) => ({
  type: SWITCH_NARROW,
  narrow,
});

export const fetchMessages = (
  auth,
  anchor: number,
  numBefore: number,
  numAfter: number,
  narrow,
) =>
  async (dispatch) => {
    dispatch({ type: MESSAGE_FETCH_START, narrow });

    const messages = await getMessages(auth, anchor, numBefore, numAfter, narrow);

    dispatch({
      type: MESSAGE_FETCH_SUCCESS,
      auth,
      messages,
      anchor,
      narrow,
      startReached: numAfter === 0 && numBefore > messages.length,
    });
  };
