export interface Patient {
  id: string;
  name: string;
  phone: string | null;
  document: string | null;
  createdAt: string;
}

export interface PatientFormValue {
  name: string;
  phone: string | null;
  document: string | null;
}
