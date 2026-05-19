import PageLayout from '@/components/PageLayout';
import CarsSection from '@/components/CarsSection';
import { createSupabaseClient } from '@/lib/supabase';

export const metadata = {
  title: 'Autos en Venta · AyS Soluciones Comerciales',
  description: 'Encontrá el vehículo perfecto. Autos seminuevos con asesoría completa en Costa Rica.',
};

export const revalidate = 0;

export default async function AutosPage() {
  let cars = [];
  try {
    const sb = createSupabaseClient();
    const { data } = await sb.from('listings').select('*').eq('kind', 'car').order('created_at', { ascending: false });
    cars = data || [];
  } catch {}

  return (
    <PageLayout>
      <CarsSection cars={cars} />
    </PageLayout>
  );
}
