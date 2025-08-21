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

  const buildQuestionText = (): string => {
    const { operator, numbers } = quizQuestion.question;

    if (operator === '√') return `Square root of ${numbers[0]}`;
    if (operator === '∛') return `Cube root of ${numbers[0]}`;
    if (operator === '²') return `Square of ${numbers[0]}`;
    if (operator === '³') return `Cube of ${numbers[0]}`;

    const formatNumber = (n: number) =>
      Number.isInteger(n) ? `${n}` : n.toFixed(2);

    const symbol = operator === '*' ? '×' : operator === '/' ? '÷' : '+';

    // join all operands; covers addition with negatives and multi-row sums
    return numbers.map(formatNumber).join(` ${symbol} `);
  };

  return (
    <div className="flex justify-center items-center bg-darkBlack shadow-boxWhite p-2 py-6 rounded-2xl w-full min-h-[300px]">
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {/* Expression area */}
        <div className="w-full">
          <div className="flex flex-col items-center">
            {/* For long expressions, wrap nicely and center */}
            <div className="text-center break-words leading-relaxed">
              <span className="text-2xl tablet:text-3xl font-semibold">{buildQuestionText()}</span>
            </div>
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
