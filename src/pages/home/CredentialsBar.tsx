import '../../styles/CredentialsBar.css';

const CredentialsBar = () => (
  <div className="credentials-bar">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <ul className="credentials-list" aria-label="Education and credentials">
            <li className="credentials-item">
              <i className="fas fa-graduation-cap" aria-hidden="true"></i>
              M.S. Computer Science, USC
            </li>
            <li className="credentials-item">
              <i className="fas fa-graduation-cap" aria-hidden="true"></i>
              B.E. Computer Science, Manipal University
            </li>
            <li className="credentials-item">
              <i className="fas fa-lightbulb" aria-hidden="true"></i>
              <a
                href="https://patents.google.com/patent/US20180188935A1"
                target="_blank"
                rel="noopener noreferrer"
              >
                U.S. Patent — Adaptive Notification Delivery
                <span className="visually-hidden"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default CredentialsBar;
