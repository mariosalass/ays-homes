import PageLayout from '@/components/PageLayout';
import PropertiesSection from '@/components/PropertiesSection';
import { createSupabaseClient } from '@/lib/supabase';

export const metadata = {
  title: 'Propiedades en Venta y Alquiler · AyS Soluciones Comerciales',
  description: 'Explorá casas, apartamentos, locales, oficinas y terrenos en Costa Rica.',
};

export const revalidate = 60;

export default async function PropiedadesPage() {
  let properties = [];
  try {
    const sb = createSupabaseClient();
    const { data } = await sb.from('listings').select('*').eq('kind', 'property').order('created_at', { ascending: false });
    properties = data || [];
  } catch {}

  return (
    <PageLayout>
      <PropertiesSection properties={properties} />
    </PageLayout>
  );
}
