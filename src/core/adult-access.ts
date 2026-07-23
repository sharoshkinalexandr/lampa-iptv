import type { LampaLike, StoredState } from '../types';
import { askText, notify } from '../lampa/input';
import { createSalt, hashPin } from './security';

const SESSION_MS = 15 * 60 * 1000;

export function isAdultUnlocked(state: StoredState): boolean {
  return (
    state.adult.enabled === true &&
    Boolean(state.adult.pinHash) &&
    (state.adult.unlockedUntil ?? 0) > Date.now()
  );
}

function validPin(pin: string): boolean {
  return /^\d{4,8}$/.test(pin);
}

export async function configureAdultPin(
  Lampa: LampaLike,
  state: StoredState,
  save: () => void
): Promise<boolean> {
  const pin = await askText(Lampa, 'Придумайте PIN (4–8 цифр)', '', {
    password: true,
    numeric: true
  });
  if (!validPin(pin)) {
    notify(Lampa, 'PIN должен содержать от 4 до 8 цифр.');
    return false;
  }
  const confirmation = await askText(Lampa, 'Повторите PIN', '', {
    password: true,
    numeric: true
  });
  if (pin !== confirmation) {
    notify(Lampa, 'PIN-коды не совпадают.');
    return false;
  }
  const salt = createSalt();
  state.adult.pinSalt = salt;
  state.adult.pinHash = await hashPin(pin, salt);
  state.adult.enabled = true;
  state.adult.unlockedUntil = Date.now() + SESSION_MS;
  save();
  notify(Lampa, 'Раздел 18+ включён и защищён PIN-кодом.');
  return true;
}

export async function unlockAdult(
  Lampa: LampaLike,
  state: StoredState,
  save: () => void
): Promise<boolean> {
  if (!state.adult.pinHash || !state.adult.pinSalt) {
    return configureAdultPin(Lampa, state, save);
  }
  if (isAdultUnlocked(state)) return true;
  const pin = await askText(Lampa, 'Введите PIN раздела 18+', '', {
    password: true,
    numeric: true
  });
  if (!pin) return false;
  const digest = await hashPin(pin, state.adult.pinSalt);
  if (digest !== state.adult.pinHash) {
    notify(Lampa, 'Неверный PIN-код.');
    return false;
  }
  state.adult.unlockedUntil = Date.now() + SESSION_MS;
  save();
  return true;
}

export function lockAdult(state: StoredState, save: () => void): void {
  state.adult.unlockedUntil = 0;
  save();
}
