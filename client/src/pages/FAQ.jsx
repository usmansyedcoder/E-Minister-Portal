import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I file a complaint?",
      answer:
        "Click on the 'File a Complaint' button on the homepage, fill in the required information including your name, contact details, and complaint description, then submit the form. You will receive a confirmation email with a tracking number.",
    },
    {
      question: "What happens after I submit a complaint?",
      answer:
        "Your complaint is reviewed by the Minister's office. You will receive a confirmation email with a tracking number. The complaint is then assigned to the relevant department for action, and you'll be updated on the progress via email or phone.",
    },
    {
      question: "How long does it take to resolve a complaint?",
      answer:
        "Resolution times vary depending on the nature and complexity of the complaint. Most complaints are addressed within 5-7 business days. Complex cases may take longer, but you will be kept informed of the progress.",
    },
    {
      question: "Can I submit an anonymous complaint?",
      answer:
        "Yes, you can submit a complaint anonymously. However, providing your contact information helps us follow up with you and provide updates on the resolution of your complaint.",
    },
    {
      question: "What types of complaints can I file?",
      answer:
        "You can file complaints related to Healthcare, Education, Infrastructure, Agriculture, Electricity, Water, Roads, and other public service issues in Khyber Pakhtunkhwa.",
    },
    {
      question: "How do I track my complaint?",
      answer:
        "Use the 'Complaint Status' page on our website and enter your tracking number (received in the confirmation email) to check the current status of your complaint.",
    },
    {
      question: "Can I submit suggestions for improvement?",
      answer:
        "Absolutely! We welcome suggestions for improving governance and public services in Khyber Pakhtunkhwa. Visit the 'Give a Suggestion' page to share your ideas.",
    },
    {
      question: "Is my information kept secure?",
      answer:
        "Yes, your personal information is protected in accordance with privacy laws. Only authorized personnel have access to your data, and it is used solely for processing your complaint or suggestion.",
    },
    {
      question: "What if I don't receive a response?",
      answer:
        "If you haven't received a response within 7 business days, please contact us at 0312-9425477 or email sabahat_ghaznavi@yahoo.com for assistance.",
    },
    {
      question: "Can I submit multiple complaints?",
      answer:
        "Yes, you can submit multiple complaints. Please ensure each complaint is submitted separately with clear details to help us process them effectively.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-wrapper">
      <div className="bg-decor top-right"></div>
      <div className="bg-decor bottom-left"></div>

      <div className="page-container">
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>

        <div className="page-card">
          <div className="page-header">
            <div className="icon-wrapper">
              <span>❓</span>
            </div>
            <h1>Frequently Asked Questions</h1>
            <p>
              Find answers to the most commonly asked questions about the
              E-Minister Portal
            </p>
            <div className="divider-line"></div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span
                    className={`q-text ${openIndex === index ? "active" : ""}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`q-icon ${openIndex === index ? "open" : ""}`}
                  >
                    {openIndex === index ? "▼" : "▶"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "30px",
              padding: "clamp(20px, 2.5vw, 30px)",
              background: "linear-gradient(135deg, #01411C, #1a6b3a)",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                margin: 0,
              }}
            >
              💡 Still have questions? Contact us at{" "}
              <strong style={{ color: "#F9A826" }}>0312-9425477</strong> or
              email{" "}
              <strong style={{ color: "#F9A826" }}>
                sabahat_ghaznavi@yahoo.com
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
