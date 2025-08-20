import {
  QuestionResult,
  QuizAnswer,
  QuizQuestion,
} from '@interfaces/apis/student';

function generateRandomNumber(min: number, max: number): number {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;

  while (num === 0) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return num;
}

function generateRandomDecimal(min: number, max: number, decimalPlaces: number = 2): number {
  const num = Math.random() * (max - min) + min;
  return Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}

function generatePerfectSquare(min: number, max: number): number {
  const sqrtMin = Math.ceil(Math.sqrt(min));
  const sqrtMax = Math.floor(Math.sqrt(max));
  const randomSqrt = generateRandomNumber(sqrtMin, sqrtMax);
  return randomSqrt * randomSqrt;
}

function generatePerfectCube(min: number, max: number): number {
  const cubeRootMin = Math.ceil(Math.cbrt(min));
  const cubeRootMax = Math.floor(Math.cbrt(max));
  const randomCubeRoot = generateRandomNumber(cubeRootMin, cubeRootMax);
  return randomCubeRoot * randomCubeRoot * randomCubeRoot;
}

function generateNumberForSquare(min: number, max: number): number {
  // Generate a number that when squared will be within the range
  const maxSqrt = Math.floor(Math.sqrt(max));
  const minSqrt = Math.ceil(Math.sqrt(min));
  return generateRandomNumber(minSqrt, maxSqrt);
}

function generateNumberForCube(min: number, max: number): number {
  // Generate a number that when cubed will be within the range
  const maxCubeRoot = Math.floor(Math.cbrt(max));
  const minCubeRoot = Math.ceil(Math.cbrt(min));
  return generateRandomNumber(minCubeRoot, maxCubeRoot);
}

