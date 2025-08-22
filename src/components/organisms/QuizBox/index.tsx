import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
// icons no longer needed; rendering full question text instead

import { QuizQuestion } from '@interfaces/apis/student';

export interface QuizBoxProps {
  quizQuestion: QuizQuestion;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  submitAnswer: () => void;
}

const QuizBox: FC<QuizBoxProps> = ({
  quizQuestion,
  answer,
  setAnswer,
  setDisabled,
  submitAnswer,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/[^0-9-.]/gi, '');
    setAnswer(result);

    const num = parseFloat(result);
    if (Number.isNaN(num)) setDisabled(true);
    else setDisabled(false);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      submitAnswer();
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  });


  const buildVerticalQuestion = () => {
    const { operator, numbers } = quizQuestion.question;

    // For single-operand operations
    if (operator === '√') {
      return (
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl tablet:text-3xl mb-2">√{numbers[0]}</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-lg tablet:text-xl">=</span>
            <input
              className="tablet:w-28 bg-darkBlack px-3 py-2 border border-[#A0A0A0] rounded-lg outline-none w-20 text-center text-base"
              type="text"
              inputMode="decimal"
              value={answer}
              ref={inputRef}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleEnter(e)}
            />
          </div>
        </div>
      );
    }
    if (operator === '∛') {
      return (
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl tablet:text-3xl mb-2">∛{numbers[0]}</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-lg tablet:text-xl">=</span>
            <input
              className="tablet:w-28 bg-darkBlack px-3 py-2 border border-[#A0A0A0] rounded-lg outline-none w-20 text-center text-base"
              type="text"
              inputMode="decimal"
              value={answer}
              ref={inputRef}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleEnter(e)}
            />
          </div>
        </div>
      );
    }
    if (operator === '²') {
      return (
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl tablet:text-3xl mb-2">{numbers[0]}²</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-lg tablet:text-xl">=</span>
            <input
              className="tablet:w-28 bg-darkBlack px-3 py-2 border border-[#A0A0A0] rounded-lg outline-none w-20 text-center text-base"
              type="text"
              inputMode="decimal"
              value={answer}
              ref={inputRef}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleEnter(e)}
            />
          </div>
        </div>
      );
    }
    if (operator === '³') {
      return (
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl tablet:text-3xl mb-2">{numbers[0]}³</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-lg tablet:text-xl">=</span>
            <input
              className="tablet:w-28 bg-darkBlack px-3 py-2 border border-[#A0A0A0] rounded-lg outline-none w-20 text-center text-base"
              type="text"
              inputMode="decimal"
              value={answer}
              ref={inputRef}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleEnter(e)}
            />
          </div>
        </div>
      );
    }

    // For multi-operand operations, display vertically
    const formatNumber = (n: number) =>
      Number.isInteger(n) ? `${n}` : n.toFixed(2);

    const symbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator === '+' ? '+' : operator === '-' ? '-' : operator;

    return (
      <div className="flex items-center justify-center gap-8">
        {/* Left side - Vertical numbers */}
        <div className="text-right">
          <div className="text-base tablet:text-lg mb-1">{formatNumber(numbers[0])}</div>
          {numbers.slice(1).map((num, index) => (
            <div key={index} className="text-base tablet:text-lg mb-1">{formatNumber(num)}</div>
          ))}
        </div>
        
        {/* Middle - Operator */}
        <div className="flex items-center">
          <span className="text-gold text-lg tablet:text-xl">{symbol}</span>
        </div>
        
        {/* Right side - Equals and answer */}
        <div className="flex items-center gap-3">
          <span className="text-gold text-lg tablet:text-xl">=</span>
          <input
            className="tablet:w-28 bg-darkBlack px-3 py-2 border border-[#A0A0A0] rounded-lg outline-none w-20 text-center text-base"
            type="text"
            inputMode="decimal"
            value={answer}
            ref={inputRef}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center bg-darkBlack shadow-boxWhite p-2 py-6 rounded-2xl w-full min-h-[300px]">
      <div className="w-full max-w-4xl">
        {/* Vertical question display */}
        {buildVerticalQuestion()}
      </div>
    </div>
  );
};

export default QuizBox;
