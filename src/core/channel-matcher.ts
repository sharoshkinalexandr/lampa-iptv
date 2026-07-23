import { CHANNELS } from '../config/channels';
import type {
  ConfiguredChannel,
  ImportReport,
  MatchedPlaylistEntry,
  MatchReason,
  PlaylistEntry
} from '../types';
import { normalizeExact, normalizeName } from './normalize';

interface Candidate {
  channel: ConfiguredChannel;
  reason: MatchReason;
}

function uniqueCandidate(candidates: Candidate[]): Candidate | undefined {
  const ids = new Set(candidates.map((candidate) => candidate.channel.id));
  return ids.size === 1 ? candidates[0] : undefined;
}

function exactMatches(
  entryValue: string | undefined,
  values: (channel: ConfiguredChannel) => string[]
): ConfiguredChannel[] {
  const query = normalizeExact(entryValue);
  if (!query) return [];
  return CHANNELS.filter((channel) =>
    values(channel).some((value) => normalizeExact(value) === query)
  );
}

export function matchPlaylistEntry(
  entry: PlaylistEntry,
  manualMappings: Record<string, string> = {}
): MatchedPlaylistEntry | undefined {
  const manualKey = normalizeName(entry.tvgId || entry.tvgName || entry.name);
  const manualId = manualMappings[manualKey];
  if (manualId) {
    const channel = CHANNELS.find((candidate) => candidate.id === manualId);
    if (channel) return { channelId: channel.id, entry, reason: 'manual' };
  }

  const stages: Array<{ reason: MatchReason; matches: ConfiguredChannel[] }> = [
    {
      reason: 'tvg-id',
      matches: exactMatches(entry.tvgId, (channel) => [channel.id, channel.epgId ?? ''])
    },
    {
      reason: 'tvg-name',
      matches: exactMatches(entry.tvgName, (channel) => [channel.name])
    },
    {
      reason: 'name',
      matches: exactMatches(entry.name, (channel) => [channel.name])
    },
    {
      reason: 'alias',
      matches: exactMatches(entry.tvgName || entry.name, (channel) => channel.epgAliases)
    }
  ];

  for (const stage of stages) {
    const candidate = uniqueCandidate(
      stage.matches.map((channel) => ({ channel, reason: stage.reason }))
    );
    if (candidate) {
      return { channelId: candidate.channel.id, entry, reason: candidate.reason };
    }
  }

  const names = [entry.tvgName, entry.name].filter((value): value is string => Boolean(value));
  const normalizedMatches = CHANNELS.filter((channel) => {
    const known = [channel.name, ...channel.epgAliases].map(normalizeName);
    return names.some((name) => known.includes(normalizeName(name)));
  });
  const normalized = uniqueCandidate(
    normalizedMatches.map((channel) => ({ channel, reason: 'normalized-name' }))
  );
  return normalized
    ? { channelId: normalized.channel.id, entry, reason: normalized.reason }
    : undefined;
}

export function matchPlaylist(
  entries: PlaylistEntry[],
  sourceName: string,
  duplicateUrls: number,
  warnings: string[],
  manualMappings: Record<string, string> = {}
): { matched: MatchedPlaylistEntry[]; report: ImportReport } {
  const matched: MatchedPlaylistEntry[] = [];
  const ignored: PlaylistEntry[] = [];
  for (const entry of entries) {
    const result = matchPlaylistEntry(entry, manualMappings);
    if (result) matched.push(result);
    else ignored.push(entry);
  }
  return {
    matched,
    report: {
      importedAt: new Date().toISOString(),
      sourceName,
      parsed: entries.length,
      matched: matched.length,
      ignored: ignored.length,
      duplicateUrls,
      warnings,
      matchedEntries: matched.map((item) => ({
        channelId: item.channelId,
        sourceName: item.entry.name,
        reason: item.reason
      })),
      ignoredEntries: ignored.slice(0, 500).map((entry) => ({
        name: entry.name,
        tvgId: entry.tvgId,
        line: entry.line
      }))
    }
  };
}
