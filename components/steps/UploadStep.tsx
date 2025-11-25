import React, { useState } from 'react';
import { FileText, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface UploadStepProps {
  onNext: (text: string) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ onNext }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const charCount = text.length;
  const lineCount = text.split(/\n/).length;

  const useExample = () => {
    const example = [
      'CONTRATO DE PRESTAÇÃO DE SERVIÇOS',
      '',
      'CONTRATANTE: Empresa XYZ Ltda.',
      'CONTRATADA: Fulano de Tal ME',
      'VALOR: R$ 5.000,00',
      '',
      'CLÁUSULA 1 – OBJETO',
      'Prestação de serviços de consultoria em tecnologia.',
      '',
      'CLÁUSULA 2 – PRAZO',
      '12 meses a partir da assinatura.',
    ].join('\n');
    setText(example);
    setError(null);
  };

  const handleContinue = () => {
    if (!text.trim()) {
      setError('Cole o texto completo da proposta/contrato para continuar.');
      return;
    }
    setError(null);
    onNext(text.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Cole seu contrato e deixe ele profissional</h2>
        <p className="text-slate-500 mt-2">Cole o texto e escolha as cores – geramos um documento formatado.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
            <FileText className="mr-2 text-indigo-600" size={20} />
            Texto do Contrato
          </h3>
          <button className="text-indigo-600 text-sm font-medium hover:underline" onClick={useExample}>
            Usar exemplo
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Cole aqui o texto completo do seu contrato... Dicas:\n• Títulos em MAIÚSCULAS ficam coloridos\n• Use 'CAMPO: Valor' para criar tabelas automáticas\n• Deixe linhas em branco para separar seções"}
          className="w-full min-h-[240px] rounded-lg border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 bg-slate-50"
        />

        <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
          <span>{charCount} caracteres • {lineCount} linhas</span>
          <span className="inline-flex items-center text-green-600">
            <CheckCircle size={14} className="mr-1" />
            Pronto para processar
          </span>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={handleContinue}>
          <Sparkles size={16} className="mr-2" />
          Continuar
        </Button>
      </div>
    </div>
  );
};
