// #about (the A-Team) from docs/source/design-v4.html: barometer, the member cards and the bench line.
// The mock's 3 placeholder cards are left out; Hemang's past-employer logos are kept as in the mock.
import { BaroTrack } from "./baro-track";

/* eslint-disable @next/next/no-img-element -- fixed-size photo and logos, markup kept 1:1 with the mock */

const EXPERIENCE = [
  { name: "JPMorgan Chase", src: "/images/v4/jpmorgan-chase.jpg" },
  { name: "American Express", src: "/images/v4/american-express.jpg" },
  { name: "Oracle", src: "/images/v4/oracle.jpg" },
];

const VISHVA_EXPERIENCE = [
  { name: "Toyota", src: "/images/v4/toyota.png" },
  { name: "The University of Texas at Dallas", src: "/images/v4/ut-dallas.png" },
  { name: "Resilient Privacy Inc", src: "/images/v4/resilient-privacy.png" },
];

export function About() {
  return (
    <section className="section ateam" id="about">
      <div className="wrap">
        <div className="intro">
          <div className="a">
            <p className="eyebrow">Who&apos;s behind DaVero AI</p>
            <h2>
              The <span className="accent">A-Team</span>
            </h2>
            <p className="sub">Agent Forward Focus Team</p>
            <p className="lede">An agent-first team. AI agents do the work, and a process owner reviews and approves every result.</p>
          </div>
          <div className="b">
            <div aria-label="Barometer: agents execute, humans validate and approve" className="baro" role="img">
              <p className="k">OUR BAROMETER</p>
              <h3>Human in the loop, always!</h3>
              <BaroTrack />
              <div className="ticks">
                <span>
                  <b>Humans Validate &amp; Approve</b>
                </span>
                <span>
                  <b>Agents Execute</b>
                </span>
              </div>
              <p className="note">
                <strong>Why?</strong> Agents carry the volume. Process owners approve every outcome, so control never leaves the business.
              </p>
            </div>
          </div>
        </div>
        {/* fixed-width cards that wrap, instead of a mostly empty 4-column grid */}
        <div className="crew" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 280px))" }}>
          <a aria-label="Hemang Bhatt on LinkedIn (opens in a new tab)" className="member hb" href="https://www.linkedin.com/in/hemangbhatt/" rel="noopener" target="_blank">
            <div className="av photo">
              <img alt="Hemang Bhatt" height="120" src="/images/v4/hemang-bhatt.jpg" width="120" />
              <span className="ok">
                <svg aria-hidden="true" fill="none" height="13" stroke="#081630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" viewBox="0 0 24 24" width="13">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </div>
            <h3>Hemang Bhatt</h3>
            <p className="role">Founding Partner &amp; CEO</p>
            <div aria-label="Experience: JPMorgan Chase, American Express, Oracle" className="exp">
              {EXPERIENCE.map((e) => (
                <span className="tip" data-tip={e.name} key={e.name}>
                  <img alt={e.name} height="46" src={e.src} width="46" />
                </span>
              ))}
            </div>
            <span className="netlabel">Experience</span>
            <span className="li">View on LinkedIn →</span>
          </a>
          <a aria-label="Vishva Patel on LinkedIn (opens in a new tab)" className="member hb" href="https://www.linkedin.com/in/vishva-vp/" rel="noopener" target="_blank">
            <div className="av photo">
              <img alt="Vishva Patel" height="120" src="/images/v4/vishva-patel.jpg" width="120" />
              <span className="ok">
                <svg aria-hidden="true" fill="none" height="13" stroke="#081630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" viewBox="0 0 24 24" width="13">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </div>
            <h3>Vishva Patel</h3>
            <p className="role">CISO</p>
            <div aria-label="Experience: Toyota, The University of Texas at Dallas, Resilient Privacy Inc" className="exp">
              {VISHVA_EXPERIENCE.map((e) => (
                <span className="tip" data-tip={e.name} key={e.name}>
                  <img alt={e.name} height="46" src={e.src} width="46" />
                </span>
              ))}
            </div>
            <span className="netlabel">Experience</span>
            <span className="li">View on LinkedIn →</span>
          </a>
        </div>
        <div className="bench">
          <div aria-hidden="true" className="dots">
            <span />
            <span />
            <span />
            <span />
            <b>+7</b>
          </div>
          <p>Specialist profiles ready to scale with each engagement.</p>
          {/* mock: navTo(<current page>, 'assessment'), i.e. this page's own #assessment */}
          <a href="#assessment">Book a last-mile assessment →</a>
        </div>
      </div>
    </section>
  );
}
