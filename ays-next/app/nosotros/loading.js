import Navbar from '@/components/Navbar';

export default function NosotrosLoading() {
  return (
    <>
      <Navbar />
      <div className="sk sk-hero" />
      <div className="section">
        <div className="section-inner">
          <div className="about-wrap">
            {/* Fotos */}
            <div className="agent-photos">
              <div className="sk" style={{ flex:1, height:360, borderRadius:16 }} />
              <div className="sk" style={{ flex:1, height:360, borderRadius:16 }} />
            </div>
            {/* Texto */}
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div className="sk sk-line w40" style={{ height:12 }} />
              <div className="sk sk-line w75" style={{ height:32 }} />
              <div className="sk sk-line w100" />
              <div className="sk sk-line w100" />
              <div className="sk sk-line w75" />
              <div style={{ display:'flex', gap:'2rem', marginTop:'1rem' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                    <div className="sk" style={{ width:48, height:48, borderRadius:12 }} />
                    <div className="sk sk-line w75" style={{ height:12 }} />
                    <div className="sk sk-line w100" style={{ height:10 }} />
                  </div>
                ))}
              </div>
              <div className="sk" style={{ width:220, height:44, borderRadius:10, marginTop:'0.5rem' }} />
            </div>
          </div>
        </div>
      </div>
      {/* Valores grid */}
      <div className="section s-bg">
        <div className="section-inner">
          <div style={{ textAlign:'center', marginBottom:'2.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            <div className="sk sk-line w40" style={{ height:12 }} />
            <div className="sk sk-line w55" style={{ height:28 }} />
          </div>
          <div className="vg">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="vc" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
                <div className="sk" style={{ width:48, height:48, borderRadius:'50%' }} />
                <div className="sk sk-line w75" style={{ height:16 }} />
                <div className="sk sk-line w100" />
                <div className="sk sk-line w75" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
