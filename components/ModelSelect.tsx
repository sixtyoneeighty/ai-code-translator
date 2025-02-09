import { AIModel } from '@/types/types';
import { FC } from 'react';

// Using constant for model name
const GEMINI_MODEL = 'gemini-2.0-pro-exp' as const;

interface Props {
  model: AIModel;
  onChange: (model: AIModel) => void;
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as AIModel);
  };

  return (
    <select
      className="h-[40px] w-[140px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={model}
      onChange={handleChange}
    >
      <option value={GEMINI_MODEL}>Gemini 2.0 Pro</option>
    </select>
  );
};
