import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { BiSolidTrash } from 'react-icons/bi';

import { QuizQuestion } from '@interfaces/apis/admin';
import { ADMIN_EDIT_QUESTION } from '@constants/routes';

export interface QuizQuestionsTableProps {
  questions: Array<QuizQuestion>;
  onDeleteQuestion?: (questionId: number) => void;
}

const QuizQuestionsTable: FC<QuizQuestionsTableProps> = ({ questions, onDeleteQuestion }) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const handleDeleteClick = (questionId: number) => {
    setDeleteConfirmId(questionId);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId && onDeleteQuestion) {
      onDeleteQuestion(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const getOperatorDisplayText = (operator: string): string => {
    switch (operator) {
      case '+':
        return 'Addition';
      case '*':
        return 'Multiplication';
      case '/':
        return 'Division';
      case '√':
        return 'Square Root';
      case '∛':
        return 'Cube Root';
      case '²':
        return 'Square';
      case '³':
        return 'Cube';
      default:
        return operator;
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <p className="text-gold font-bold text-lg">Quiz Questions </p>
      <div className="py-2 px-3 bg-darkBlack rounded-lg border border-gold flex flex-col gap-2 tablet:px-10 desktop:px-14">
        <div className="grid grid-cols-4 gap-2 text-sm font-bold border-b border-[#636363] tablet:text-[18px]">
          <div className="text-center p-2 tablet:p-6">Numbers</div>
          <div className="text-center p-2 tablet:p-6">Operator</div>
          <div className="text-center p-2 tablet:p-6">Correct Answer</div>
          <div className="text-center p-2 tablet:p-6">Actions</div>
        </div>
        {questions.map((question, index) => {
          const isLast = questions.length === index + 1;
          return (
            <div
              key={index}
              className={`grid grid-cols-4 gap-2 text-xs border-b border-[#636363] ${
                isLast && 'mb-4'
              } tablet:text-md`}
            >
              <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3">
                <p>
                  {question.question.numbers.map((number, i) => {
                    return (
                      <span key={i}>
                        {i + 1 === question.question.numbers.length ? (
                          <span>{number}</span>
                        ) : (
                          <span>{`${number},  `}</span>
                        )}
                      </span>
                    );
                  })}
                </p>
              </div>
              <div className="flex justify-center items-center p-3 break-all text-center tablet:p-4 desktop:p-3">
                {getOperatorDisplayText(question.question.operator)}
              </div>
              <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3">
                {question.correctAnswer}
              </div>
              <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3 gap-2">
                <button
                  type="button"
                  className="px-3 py-2 font-semibold text-center rounded-lg text-md duration-150 ease-in-out bg-gold/80 text-black hover:bg-gold flex items-center justify-center"
                >
                  <Link
                    to={`${ADMIN_EDIT_QUESTION}/${question.questionId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BiSolidEdit />
                  </Link>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(question.questionId)}
                  className="px-3 py-2 font-semibold text-center rounded-lg text-md duration-150 ease-in-out bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                >
                  <BiSolidTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-darkBlack border border-gold rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-gold font-bold text-lg mb-4">Delete Question</h3>
            <p className="text-white mb-6">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionsTable;
