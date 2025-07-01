
'use client'

export function MethodologyGrid() {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="methodology-container">
      <div className="methodology-grid">
        
        <div className="methodology-card" data-id="recon-methodology" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-radar"></i>
          </div>
          <div className="card-header">
            <h3>Advanced Recon Methodology</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>methodology
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>recon
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div className="methodology-card" data-id="fetch-through-api" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-code"></i>
          </div>
          <div className="card-header">
            <h3>Gather assets through API</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>methodology
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>recon
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>api
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div className="methodology-card" data-id="ssti-payloads" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-brackets-curly"></i>
          </div>
          <div className="card-header">
            <h3>SSTI Payloads</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>payloads
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>injection
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div className="methodology-card" data-id="crlf-injection" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="card-header">
            <h3>CRLF Injection</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>payloads
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>injection
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>headers
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div className="methodology-card" data-id="sqli-methodology" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-database"></i>
          </div>
          <div className="card-header">
            <h3>SQL Injection Methodology</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>methodology
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>payloads
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>sqli
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div className="methodology-card" data-id="xss-waf-bypass" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="card-header">
            <h3>XSS WAF Bypass Methodology</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>xss
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>bypass
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>payloads
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div className="methodology-card" data-id="sqli-xor-waf-bypass" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-code"></i>
          </div>
          <div className="card-header">
            <h3>SQL Injection XOR WAF Bypass</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>sqli
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>xor
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>payloads
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div className="methodology-card" data-id="google-dorks" onClick={() => handleCardClick('#')}>
          <div className="card-icon">
            <i className="fas fa-search"></i>
          </div>
          <div className="card-header">
            <h3>Advanced Google Dorks</h3>
          </div>
          <div className="card-tags">
            <span className="tag">
              <i className="fas fa-hashtag"></i>google-hacking
            </span>
            <span className="tag">
              <i className="fas fa-hashtag"></i>google-dork
            </span>
          </div>
          <div className="card-footer">
            <i className="fas fa-terminal"></i><span>View Methodology</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        
      </div>
    </div>
  );
}
