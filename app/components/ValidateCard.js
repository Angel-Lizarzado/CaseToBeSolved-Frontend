import { useState } from 'react';

export default function ValidateCard({ onValidate }) {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onValidate(code);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Validar Código</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Código de Validación</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            maxLength="6"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Validar</button>
      </form>
    </div>
  );
}
