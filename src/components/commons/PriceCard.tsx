export default function PriceCard({ kids, services }: any) {
  return (
    <table className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
      <thead className="[&_th]:p-4 ">
        <th className="text-start">Servicio</th>
        <th>1 Adulto</th>
        {kids > 0 && <th>1 Niño</th>}
      </thead>
      <tbody className="text-center [&_td]:py-2 [&_td]:px-4 ">
        {services.map((service: any) => (
          <tr className="last:text-blue-700 last:font-bold dark:text-white ">
            <td className="text-start">{service.name}</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(service.adultPrice)}
            </td>
            {kids > 0 && (
              <td>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(service.kidPrice)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
