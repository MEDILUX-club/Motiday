type TabOption = {
  label: string;
  value: string;
};

type FilterTabProps = {
  tabs: TabOption[];
  active: string;
  onChange: (value: string) => void;
};

const FilterTab = ({ tabs, active, onChange }: FilterTabProps) => {
  return (
    <div className="flex gap-3">
      {tabs.map(({ label, value }) => {
        const isActive = value === active;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`h-10 px-5 rounded-full border text-sm font-normal transition-colors
              ${isActive ? 'bg-gray-800 text-white border-gray-200' : 'bg-white text-gray-500 border-gray-300'}
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTab;
