import { mentoringTopics, mentoringData } from '../../data/portfolioData';
import '../../styles/MentoringSection.css';
import type { BookingContext } from '../../components/BookingModal';

interface MentoringSectionProps {
  onBooking: (context?: BookingContext) => void;
}

const MentoringSection = ({ onBooking }: MentoringSectionProps) => (
  <section id="mentoring" aria-labelledby="mentoring-heading">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2 id="mentoring-heading">{mentoringData.heading}</h2>
          <p className="mentoring-subheading">{mentoringData.subheading}</p>

          <ul className="mentoring-list">
            {mentoringTopics.map((topic) => (
              <li className="mentoring-item" key={topic.title}>
                <h3 className="mentoring-title">{topic.title}</h3>
                <p className="mentoring-description">{topic.description}</p>
                <p className="mentoring-for">
                  <span className="visually-hidden">Who this is for: </span>
                  {topic.forWhom}
                </p>
              </li>
            ))}
          </ul>

          <div className="mentoring-cta">
            <button
              className="mentoring-button"
              onClick={() => {
                window.umami?.track('mentoring-booking-click');
                onBooking('conversation');
              }}
            >
              Book 30 Minutes <span aria-hidden="true">&#8594;</span>
            </button>
            <p className="mentoring-closing">{mentoringData.closing}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MentoringSection;
