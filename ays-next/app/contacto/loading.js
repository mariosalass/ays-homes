import Navbar from '@/components/Navbar';

export default function ContactoLoading() {
  return (
    <>
      <Navbar />
      <div className="sk sk-hero" />
      <div className="ct-wrap">
        {/* Info cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {[0,1,2,3].map(i => (
            <div key={i} className="ci" style={{ gap:16 }}>
              <div className="sk" style={{ width:46, height:46, borderRadius:11, flexShrink:0 }} />
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                <div className="sk sk-line w55" style={{ height:14 }} />
                <div className="sk sk-line w75" style={{ height:14 }} />
                <div className="sk sk-line w40" style={{ height:12 }} />
              </div>
            </div>
          ))}
          {/* Social */}
          <div className="sc" style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div className="sk sk-line w55" style={{ height:14 }} />
            <div className="sk sk-line w100" style={{ height:12 }} />
            <div style={{ display:'flex', gap:10, marginTop:4 }}>
              {[0,1,2].map(i => <div key={i} className="sk" style={{ width:40, height:40, borderRadius:10 }} />)}
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="cfb" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className="sk sk-line w55" style={{ height:22 }} />
          <div className="sk sk-line w75" style={{ height:14 }} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <div className="sk" style={{ height:52, borderRadius:9 }} />
            <div className="sk" style={{ height:52, borderRadius:9 }} />
            <div className="sk" style={{ height:52, borderRadius:9 }} />
            <div className="sk" style={{ height:52, borderRadius:9 }} />
          </div>
          <div className="sk" style={{ height:120, borderRadius:9 }} />
          <div className="sk" style={{ height:52, borderRadius:10 }} />
        </div>
      </div>
    </>
  );
}
