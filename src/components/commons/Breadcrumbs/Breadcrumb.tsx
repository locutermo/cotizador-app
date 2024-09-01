import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  current?: {
    name:string;
    url?:string;
  };
  previous?:{
    name?:string;
    url?:string;
  }
}
const Breadcrumb = ({ current,previous }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {current?.name}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to={previous ? `/${previous.url}`:'/'}>
              {previous?.name || "Dashboard"} /
            </Link>
          </li>
          <li className="font-medium text-primary">{current?.name}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
