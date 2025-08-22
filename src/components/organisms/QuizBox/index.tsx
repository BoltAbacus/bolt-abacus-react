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
        <div className="text-center">
          <div className="text-3xl tablet:text-4xl mb-2">√{numbers[0]}</div>
        </div>
      );
    }
    if (operator === '∛') {
      return (
        <div className="text-center">
          <div className="text-3xl tablet:text-4xl mb-2">∛{numbers[0]}</div>
        </div>
      );
    }
    if (operator === '²') {
      return (
        <div className="text-center">
          <div className="text-3xl tablet:text-4xl mb-2">{numbers[0]}²</div>
        </div>
      );
    }
    if (operator === '³') {
      return (
        <div className="text-center">
          <div className="text-3xl tablet:text-4xl mb-2">{numbers[0]}³</div>
        </div>
      );
    }

    // For multi-operand operations, display vertically
    const formatNumber = (n: number) =>
      Number.isInteger(n) ? `${n}` : n.toFixed(2);

    const symbol = operator === '*' ? '×' : operator === '/' ? '÷' : '+';

    return (
      <div className="text-center">
        <div className="text-3xl tablet:text-4xl mb-2">{formatNumber(numbers[0])}</div>
        <div className="text-2xl tablet:text-3xl mb-2">{symbol}</div>
        <div className="text-3xl tablet:text-4xl mb-2">{formatNumber(numbers[1])}</div>
        {numbers.length > 2 && (
          <>
            {numbers.slice(2).map((num, index) => (
              <div key={index} className="text-3xl tablet:text-4xl mb-2">{formatNumber(num)}</div>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center bg-darkBlack shadow-boxWhite p-2 py-6 rounded-2xl w-full min-h-[300px]">
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {/* Expression area */}
        <div className="w-full">
          <div className="flex flex-col items-center">
            {/* Vertical question display */}
            {buildVerticalQuestion()}
          </div>
        </div>

        {/* Answer area */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-gold text-2xl desktop:text-3xl">=</span>
          <input
            className="tablet:w-40 bg-darkBlack px-4 py-3 border border-[#A0A0A0] rounded-lg outline-none w-28 text-center text-xl"
            type="text"
            inputMode="decimal"
            value={answer}
            ref={inputRef}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizBox;
