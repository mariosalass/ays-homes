import Navbar from '@/components/Navbar';

function SkeletonCard() {
  return (
    <div className="sk-card">
      <div className="sk sk-card-img" />
      <div className="sk-card-body">
        <div className="sk sk-line w40" />
        <div className="sk sk-line w75" />
        <div className="sk sk-line w55" />
        <div className="sk sk-price" />
        <div className="sk sk-line w100" style={{ height: 38, borderRadius: 9 }} />
      </div>
    </div>
  );
}

export default function PropiedadesLoading() {
  return (
    <>
      <Navbar />
      <div className="sk sk-hero" style={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}>
        <div className="sk" style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.2)', animation:'none' }} />
        <div className="sk" style={{ width:260, height:28, background:'rgba(255,255,255,.2)', animation:'none' }} />
        <div className="sk" style={{ width:340, height:16, background:'rgba(255,255,255,.15)', animation:'none' }} />
      </div>
      {/* Filter bar */}
      <div className="sk-filter" style={{ padding:'1.6rem 2rem' }}>
        <div style={{ maxWidth:'var(--wrap)', margin:'0 auto', display:'flex', gap:'1rem' }}>
          <div className="sk" style={{ flex:1, height:44, borderRadius:10 }} />
          <div className="sk" style={{ width:140, height:44, borderRadius:10 }} />
        </div>
      </div>
      {/* Grid */}
      <div className="listings">
        <div className="listings-inner">
          <div className="sk sk-line w40" style={{ marginBottom:'1.8rem' }} />
          <div className="prop-grid">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    </>
  );
}
