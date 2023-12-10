"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationEvents() {
  const [pacientes, setpacientes] = useState([]);
  const [nome, setNome] = useState("iu");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const prop = url.split("?")[1];
    console.log();

    setNome(prop.split("&")[1].split("=")[1].replaceAll("+", " "));
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/consulta/vacina/pendente/${Number(
            prop.split("&")[0].split("=")[1]
          )}`
        ); // Substitua pela URL da sua API
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
          <h1>Vacinas que o {nome} paciente não tomou </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pacientes.map((paciente: any) => (
              <div
                key={paciente.id_vacina}
                className="bg-white p-4 shadow-md rounded-md"
              >
                <p className="text-lg font-semibold text-gray-500">
                  Vacina aplicada
                </p>
                <p className="text-lg font-semibold text-gray-500">
                  Nome: {paciente.vacina}
                </p>
                <p className="text-sm text-gray-500">Dose: {paciente.dose}</p>
                <p className="text-sm text-gray-500">
                  Sigla: {paciente.sigla_vacina}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
