export interface Procedure {
  id: string;
  description: string;
  durationMin: number;
  createdAt: string;
}

export interface ProcedureFormValue {
  description: string;
  durationMin: number;
}
