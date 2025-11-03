import React, { useState, useEffect } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => boolean;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setFeedback('');
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (feedback.trim()) {
      const success = onSubmit(feedback);
      if (success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-green mb-4">Thank You!</h2>
            <p className="text-slate-300">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Feedback</h2>
            <p className="text-slate-400 mb-6">We'd love to hear your thoughts on how we can improve.</p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Report a bug, suggest a feature, or just say hello..."
              className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-brand-blue focus:outline-none resize-none"
              aria-label="Feedback input"
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onClose}
                className="py-2 px-4 text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!feedback.trim()}
                className="bg-brand-blue hover:bg-brand-green text-white font-bold py-2 px-5 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;