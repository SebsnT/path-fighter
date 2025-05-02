import { describe, expect, it, vi } from 'vitest';

// Create spies to track
const clearEncounter = vi.fn();
const clearFilters = vi.fn();
const resetDifficulty = vi.fn();
const resetPartyLevel = vi.fn();
const resetPartySize = vi.fn();
const resetThresholds = vi.fn();
const resetManualThresholds = vi.fn();

// Mock the composables with shared spies
vi.mock('~/composables/difficulty', () => ({
  useDifficulty: vi.fn(() => ({
    resetDifficulty,
  })),
}));

vi.mock('~/composables/encounter', () => ({
  useEncounter: vi.fn(() => ({
    clearEncounter,
  })),
}));

vi.mock('~/composables/filter', () => ({
  useFilters: vi.fn(() => ({
    clearFilters,
  })),
}));

vi.mock('~/composables/party', () => ({
  useParty: vi.fn(() => ({
    resetPartyLevel,
    resetPartySize,
  })),
}));

vi.mock('~/composables/thresholds', () => ({
  useThresholds: vi.fn(() => ({
    resetThresholds,
    resetManualThresholds,
  })),
}));

// Import after mocking
import { reset } from './reset';

describe('reset', () => {
  it('calls all reset/clear functions from the composables', () => {
    reset();

    expect(clearEncounter).toHaveBeenCalled();
    expect(clearFilters).toHaveBeenCalled();
    expect(resetDifficulty).toHaveBeenCalled();
    expect(resetPartyLevel).toHaveBeenCalled();
    expect(resetPartySize).toHaveBeenCalled();
    expect(resetThresholds).toHaveBeenCalled();
    expect(resetManualThresholds).toHaveBeenCalled();
  });
});
