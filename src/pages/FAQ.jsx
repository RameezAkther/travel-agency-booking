import React, { useState } from 'react';

const FAQ = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    if (userQuestion.trim() !== '') {
      const existingQuestions = JSON.parse(localStorage.getItem('userQuestions')) || [];
      existingQuestions.push({ question: userQuestion, date: new Date().toLocaleString() });
      localStorage.setItem('userQuestions', JSON.stringify(existingQuestions));

      setSubmitted(true);
      setUserQuestion('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>

      <div className="accordion" id="faqAccordion">

        {/* FAQ 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeadingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseOne" aria-expanded="true" aria-controls="faqCollapseOne">
              How can I book a travel package?
            </button>
          </h2>
          <div id="faqCollapseOne" className="accordion-collapse collapse show" aria-labelledby="faqHeadingOne" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Simply browse our travel packages, click "View More", and then click "Book Now" to fill in your booking details!
            </div>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeadingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseTwo" aria-expanded="false" aria-controls="faqCollapseTwo">
              Can I cancel my booking?
            </button>
          </h2>
          <div id="faqCollapseTwo" className="accordion-collapse collapse" aria-labelledby="faqHeadingTwo" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Currently, you can cancel your booking by contacting our support team. Automatic cancellation feature will be added soon.
            </div>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeadingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseThree" aria-expanded="false" aria-controls="faqCollapseThree">
              What payment methods do you accept?
            </button>
          </h2>
          <div id="faqCollapseThree" className="accordion-collapse collapse" aria-labelledby="faqHeadingThree" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              We accept major debit/credit cards, UPI, and bank transfers. Online payment integration is coming soon in the next version.
            </div>
          </div>
        </div>

      </div>

      {/* Divider */}
      <hr className="my-5" />

      {/* Submit your own question */}
      <div className="mt-5">
        <h4 className="text-center mb-4">Didn't find your answer? Ask us!</h4>

        {submitted ? (
          <div className="alert alert-success text-center">
            Thank you for submitting your question! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleQuestionSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Type your question here..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit Question</button>
          </form>
        )}
      </div>

    </div>
  );
};

export default FAQ;
