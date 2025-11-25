export enum AppStep {
  UPLOAD = 'UPLOAD',
  BRANDING = 'BRANDING',
  PREVIEW = 'PREVIEW',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
}

export interface ContractConfig {
  file: File | null;
  primaryColor: string;
  logo: File | null;
}

export interface ProcessLog {
  id: string;
  message: string;
  status: 'pending' | 'success' | 'running';
}

export interface ProcessResult {
  docxUrl: string;
  pdfUrl: string;
}