export const generatePracticeQuestions = (
  operation: string,
  numberOfDigitsLeft: number,
  numberOfDigitsRight: number,
  numberOfQuestions: number,
  numberOfRows: number,
  zigZag: boolean,
  includeSubtraction: boolean,
  persistNumberOfDigits: boolean,
  includeDecimals: boolean
): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < numberOfQuestions; i += 1) {
    let numbers: number[] = [];

    if (operation === 'addition') {
      for (let j = 0; j < numberOfRows; j += 1) {
        const currentMin = zigZag ? 1 : 10 ** (numberOfDigitsLeft - 1);
        const currentMax = zigZag
          ? 10 ** generateRandomNumber(1, numberOfDigitsLeft) - 1
          : 10 ** numberOfDigitsLeft - 1;
        numbers.push(generateRandomNumber(currentMin, currentMax));
      }

      if (includeSubtraction) {
        for (let j = 0; j < numbers.length; j += 1) {
          if (Math.random() < 0.5) {
            numbers[j] *= -1;
          }
        }
      }

      if (persistNumberOfDigits) {
        let sum = numbers.reduce((a, b) => a + b, 0);
        while (Math.abs(sum).toString().length !== numberOfDigitsLeft) {
          numbers = [];
          for (let j = 0; j < numberOfRows; j += 1) {
            const currentMin = zigZag ? 1 : 10 ** (numberOfDigitsLeft - 1);
            const currentMax = zigZag
              ? 10 ** generateRandomNumber(1, numberOfDigitsLeft) - 1
              : 10 ** numberOfDigitsRight - 1;
            numbers.push(generateRandomNumber(currentMin, currentMax));
          }
          sum = numbers.reduce((a, b) => a + b, 0);
        }
      }
    } else if (operation === 'multiplication') {
      const leftMin = 10 ** (numberOfDigitsLeft - 1);
      const leftMax = 10 ** numberOfDigitsLeft - 1;
      const rightMin = 10 ** (numberOfDigitsRight - 1);
      const rightMax = 10 ** numberOfDigitsRight - 1;

      numbers.push(generateRandomNumber(leftMin, leftMax));
      numbers.push(generateRandomNumber(rightMin, rightMax));
    } else if (operation === 'division') {
      const leftMin = 10 ** (numberOfDigitsLeft - 1);
      const leftMax = 10 ** numberOfDigitsLeft - 1;
      const rightMin = 10 ** (numberOfDigitsRight - 1);
      const rightMax = 10 ** numberOfDigitsRight - 1;

      let num1 = generateRandomNumber(leftMin, leftMax);
      let num2 = generateRandomNumber(rightMin, rightMax);

      if (num1 < num2) {
        [num1, num2] = [num2, num1];
      }

      if (!includeDecimals) {
        while (num1 % num2 !== 0) {
          num1 = generateRandomNumber(leftMin, leftMax);
          num2 = generateRandomNumber(rightMin, rightMax);

          if (num1 < num2) {
            [num1, num2] = [num2, num1];
          }
        }
      }

      numbers = [num1, num2];
    } else if (operation === 'square') {
      const min = 10 ** (numberOfDigitsLeft - 1);
      const max = 10 ** numberOfDigitsLeft - 1;
      const baseNumber = generateNumberForSquare(min, max);
      numbers = [baseNumber];
    } else if (operation === 'cube') {
      const min = 10 ** (numberOfDigitsLeft - 1);
      const max = 10 ** numberOfDigitsLeft - 1;
      const baseNumber = generateNumberForCube(min, max);
      numbers = [baseNumber];
    } else if (operation === 'square_root') {
      // Generate a perfect square for square root questions
      const min = 10 ** (numberOfDigitsLeft - 1);
      const max = 10 ** numberOfDigitsLeft - 1;
      const perfectSquare = generatePerfectSquare(min, max);
      numbers = [perfectSquare];
    } else if (operation === 'cube_root') {
      // Generate a perfect cube for cube root questions
      const min = 10 ** (numberOfDigitsLeft - 1);
      const max = 10 ** numberOfDigitsLeft - 1;
      const perfectCube = generatePerfectCube(min, max);
      numbers = [perfectCube];
    } else if (operation === 'decimal_addition') {
      // Generate decimal numbers for addition
      for (let j = 0; j < numberOfRows; j += 1) {
        const currentMin = zigZag ? 1 : 10 ** (numberOfDigitsLeft - 1);
        const currentMax = zigZag
          ? 10 ** generateRandomNumber(1, numberOfDigitsLeft) - 1
          : 10 ** numberOfDigitsLeft - 1;
        const decimalNumber = generateRandomDecimal(currentMin, currentMax, 2);
        numbers.push(decimalNumber);
      }

      if (includeSubtraction) {
        for (let j = 0; j < numbers.length; j += 1) {
          if (Math.random() < 0.5) {
            numbers[j] *= -1;
          }
        }
      }
    } else if (operation === 'decimal_multiplication') {
      // Generate decimal numbers for multiplication
      const leftMin = 10 ** (numberOfDigitsLeft - 1);
      const leftMax = 10 ** numberOfDigitsLeft - 1;
      const rightMin = 10 ** (numberOfDigitsRight - 1);
      const rightMax = 10 ** numberOfDigitsRight - 1;

      const decimal1 = generateRandomDecimal(leftMin, leftMax, 1);
      const decimal2 = generateRandomDecimal(rightMin, rightMax, 1);
      numbers.push(decimal1, decimal2);
    }

    const question: QuizQuestion = {
      questionId: i + 1,
      question: {
        operator:
          operation === 'addition'
            ? '+'
            : operation === 'multiplication'
              ? '*'
              : operation === 'division'
                ? '/'
                : operation === 'square_root'
                  ? '√'
                  : operation === 'cube_root'
                    ? '∛'
                    : operation === 'square'
                      ? '²'
                    : operation === 'cube'
                      ? '³'
                    : operation === 'decimal_addition'
                      ? '+'
                      : operation === 'decimal_multiplication'
                        ? '*'
                        : '+',
        numbers,
      },
    };
    questions.push(question);
  }

  return questions;
};

