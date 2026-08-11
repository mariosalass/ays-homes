import PageLayout from '@/components/PageLayout';
import CarsSection from '@/components/CarsSection';
import { getListingsByKind } from '@/lib/listings';

export const metadata = {
  title: 'Autos en Venta · AyS Soluciones Comerciales',
  description: 'Encontrá el vehículo perfecto. Autos seminuevos con asesoría completa en Costa Rica.',
};

export const revalidate = 0;

export default async function AutosPage() {
  let cars = [];
  try {
    cars = await getListingsByKind('car');
  } catch {}

  return (
    <PageLayout>
      <CarsSection cars={cars} />
    </PageLayout>
  );
}
