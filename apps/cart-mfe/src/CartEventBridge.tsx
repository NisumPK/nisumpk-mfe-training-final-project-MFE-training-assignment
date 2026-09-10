import { useEffect } from 'react';
import { nisumEvents } from '@nisum/events';
import { actions, useAppDispatch } from '@nisum/state';

/** Owns the Cart MFE's browser-event subscription and cleans it up on unmount. */
export default function CartEventBridge() {
  const dispatch = useAppDispatch();
  useEffect(
    () =>
      nisumEvents().listener('cart:item-added', (payload) => dispatch(actions.addItem(payload))),
    [dispatch],
  );
  return null;
}