export const generatePracticeAnswers = (
  numberOfQuestions: number
): QuizAnswer[] => {
  const answers: QuizAnswer[] = [];

  for (let i = 0; i < numberOfQuestions; i += 1) {
    answers.push({
      questionId: i + 1,
      answer: null,
    });
  }
  return answers;
};

export const generateResult = (
  questions: QuizQuestion[],
  answers: QuizAnswer[]
) => {
  const result: QuestionResult[] = [];

  for (let i = 0; i < questions.length; i += 1) {
    const { questionId } = questions[i];
    const { question } = questions[i];

    const answer = answers.find((a) => a.questionId === questionId)!;

    let questionString = '';
    let currentAnswer = question.numbers[0];

    for (let j = 0; j < question.numbers.length; j += 1) {
      questionString += question.numbers[j];
      if (j < question.numbers.length - 1) {
        questionString += ` ${question.operator} `;
      }
    }

    for (let j = 1; j < question.numbers.length; j += 1) {
      if (question.operator === '+') {
        currentAnswer += question.numbers[j];
      } else if (question.operator === '*') {
        currentAnswer *= question.numbers[j];
      } else if (question.operator === '/') {
        currentAnswer /= question.numbers[j];
      }
    }

    // Handle single-number operations (square root, cube root, square, cube)
    if (question.operator === '√') {
      currentAnswer = Math.sqrt(question.numbers[0]);
    } else if (question.operator === '∛') {
      currentAnswer = Math.cbrt(question.numbers[0]);
    } else if (question.operator === '²') {
      currentAnswer = question.numbers[0] * question.numbers[0];
    } else if (question.operator === '³') {
      currentAnswer = question.numbers[0] * question.numbers[0] * question.numbers[0];
    }

    result.push({
      question: questionString,
      answer: answer.answer,
      verdict: currentAnswer.toFixed(2) === answer.answer?.toFixed(2),
    });
  }

  return { result, totalScore: result.filter((r) => r.verdict).length };
};

export const generateTimedResult = (
  questions: QuizQuestion[],
  answers: QuizAnswer[]
) => {
  const result: QuestionResult[] = [];

  for (let i = 0; i < answers.length; i += 1) {
    const { questionId } = answers[i];
    const answer = answers[i];

    const question = questions.find((q) => q.questionId === questionId)!;

    let questionString = '';
    let currentAnswer = question.question.numbers[0];

    for (let j = 0; j < question.question.numbers.length; j += 1) {
      questionString += question.question.numbers[j];
      if (j < question.question.numbers.length - 1) {
        questionString += ` ${question.question.operator} `;
      }
    }

    for (let j = 1; j < question.question.numbers.length; j += 1) {
      if (question.question.operator === '+') {
        currentAnswer += question.question.numbers[j];
      } else if (question.question.operator === '*') {
        currentAnswer *= question.question.numbers[j];
      } else if (question.question.operator === '/') {
        currentAnswer /= question.question.numbers[j];
      }
    }

    // Handle single-number operations (square root, cube root, square, cube)
    if (question.question.operator === '√') {
      currentAnswer = Math.sqrt(question.question.numbers[0]);
    } else if (question.question.operator === '∛') {
      currentAnswer = Math.cbrt(question.question.numbers[0]);
    } else if (question.question.operator === '²') {
      currentAnswer = question.question.numbers[0] * question.question.numbers[0];
    } else if (question.question.operator === '³') {
      currentAnswer = question.question.numbers[0] * question.question.numbers[0] * question.question.numbers[0];
    }

    result.push({
      question: questionString,
      answer: answer.answer,
      verdict: currentAnswer.toFixed(2) === answer.answer?.toFixed(2),
    });
  }

  return { result, totalScore: result.filter((r) => r.verdict).length };
};
