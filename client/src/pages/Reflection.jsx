// /client/pages/Reflection.jsx
import FreezeTimer from "../components/FreezeTimer";

const Reflection = () => {
  return (
    <div className="p-4 max-w-lg mx-auto text-center">
      <h1 className="text-xl font-semibold mb-2">Reflection Time</h1>
      <p>You’ve chosen to unpin. Take a moment to reflect.</p>
      <FreezeTimer />
    </div>
  );
};

export default Reflection;
