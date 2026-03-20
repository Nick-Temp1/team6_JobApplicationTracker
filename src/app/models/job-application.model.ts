export type ApplicationStatus = 'PENDING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export interface JobApplication {
  id: number;
  companyName: string;
  positionTitle: string;
  applicationStatus: ApplicationStatus;
  applicationNotes?: string;
  dateOfApplication: string;
  interviewDate?: string;
}
