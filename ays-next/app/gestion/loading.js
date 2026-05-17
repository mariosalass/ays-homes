import Navbar from '@/components/Navbar';

export default function GestionLoading() {
  return (
    <>
      <Navbar />
      <div className="sk sk-hero" />
      <div className="sk" style={{ height:52, borderRadius:0 }} />
      <div className="section">
        <div className="section-inner">
          <div style={{ textAlign:'center', marginBottom:'3rem', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            <div className="sk sk-line w40" style={{ height:12 }} />
            <div className="sk sk-line w55" style={{ height:28 }} />
            <div className="sk sk-line w75" style={{ height:14 }} />
          </div>
          <div className="mg-grid">
            {[0, 1, 2].map(i => (
              <div key={i} className="mgc" style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div className="sk" style={{ width:50, height:50, borderRadius:12 }} />
                <div className="sk sk-line w75" style={{ height:18 }} />
                <div className="sk sk-line w100" />
                <div className="sk sk-line w100" />
                {[0,1,2].map(j => (
                  <div key={j} style={{ display:'flex', gap:9, alignItems:'center' }}>
                    <div className="sk" style={{ width:14, height:14, borderRadius:3, flexShrink:0 }} />
                    <div className="sk sk-line w75" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Why grid */}
      <div style={{ background:'linear-gradient(120deg,var(--teal-d),var(--teal))', padding:'4rem 2rem' }}>
        <div className="section-inner">
          <div className="why-grid">
            {[0,1,2,3].map(i => (
              <div key={i} className="wi" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
                <div className="sk" style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.2)', animation:'none' }} />
                <div className="sk sk-line w75" style={{ background:'rgba(255,255,255,.2)', animation:'none' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Form skeleton */}
      <div className="section s-bg">
        <div className="section-inner">
          <div className="fp" style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="sk sk-line w55" style={{ height:26, margin:'0 auto' }} />
            <div className="sk sk-line w75" style={{ height:14, margin:'0 auto' }} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              <div className="sk" style={{ height:52, borderRadius:9 }} />
              <div className="sk" style={{ height:52, borderRadius:9 }} />
              <div className="sk" style={{ height:52, borderRadius:9 }} />
              <div className="sk" style={{ height:52, borderRadius:9 }} />
            </div>
            <div className="sk" style={{ height:100, borderRadius:9 }} />
            <div className="sk" style={{ height:52, borderRadius:10 }} />
          </div>
        </div>
      </div>
    </>
  );
}
