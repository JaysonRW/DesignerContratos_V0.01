import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Circle, Loader2, AlertTriangle } from 'lucide-react';
import { ProcessLog, ContractConfig, ProcessResult } from '../../types';
import { Button } from '../ui/Button';

interface ProcessingStepProps {
  config: ContractConfig;
  onComplete: (result: ProcessResult) => void;
}

//teste 2

const INITIAL_LOGS: ProcessLog[] = [
  { id: '1', message: 'Enviando texto para o servidor...', status: 'pending' },
  { id: '2', message: 'Processando estrutura no backend...', status: 'pending' },
  { id: '3', message: 'Aplicando regras de formatação...', status: 'pending' },
  { id: '4', message: 'Gerando arquivos de saída...', status: 'pending' },
];

export const ProcessingStep: React.FC<ProcessingStepProps> = ({ config, onComplete }) => {
  const [logs, setLogs] = useState<ProcessLog[]>(INITIAL_LOGS);
  const [error, setError] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  // Define a URL da API.
  // Prioriza variável de ambiente VITE_API_URL se existir.
  // Caso contrário, usa a URL de produção do Render fornecida.
  const API_URL = (import.meta as any).env?.VITE_API_URL || 'https://app-py-designercontratos.onrender.com';

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const processDocument = async () => {
      try {
        updateLogStatus(0, 'running');

        if (!config.contractText || !config.contractText.trim()) throw new Error("Texto não encontrado.");

        const formData = new FormData();
        formData.append('text', config.contractText);
        formData.append('primaryColor', config.primaryColor);
        if (config.logo) {
          formData.append('logo', config.logo);
        }

        updateLogStatus(0, 'success');
        updateLogStatus(1, 'running');

        console.log(`Conectando ao backend em: ${API_URL}`);

        const candidates = ['/api/process', '/process', '/api/process_text', '/process_text'];
        let response: Response | null = null;
        for (const path of candidates) {
          try {
            response = await fetch(`${API_URL}${path}`, { method: 'POST', body: formData });
            if (response.ok) break;
          } catch {}
        }

        if (!response || !response.ok) {
          throw new Error(`Erro no servidor: ${response?.status ?? 'sem status'} ${response?.statusText ?? ''}`);
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
        setError("Não foi possível conectar ao servidor. Verifique se o Backend está ativo no Render.");
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
          {error ? 'Erro no Processamento' : 'Reformulando Contrato'}
        </h2>
        <p className="text-slate-500 mt-2">
          {error ? 'Ocorreu um erro ao comunicar com o servidor.' : 'Aguarde enquanto nossa IA organiza seu documento.'}
        </p>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center">
            <div className="mr-3 flex-shrink-0">
              {log.status === 'success' && <CheckCircle2 className="text-green-500" size={20} />}
              {log.status === 'running' && <Loader2 className="text-indigo-500 animate-spin" size={20} />}
              {log.status === 'pending' && <Circle className="text-slate-300" size={20} />}
            </div>
            <span className={`text-sm ${
              log.status === 'success' ? 'text-slate-700 font-medium' : 
              log.status === 'running' ? 'text-indigo-600 font-medium' : 
              'text-slate-400'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-6 text-center">
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      )}
    </div>
  );
};
