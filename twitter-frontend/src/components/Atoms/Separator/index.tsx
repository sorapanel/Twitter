export type SeparatorProps = {
  children?: React.ReactNode;
};

const Separator = ({ children }: SeparatorProps) => {
  return (
    <div
      className={`flex items-center text-gray-200 h-6 before:content-[''] before:flex-1 before:border before:border-gray-200 after:content-[''] after:flex-1 after:border after:border-gray-200 ${
        children ? "before: -mr-2 after: -ml-2" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Separator;
