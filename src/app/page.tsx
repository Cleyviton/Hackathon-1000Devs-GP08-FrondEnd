"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [pacientes, setpacientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/pacientes/"); // Substitua pela URL da sua API
        const data = await response.json();
        setpacientes(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {pacientes.length === 0 ? (
        <div>carregando...</div>
      ) : (
        <>
          <h1>Pacientes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pacientes.map((paciente: any) => (
              <Link
                href={{
                  pathname: `/vacinas/aplicada`,
                  query: {
                    pacienteId: paciente.id_paciente,
                    nome: paciente.nome,
                  },
                }}
                key={paciente.id_paciente}
                className="bg-white p-4 shadow-md rounded-md"
              >
                <p className="text-lg font-semibold text-gray-500">
                  {paciente.nome}
                </p>
                <p className="text-sm text-gray-500">
                  Data de Nascimento:{" "}
                  {new Date(paciente.data_nascimento).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
