import 'moment/locale/es'
import moment from 'moment';
moment().locale('es');


const renderElementByType = (element, header) => {

  switch (header['type']) {
    case 'text': return (
      <h5 className="font-medium text-black dark:text-white">
        {element[header['attribute']]}
      </h5>
    );
    case 'custom': return (
      <header.Component element={element}/>
    );
    case 'date': return (
      <p className="font-medium text-black dark:text-white">
        {element[header['attribute']] ? moment(element[header['attribute']]).format('ll') : '-'}
      </p>
    )

    case 'datetime': return (
      <p className="font-medium text-black dark:text-white">
        {moment(element[header['attribute']]).format('lll')}
      </p>
    )

    case 'callbacks': return (
      <div className="flex items-center space-x-3.5 justify-center">
        {header['callbacks'].map(({ icon, Component, callback }, index) => (
          <Component key={index} onClick={() => { callback(element) }} />
        ))}
      </div>
    );

    default: return <p className="text-black dark:text-white">{element[header['attribute']]}</p>
  }
}

const Table = ({ data, headers }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {headers.map((header, key) => (
                <th key={key} className="w-auto text-center py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((element, key) => (
              <tr key={key}>
                {headers.map(header => (
                  <td key={Math.random()} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
                    {renderElementByType(element, header)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
