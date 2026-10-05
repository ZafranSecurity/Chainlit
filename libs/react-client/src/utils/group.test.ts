import { IThread } from 'src/types';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { groupByDate } from './group';

describe('groupByDate', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('labels month groups in English regardless of the browser locale', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 5, 12));
    vi.stubGlobal('navigator', { language: 'he-IL' });

    const thread = {
      id: 't1',
      createdAt: new Date(2025, 9, 14, 12).toISOString()
    } as IThread;

    expect(Object.keys(groupByDate([thread]))).toEqual(['October 2025']);
  });
});
