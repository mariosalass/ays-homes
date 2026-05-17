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
        <div className="sk sk-line w100" style={{ height:38, borderRadius:9 }} />
      </div>
    </div>
  );
}

export default function NegociosLoading() {
  return (
    <>
      <Navbar />
      <div className="sk sk-hero" />
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
