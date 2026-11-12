import Image from "next/image";
import Link from "next/link";
import hemang from "@/public/images/hemang-bhatt.jpg";
import jpm from "@/public/images/v4/jpmorgan-chase.jpg";
import amex from "@/public/images/v4/american-express.jpg";
import oracle from "@/public/images/v4/oracle.jpg";
import { Check } from "./icons";
import { ASSESSMENT_LABEL } from "./nav";

const EXPERIENCE = [
  { name: "JPMorgan Chase", src: jpm },
  { name: "American Express", src: amex },
  { name: "Oracle", src: oracle },
];

/** "The A-Team". Only real people are shown: the design's "[Full name]" placeholder cards are left out. */
export function ATeam({ assessmentHref = "#assessment" }: { assessmentHref?: string }) {
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
              <div className="track">
                <span className="fill" />
                <span className="pin" />
              </div>
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
        <div className="crew crew-4">
          <a
            aria-label="Hemang Bhatt, Founding Partner & CEO, on LinkedIn (opens in a new tab)"
            className="member hb"
            href="https://www.linkedin.com/in/hemangbhatt/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="av photo">
              <Image alt="" src={hemang} width={120} height={120} sizes="120px" />
              <span className="ok">
                <Check size={13} width={3.5} />
              </span>
            </div>
            <h3>Hemang Bhatt</h3>
            <p className="role">Founding Partner &amp; CEO</p>
            <div className="exp">
              {EXPERIENCE.map((e) => (
                <span key={e.name} className="tip" data-tip={e.name}>
                  <Image alt={e.name} src={e.src} width={32} height={32} />
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
          <Link href={assessmentHref}>{ASSESSMENT_LABEL} →</Link>
        </div>
      </div>
    </section>
  );
}
