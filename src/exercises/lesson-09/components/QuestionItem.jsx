import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

export function QuestionItem({ question }) {
  const [workingText, setWorkingText] = useState(question.question);
  const [optionDrafts, setOptionDrafts] = useState(question.options);
  const [newOptionText, setNewOptionText] = useState('');
  const { state, dispatch } = useContext(SurveyContext);
  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleEdit = () => {
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: isEditing ? null : question.id,
      },
    });

    setWorkingText(question.question);
    setOptionDrafts(question.options);
    setNewOptionText('');
  };

  const handleSave = () => {
    const trimmedText = workingText.trim();

    if (!trimmedText) {
      return;
    }

    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: trimmedText,
      },
    });

    setWorkingText(trimmedText);

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: null,
      },
    });
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    dispatch({
      type: 'DELETE_QUESTION',
      payload: {
        id: question.id,
      },
    });
  };

  const handleCancel = () => {
    setWorkingText(question.question);
    setOptionDrafts(question.options);
    setNewOptionText('');
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: null,
      },
    });
  };

  const handleOptionDraftChange = (index, value) => {
    setOptionDrafts((currentDrafts) =>
      currentDrafts.map((draft, draftIndex) =>
        draftIndex === index ? value : draft
      )
    );
  };

  const handleOptionSave = (index) => {
    const trimmedText = optionDrafts[index]?.trim();

    if (!trimmedText) {
      return;
    }

    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: trimmedText,
      },
    });

    setOptionDrafts((currentDrafts) =>
      currentDrafts.map((draft, draftIndex) =>
        draftIndex === index ? trimmedText : draft
      )
    );
  };

  const handleOptionDelete = (index) => {
    setOptionDrafts((currentDrafts) =>
      currentDrafts.filter((_, draftIndex) => draftIndex !== index)
    );

    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });
  };

  const handleAddOption = () => {
    const trimmedText = newOptionText.trim();

    if (!trimmedText) {
      return;
    }

    setOptionDrafts((currentDrafts) => [...currentDrafts, trimmedText]);
    setNewOptionText('');

    dispatch({
      type: 'ADD_OPTION_TO_QUESTION',
      payload: {
        questionId: question.id,
        optionText: trimmedText,
      },
    });
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <div className={styles['question-edit-form']}>
            <textarea
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
              className={styles['question-input']}
              rows={3}
            />
            <div className={styles['inline-actions']}>
              <button className={styles['save-btn']} onClick={handleSave}>
                Save
              </button>
              <button className={styles['cancel-btn']} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={optionDrafts[index] ?? option}
                      onChange={(e) =>
                        handleOptionDraftChange(index, e.target.value)
                      }
                      className={styles['option-input']}
                    />
                    <div className={styles['option-actions']}>
                      <button
                        className={styles['option-edit-btn']}
                        onClick={() => handleOptionSave(index)}
                      >
                        Save
                      </button>
                      <button
                        className={styles['option-delete-btn']}
                        onClick={() => handleOptionDelete(index)}
                        disabled={question.options.length <= 2}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>

          {isEditing && (
            <div className={styles['add-option']}>
              <input
                type="text"
                value={newOptionText}
                onChange={(e) => setNewOptionText(e.target.value)}
                className={styles['option-input']}
                placeholder="Add new option..."
              />
              <button
                className={styles['add-option-btn']}
                onClick={handleAddOption}
                disabled={!newOptionText.trim()}
              >
                + Add Option
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
