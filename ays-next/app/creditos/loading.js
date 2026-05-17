import Navbar from '@/components/Navbar';

export default function CreditosLoading() {
  return (
    <>
      <Navbar />
      <div className="sk sk-hero" />
      <div className="section">
        <div className="section-inner">
          <div className="cr-grid">
            {[0, 1].map(i => (
              <div key={i} className="crc" style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="sk" style={{ width:54, height:54, borderRadius:13 }} />
                <div className="sk sk-line w55" style={{ height:22 }} />
                <div className="sk sk-line w100" style={{ height:44, borderRadius:9 }} />
                <div className="sk sk-line w40" style={{ height:14 }} />
                {[0,1,2].map(j => (
                  <div key={j} style={{ display:'flex', alignItems:'center', gap:9 }}>
                    <div className="sk" style={{ width:16, height:16, borderRadius:'50%', flexShrink:0 }} />
                    <div className="sk sk-line w75" />
                  </div>
                ))}
                <div className="sk sk-line w100" style={{ height:52, borderRadius:9, marginTop:'0.5rem' }} />
              </div>
            ))}
          </div>
          {/* Form skeleton */}
          <div className="fp" style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="sk sk-line w55" style={{ height:26, margin:'0 auto' }} />
            <div className="sk sk-line w75" style={{ height:14, margin:'0 auto' }} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              <div className="sk" style={{ height:52, borderRadius:9 }} />
              <div className="sk" style={{ height:52, borderRadius:9 }} />
              <div className="sk" style={{ height:52, borderRadius:9 }} />
              <div className="sk" style={{ height:52, borderRadius:9 }} />
            </div>
            <div className="sk" style={{ height:52, borderRadius:9 }} />
            <div className="sk" style={{ height:100, borderRadius:9 }} />
            <div className="sk" style={{ height:52, borderRadius:10 }} />
          </div>
        </div>
      </div>
    </>
  );
}
