import React, { Component } from "react";
import Fade from "react-reveal";
import CircleParticles from "./CircleParticles";

const LINKEDIN_URL = "https://www.linkedin.com/in/kenworthym";
const MEETING_LINKS = [
  { label: "Personal", url: "https://calendar.app.google/QmKRZNN5a9D2jqtx8" },
  { label: "Professional", url: "https://calendar.app.google/5fRzmcHQeSTVerJ58" }
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showSchedule: false };
    this.openSchedule = this.openSchedule.bind(this);
    this.closeSchedule = this.closeSchedule.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(e) {
    if (e.key === "Escape") this.closeSchedule();
  }

  openSchedule(e) {
    e.preventDefault();
    this.setState({ showSchedule: true });
  }

  closeSchedule() {
    this.setState({ showSchedule: false });
  }

  renderScheduleModal() {
    if (!this.state.showSchedule) return null;

    return (
      <div className="modal-backdrop" onClick={this.closeSchedule}>
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={this.closeSchedule}
          >
            &times;
          </button>
          <h3 id="schedule-title">Schedule a meeting</h3>
          <p>Which calendar should we use?</p>
          <div className="modal-actions">
            {MEETING_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="button btn primary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={this.closeSchedule}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const description = this.props.data.description;
    const profilepic = "images/" + this.props.data.image;
    const bioParagraphs = (this.props.data.bio || "")
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    return (
      <header id="home">
        <CircleParticles />

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            {description && (
              <Fade bottom duration={1200}>
                <h3>{description}</h3>
              </Fade>
            )}

            <Fade bottom duration={1200}>
              <div id="about" className="row about">
                <div className="three columns">
                  <img className="profile-pic" src={profilepic} alt={name} />
                </div>
                <div className="nine columns main-col">
                  {bioParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </Fade>

            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a
                  href={LINKEDIN_URL}
                  className="button btn primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a href="#schedule" className="button btn primary" onClick={this.openSchedule}>
                  Schedule a meeting
                </a>
              </ul>
            </Fade>
          </div>
        </div>

        {this.renderScheduleModal()}
      </header>
    );
  }
}

export default Header;
