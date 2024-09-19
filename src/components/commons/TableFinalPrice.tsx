type FinalPriceRow = {
  name: string;
  totalByAdults: number;
  totalByKids: number;
};

type TableFinalPriceProps = {
  rows: FinalPriceRow[];
  kids: number;
};

export default function TableFinalPrice({ rows, kids }: TableFinalPriceProps) {
  if (rows.length === 0) return null;

  return (
    <table className="min-w-full rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <thead className="[&_th]:p-4  [&_th]:border-2 [&_th]:border-blue-300 dark:[&_th]:border-yellow-300 dark:[&_th]:text-white">
        <tr className="bg-yellow-200 dark:bg-yellow-600">
          <th className="text-center">Hotel</th>
          <th>Adulto</th>
          {kids > 0 && <th>Total Niño</th>}
        </tr>
      </thead>
      <tbody className="text-center [&_td]:px-4 [&_td]:py-2">
        {rows.map(({ name, totalByAdults, totalByKids }, index) => (
          <tr key={index} className="[&_td]:border-2 [&_td]:border-blue-200 dark:text-white">
            <td className="text-start">{name}</td>
            <td className="font-bold">${totalByAdults}</td>
            {kids > 0 && <td className="font-bold">${totalByKids}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
