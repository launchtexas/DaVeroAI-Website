/** Commercial model. `outcome` is the Managed outcome card's text, which differs per function page. */
export function Pricing({ outcome = "Priced on results, such as days to close, exceptions cleared or invoices matched." }: { outcome?: string }) {
  return (
    <section className="section alt" id="pricing">
      <div className="wrap">
        <p className="eyebrow">Commercial model</p>
        <h2>Pay for the outcome</h2>
        <div className="grid">
          <div className="card">
            <p className="kicker">Fixed fee</p>
            <h3 style={{ fontSize: 24 }}>Deployment</h3>
            <p>A 6–10 week embed per workflow set, credited against a multi-year agreement.</p>
          </div>
          <div className="card">
            <p className="kicker">Monthly subscription</p>
            <h3 style={{ fontSize: 24 }}>Managed agents</h3>
            <p>We run, monitor and improve the agents, with token usage optimized to keep run costs down. Priced per agent or per entity.</p>
          </div>
          <div className="card inverse">
            <p className="kicker">Outcome-based</p>
            <h3 style={{ fontSize: 24 }}>Managed outcome</h3>
            <p>{outcome}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
