import React, { useState, useRef } from 'react';
import { Upload, ArrowRight, ArrowLeft, Palette, Image as ImageIcon, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContractConfig } from '../../types';

interface BrandingStepProps {
  initialConfig: ContractConfig;
  onBack: () => void;
  onProcess: (config: Partial<ContractConfig>) => void;
}

export const BrandingStep: React.FC<BrandingStepProps> = ({ initialConfig, onBack, onProcess }) => {
  const [primaryColor, setPrimaryColor] = useState(initialConfig.primaryColor);
  const [logo, setLogo] = useState<File | null>(initialConfig.logo);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      
      const reader = new FileReader();
      reader.onload = (endEvent) => {
        setLogoPreview(endEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    onProcess({
      primaryColor,
      logo
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
       <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Identidade Visual</h2>
        <p className="text-slate-500 mt-2">Personalize a aparência do seu documento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Controls */}
        <div className="space-y-6">
          
          {/* Color Picker */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Palette className="mr-2 text-indigo-600" size={20} />
              Cor Primária
            </h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-0 p-0 overflow-hidden"
                />
                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none border border-black/10 shadow-inner"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700">Código Hex</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={primaryColor.toUpperCase()}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 block w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 bg-slate-50 border uppercase"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Usada em títulos, tabelas e destaques importantes.
            </p>
          </div>

          {/* Logo Upload */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <ImageIcon className="mr-2 text-indigo-600" size={20} />
              Logotipo
            </h3>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:bg-slate-50 cursor-pointer transition-colors text-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleLogoChange}
                className="hidden"
              />
              {logoPreview ? (
                <div className="relative inline-block">
                    <img src={logoPreview} alt="Logo Preview" className="h-16 object-contain mx-auto" />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                        <Check size={12} />
                    </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-500">
                  <Upload size={24} className="mb-2" />
                  <span className="text-sm font-medium">Clique para enviar logo</span>
                  <span className="text-xs text-slate-400 mt-1">PNG ou JPG (Fundo transparente rec.)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Preview Simulation */}
        <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
           <h3 className="text-sm uppercase tracking-wide font-bold text-slate-500 mb-4">Pré-visualização do Estilo</h3>
           
           <div className="bg-white shadow-md flex-1 rounded-lg p-8 transform scale-100 origin-top overflow-hidden relative">
              {/* Header Simulation */}
              <div className="flex justify-between items-start border-b-2 pb-6 mb-8" style={{ borderColor: primaryColor }}>
                 {logoPreview ? (
                   <img src={logoPreview} alt="Logo" className="h-12 object-contain" />
                 ) : (
                   <div className="h-12 w-32 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400">SEU LOGO</div>
                 )}
                 <div className="text-right">
                    <div className="h-4 w-48 bg-slate-100 rounded mb-2 ml-auto"></div>
                    <div className="h-3 w-32 bg-slate-100 rounded ml-auto"></div>
                 </div>
              </div>

              {/* Title Simulation */}
              <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: primaryColor }}>CONTRATO DE LOCAÇÃO</h1>

              {/* Summary Box Simulation */}
              <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="px-4 py-2 text-white text-sm font-bold uppercase" style={{ backgroundColor: primaryColor }}>
                    Quadro Resumo
                  </div>
                  <div className="p-4 bg-slate-50 grid grid-cols-2 gap-4 text-sm">
                      <div>
                          <span className="block text-xs text-slate-500 font-bold uppercase">Locador</span>
                          <div className="h-3 w-24 bg-slate-200 rounded mt-1"></div>
                      </div>
                      <div>
                          <span className="block text-xs text-slate-500 font-bold uppercase">Valor</span>
                          <div className="h-3 w-16 bg-slate-200 rounded mt-1"></div>
                      </div>
                  </div>
              </div>

              {/* Text Simulation */}
              <div className="space-y-3">
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-11/12 bg-slate-100 rounded"></div>
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  
                  {/* Highlight Clause Simulation */}
                  <div className="my-4 p-3 rounded bg-amber-50 border-l-4 border-amber-400">
                      <div className="h-3 w-3/4 bg-amber-100 rounded"></div>
                  </div>

                  <div className="h-3 w-10/12 bg-slate-100 rounded"></div>
              </div>
           </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Button>
        <Button onClick={handleContinue}>
          Processar e Formatar
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};