
export type DateRangeFilter = 'last-7-days' | 'this-month' | 'last-month' | 'custom';

export interface ParticipationFilters {
  type: string[];
  involvement: string[];
}

export interface InvitesFilters {
  type: string[];
  status: string[];
  role: string[];
}

export interface EditsFilters {
  changeType: string[];
}

export interface CancellationsFilters {
  action: string[];
  actor: string[];
}

export interface ActivityFilters {
  dateRange: DateRangeFilter;
  search: string;
  participation: ParticipationFilters;
  invites: InvitesFilters;
  edits: EditsFilters;
  cancellations: CancellationsFilters;
}
