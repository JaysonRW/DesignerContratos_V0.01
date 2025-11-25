import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Circle, Loader2, AlertTriangle } from 'lucide-react';
import { ProcessLog, ContractConfig, ProcessResult } from '../../types';
import { Button } from '../ui/Button';

interface ProcessingStepProps {
  config: ContractConfig;
  onComplete: (result: ProcessResult) => void;
}

const INITIAL_LOGS: ProcessLog[] = [
  { id: '1', message: 'Enviando arquivo para o servidor...', status: 'pending' },
  { id: '2', message: 'Processando estrutura no backend...', status: 'pending' },
  { id: '3', message: 'Aplicando regras de formatação...', status: 'pending' },
  { id: '4', message: 'Gerando arquivos de saída...', status: 'pending' },
];

export const ProcessingStep: React.FC<ProcessingStepProps> = ({ config, onComplete }) => {
  const [logs, setLogs] = useState<ProcessLog[]>(INITIAL_LOGS);
  const [error, setError] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  // Define a URL da API baseada no ambiente
  // Se existir VITE_API_URL (produção), usa ela. Senão, usa localhost.
  const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const processDocument = async () => {
      try {
        updateLogStatus(0, 'running');

        if (!config.file) throw new Error("Arquivo não encontrado.");

        const formData = new FormData();
        formData.append('file', config.file);
        formData.append('primaryColor', config.primaryColor);
        if (config.logo) {
          formData.append('logo', config.logo);
        }

        updateLogStatus(0, 'success');
        updateLogStatus(1, 'running');

        // Usa a constante API_URL definida acima
        const response = await fetch(`${API_URL}/api/process`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Erro no servidor: ${response.statusText}`);
        }

        updateLogStatus(1, 'success');
        updateLogStatus(2, 'success');
        updateLogStatus(3, 'running');

        const data = await response.json();

        updateLogStatus(3, 'success');

        setTimeout(() => {
          onComplete({
            docxUrl: data.docxUrl,
            pdfUrl: data.pdfUrl
          });
        }, 1000);

      } catch (err) {
        console.error(err);
        setError("Não foi possível conectar ao servidor. Verifique se o Backend está rodando.");
        setLogs(prev => prev.map(l => ({ ...l, status: 'pending' }))); 
      }
    };

    processDocument();
  }, [config, onComplete, API_URL]);

  const updateLogStatus = (index: number, status: 'running' | 'success') => {
    setLogs(prev => {
      const newLogs = [...prev];
      if (newLogs[index]) {
        newLogs[index] = { ...newLogs[index], status };
      }
      return newLogs;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in py-8">
      <div className="text-center mb-8">
        <div className={`inline-block p-4 rounded-full mb-4 ${error ? 'bg-red-50' : 'bg-indigo-50'}`}>
          {error ? (
            <AlertTriangle className="h-10 w-10 text-red-600" />
          ) : (
             <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
          )}
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          {error