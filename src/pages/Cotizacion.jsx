import Breadcrumb from '../components/commons/Breadcrumbs/Breadcrumb';
import CotizationSection from '../components/sections/CotizationSection';
import DetailSection from '../components/sections/DetailSection';

function Cotization() {
  return (
    <>
      <Breadcrumb pageName="Cotizaciones" homeName='Inicio'/>
      <div className="gap-4 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <CotizationSection />
        <DetailSection />
      </div>
    </>
  );
}

export default Cotization;
