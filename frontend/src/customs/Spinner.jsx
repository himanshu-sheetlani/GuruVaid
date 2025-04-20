import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-black animate-spin" />
    </div>
  );
};

export default Spinner;
