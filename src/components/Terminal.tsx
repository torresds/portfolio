import CommandLine from './CommandLine';

const Terminal: React.FC = () => {
  return (
    <div className="bg-black text-green-500 font-dos p-6 rounded shadow-2xl max-w-4xl w-full h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center border-b border-green-500 pb-2 mb-4">
        <span className="text-lg">MIGUEL-DOS</span>
      </div>
      <CommandLine />
    </div>
  );
};

export default Terminal;
