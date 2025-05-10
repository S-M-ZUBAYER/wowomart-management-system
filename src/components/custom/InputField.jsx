const InputField = ({ label, name, value, onChange }) => {
  const isNumberField = label === "Amount";

  return (
    <div>
      <label className="block text-gray-700 font-semibold">{label}:</label>
      <input
        type={isNumberField ? "number" : "text"}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default InputField;
