import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { UploadStep } from './components/steps/UploadStep';
import { BrandingStep } from './components/steps/BrandingStep';
import { PreviewStep } from './components/steps/PreviewStep';
import { ProcessingStep } from './components/steps/ProcessingStep';
import { ResultStep } from './components/steps/ResultStep';
import { AppStep, ContractConfig, ProcessResult } from './types';

const INITIAL_CONFIG: ContractConfig = {
  file: null,
  primaryColor: '#4F46E5', // Indigo-600 default
  logo: null
};

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [config, setConfig] = useState<ContractConfig>(INITIAL_CONFIG);
  const [results, setResults] = useState<ProcessResult | null>(null);

  const handleFileSelect = (file: File) => {
    setConfig(prev => ({ ...prev, file }));
    setStep(AppStep.BRANDING);
  };

  const handleBrandingComplete = (branding: Partial<ContractConfig>) => {
    setConfig(prev => ({ ...prev, ...branding }));
    // Agora vai para o Preview em vez de processar direto
    setStep(AppStep.PREVIEW);
  };

  const handlePreviewConfirm = () => {
    setStep(AppStep.PROCESSING);
  };

  const handleProcessingComplete = (resultData: ProcessResult) => {
    setResults(resultData);
    setStep(AppStep.RESULT);
  };

  const handleReset = () => {
    setConfig(INITIAL_CONFIG);
    setResults(null);
    setStep(AppStep.UPLOAD);
  };

  return (
    <Layout>
      {step === AppStep.UPLOAD && (
        <UploadStep onNext={handleFileSelect} />
      )}
      
      {step === AppStep.BRANDING && (
        <BrandingStep 
          initialConfig={config}
          onBack={() => setStep(AppStep.UPLOAD)}
          onProcess={handleBrandingComplete}
        />
      )}

      {step === AppStep.PREVIEW && (
        <PreviewStep
          config={config}
          onBack={() => setStep(AppStep.BRANDING)}
          onConfirm={handlePreviewConfirm}
        />
      )}

      {step === AppStep.PROCESSING && (
        <ProcessingStep 
          config={config} 
          onComplete={handleProcessingComplete} 
        />
      )}

      {step === AppStep.RESULT && results && (
        <ResultStep 
          docxUrl={results.docxUrl}
          pdfUrl={results.pdfUrl}
          onReset={handleReset} 
        />
      )}
    </Layout>
  );
}

export default App;