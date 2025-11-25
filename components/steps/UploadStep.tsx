import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface UploadStepProps {
  onNext: (file: File) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ onNext }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (fileType !== 'docx') {
      setError('Por favor, envie apenas arquivos .docx');
      return;
    }

    setError(null);
    onNext(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Upload do Contrato</h2>
        <p className="text-slate-500 mt-2">Envie seu arquivo .docx para começar a reformulação</p>
      </div>

      <div
        className={`relative group cursor-pointer flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 bg-white
          ${dragActive ? 'border-indigo-500 bg-indigo-50 scale-[1.01]' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".docx"
          onChange={handleChange}
        />

        <div className="p-8 text-center space-y-4">
          <div className={`mx-auto p-4 rounded-full transition-colors ${dragActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
            <UploadCloud size={48} />
          </div>
          <div>
            <p className="text-lg font-medium text-slate-700">
              Arraste e solte seu arquivo aqui
            </p>
            <p className="text-sm text-slate-500 mt-1">
              ou clique para selecionar do computador
            </p>
          </div>
          <div className="pt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
              <FileText size={12} className="mr-1.5" />
              Apenas arquivos .docx
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm animate-shake">
          <AlertCircle size={16} className="mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
};