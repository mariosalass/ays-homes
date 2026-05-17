import PageLayout from '@/components/PageLayout';
import BusinessCard from '@/components/BusinessCard';
import { createSupabaseClient } from '@/lib/supabase';

export const revalidate = 60;

export const metadata = {
  title: 'Negocios en Venta y Traspaso · AyS Soluciones Comerciales',
  description: 'Encontrá negocios en venta, traspaso, sociedad o franquicia en Costa Rica.',
};

export default async function NegociosPage() {
  let businesses = [];
  try {
    const sb = createSupabaseClient();
    const { data } = await sb.from('listings').select('*').eq('kind', 'business').order('created_at', { ascending: false });
    businesses = data || [];
  } catch {}

  return (
    <PageLayout>
      <div className="pg-hero">
        <div className="pg-icon"><i className="fas fa-store" /></div>
        <h1>Negocios en Venta y Traspaso</h1>
        <p>Encontrá negocios en venta, traspaso, sociedad o franquicia en Costa Rica</p>
      </div>
      <div className="listings">
        <div className="listings-inner">
          <p className="rc">
            <strong>{businesses.length}</strong> {businesses.length === 1 ? 'negocio encontrado' : 'negocios encontrados'}
          </p>
          {businesses.length === 0 ? (
            <div className="loading-state">
              <i className="fas fa-store" style={{ fontSize:32, marginBottom:12 }} />
              <p>No hay negocios publicados por el momento.</p>
            </div>
          ) : (
            <div className="prop-grid">
              {businesses.map((item) => <BusinessCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
