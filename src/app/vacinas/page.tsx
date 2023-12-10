"use client";

import { useEffect, useState } from "react";

export default function App() {
    const [vacinas, setvacinas] = useState([]);
    const [idadeFiltro, setIdadeFiltro] = useState("");

    const filtrarPorIdade = async () => {
        try {
            const response = await fetch(
                `http://localhost:4000/consulta/vacina/idade/${idadeFiltro}`
            ); // Substitua pela URL da sua API
            const data = await response.json();
            setvacinas(data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/consulta/vacina"
                ); // Substitua pela URL da sua API
                const data = await response.json();
                console.log(data);
                setvacinas(data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex items-center space-x-4 mb-4 p-4">
                <label htmlFor="idadeFiltro" className="text-gray-600">
                    Filtrar por idade:
                </label>
                <input
                    type="number"
                    id="idadeFiltro"
                    value={idadeFiltro}
                    onChange={(e) => setIdadeFiltro(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 text-black"
                />
                <button
                    onClick={filtrarPorIdade}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Filtrar
                </button>
            </div>
            {vacinas.length === 0 ? (
                <div className="flex justify-center items-center h-screen text-4xl">
                    carregando...
                </div>
            ) : (
                <>
                    <h1 className="p-4">vacinas</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {vacinas.map((vacina: any) => (
                            <div
                                key={vacina.vacina}
                                className="bg-white p-4 shadow-md rounded-md"
                            >
                                <p className="text-lg font-semibold text-gray-500">
                                    sigla_vacina: {vacina.sigla_vacina}
                                </p>
                                <p className="text-sm text-gray-500">
                                    doenca_protecao: {vacina.doenca_protecao}
                                </p>

                                <p className="text-sm text-gray-500">
                                    dose: {vacina.dose}
                                </p>
                                <p className="text-sm text-gray-500">
                                    id_rede: {vacina.id_rede}
                                </p>
                                <p className="text-sm text-gray-500">
                                    id_paciente: {vacina.id_paciente}
                                </p>
                                <p className="text-sm text-gray-500">
                                    data_aplicacao:{" "}
                                    {new Date(
                                        vacina.data_aplicacao
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    tipo_rede: {vacina.tipo_rede}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
