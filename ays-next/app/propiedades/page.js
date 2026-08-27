import PageLayout from '@/components/PageLayout';
import PropertiesSection from '@/components/PropertiesSection';
import { getListingsByKind } from '@/lib/listings';

export const metadata = {
  title: 'Propiedades en Alquiler y/o Venta · AyS Soluciones Comerciales',
  description: 'Explorá casas, apartamentos, locales, oficinas y terrenos en Costa Rica.',
};

export const revalidate = 0;

export default async function PropiedadesPage() {
  let properties = [];
  try {
    properties = await getListingsByKind('property');
  } catch {}

  return (
    <PageLayout>
      <PropertiesSection properties={properties} />
    </PageLayout>
  );
}
