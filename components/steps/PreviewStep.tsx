import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, ZoomIn, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContractConfig } from '../../types';

interface PreviewStepProps {
  config: ContractConfig;
  onBack: () => void;
  onConfirm: () => void;
}

export const PreviewStep: React.FC<PreviewStepProps> = ({ config, onBack, onConfirm }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Gerar URL temporária para o logo file object para exibição
  useEffect(() => {
    if (config.logo) {
      const url = URL.createObjectURL(config.logo);
      setLogoUrl(url);
      
      // Cleanup para evitar memory leak
      return () => URL.revokeObjectURL(url);
    }
  }, [config.logo]);

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Pré-visualização do Modelo</h2>
        <p className="text-slate-500 mt-2">Verifique como a identidade visual será aplicada ao documento final.</p>
      </div>

      <div className="bg-slate-200/50 p-8 rounded-xl border border-slate-200 overflow-hidden flex flex-col items-center shadow-inner">
        
        {/* Simulação de Folha A4 */}
        <div 
          className="bg-white shadow-2xl w-full max-w-[21cm] min-h-[29.7cm] p-[2.5cm] relative transform transition-transform duration-500 hover:scale-[1.01] origin-top"
          style={{ 
            aspectRatio: '1 / 1.4142', // A4 Ratio
            fontSize: '11pt' 
          }}
        >
          {/* Header Simulation */}
          <div className="flex justify-between items-start border-b-2 pb-6 mb-8" style={{ borderColor: config.primaryColor }}>
             <div className="w-1/3">
               {logoUrl ? (
                 <img src={logoUrl} alt="Logo da Empresa" className="max-h-16 max-w-full object-contain object-left" />
               ) : (
                 <div className="h-14 w-36 bg-slate-100 rounded border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 font-medium">
                   SEU LOGO AQUI
                 </div>
               )}
             </div>
             <div className="text-right w-1/3">
                <div className="h-3 w-full bg-slate-100 rounded mb-2"></div>
                <div className="h-3 w-2/3 bg-slate-100 rounded ml-auto"></div>
             </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-xl font-bold uppercase mb-2" style={{ color: config.primaryColor }}>
              CONTRATO DE LOCAÇÃO COMERCIAL
            </h1>
            <div className="h-px w-24 bg-slate-300 mx-auto"></div>
          </div>

          {/* Quadro Resumo (Feature Core) */}
          <div className="mb-8 border border-slate-300 rounded-lg overflow-hidden">
            <div className="px-4 py-2 text-white font-bold text-sm uppercase flex items-center" style={{ backgroundColor: config.primaryColor }}>
              <FileText size={14} className="mr-2" />
              Quadro Resumo
            </div>
            <div className="bg-slate-50 p-4 grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Locador</span>
                  <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Locatário</span>
                  <div className="h-4 w-4/5 bg-slate-200 rounded"></div>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Objeto</span>
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Valor Mensal</span>
                  <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                </div>
            </div>
          </div>

          {/* Conteúdo Simulado */}
          <div className="space-y-4 text-justify text-slate-600 leading-relaxed">
            <div>
              <h2 className="text-sm font-bold uppercase mb-2 border-l-4 pl-3" style={{ borderLeftColor: config.primaryColor, color: '#334155' }}>
                1. Do Objeto
              </h2>
              <div className="space-y-2">
                <p className="bg-slate-50 text-transparent rounded select-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="bg-slate-50 text-transparent rounded select-none w-11/12">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase mb-2 border-l-4 pl-3" style={{ borderLeftColor: config.primaryColor, color: '#334155' }}>
                2. Do Prazo
              </h2>
              <div className="space-y-2">
                <p className="bg-slate-50 text-transparent rounded select-none w-full">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>

            {/* Destaque Importante */}
            <div className="my-6 p-4 rounded-md border-l-4 bg-amber-50/50" style={{ borderLeftColor: '#F59E0B' }}>
               <h3 className="text-xs font-bold text-amber-600 uppercase mb-1 flex items-center">
                 <ZoomIn size={12} className="mr-1" /> Cláusula de Atenção
               </h3>
               <p className="bg-amber-100/50 text-transparent rounded select-none w-11/12 h-4"></p>
               <p className="bg-amber-100/50 text-transparent rounded select-none w-3/4 h-4 mt-1"></p>
            </div>
          </div>

          {/* Footer Page Number */}
          <div className="absolute bottom-10 right-10 text-xs text-slate-400 font-mono">
            Página 1 de 5
          </div>
        </div>

      </div>

      <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto px-4">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Voltar para Edição
        </Button>
        <div className="text-slate-400 text-sm italic">
          * O texto acima é ilustrativo. Seu conteúdo original será mantido.
        </div>
        <Button onClick={onConfirm} className="px-8">
          Confirmar e Processar
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};