import CotizationSection from '../components/sections/CotizationSection';
import DetailSection from '../components/sections/DetailSection';

function Cotization() {
  return (
    <div className="p-2 min-h-screen grid grid-cols-2">
      <CotizationSection />
      <DetailSection/>
    </div>
  );
}

export default Cotization;
