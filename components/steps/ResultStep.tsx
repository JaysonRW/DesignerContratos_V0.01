import React from 'react';
import { Download, FileText, CheckCircle, RefreshCcw, Eye } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResultStepProps {
  onReset: () => void;
  docxUrl: string;
  pdfUrl: string;
}

export const ResultStep: React.FC<ResultStepProps> = ({ onReset, docxUrl, pdfUrl }) => {
  
  const handleDownload = (url: string, filename: string) => {
    // Cria um link temporário para forçar o download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = "_blank"; // Abre em nova aba se o download não for automático
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in text-center">
      <div className="mb-8">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Processamento Concluído!</h2>
        <p className="text-lg text-slate-600 mt-3 max-w-lg mx-auto">
          Seu contrato foi processado pelo servidor com sucesso.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 mx-auto mb-4">
            <FileText size={24} />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Versão Editável</h3>
          <p className="text-sm text-slate-500 mb-6">Documento Word (.docx) formatado</p>
          <Button className="w-full" onClick={() => handleDownload(docxUrl, 'contrato_formatado.docx')}>
            <Download size={16} className="mr-2" />
            Baixar .DOCX
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 text-red-600 mx-auto mb-4">
            <Eye size={24} />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Visualização</h3>
          <p className="text-sm text-slate-500 mb-6">Arquivo PDF para leitura rápida</p>
          <Button variant="secondary" className="w-full" onClick={() => handleDownload(pdfUrl, 'contrato_visualizacao.pdf')}>
            <Download size={16} className="mr-2" />
            Baixar .PDF
          </Button>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-8">
        <Button variant="outline" onClick={onReset}>
          <RefreshCcw size={16} className="mr-2" />
          Processar Novo Contrato
        </Button>
      </div>
    </div>
  );
};