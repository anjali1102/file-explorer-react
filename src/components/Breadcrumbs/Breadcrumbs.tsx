type Crumb = {
  id: string;
  name: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  onNavigate: (id: string) => void;
};

function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm p-5"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className="flex items-center gap-2">
            {index > 0 && <span className="text-slate-400">/</span>}
            {isLast ? (
              <span className="font-medium text-slate-950 cursor-pointer">
                {item.name}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className="text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {item.name}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
