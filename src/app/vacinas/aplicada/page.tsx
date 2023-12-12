"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationEvents() {
    const [vacinasPendentes, setvacinasPendentes] = useState([]);
    const [vacinasAplicadas, setvacinasAplicadas] = useState([]);
    const [nome, setNome] = useState("");
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        const prop = url.split("?")[1];

        const fetchData = async () => {
            try {
                setLoading(true);

                const responseAplicadas = await fetch(
                    `http://localhost:4000/consulta/vacina/paciente/${Number(
                        prop.split("&")[0].split("=")[1]
                    )}`
                ); // Substitua pela URL da sua API
                const aplicadas = await responseAplicadas.json();
                setvacinasAplicadas(aplicadas.vacinasAplicadas);
                setNome(aplicadas.nome);

                const responsePendentes = await fetch(
                    `http://localhost:4000/consulta/vacina/pendente/${Number(
                        prop.split("&")[0].split("=")[1]
                    )}`
                ); // Substitua pela URL da sua API
                const pendentes = await responsePendentes.json();
                setvacinasPendentes(pendentes);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <div>carregando...</div>
            ) : (
                <>
                    <h1 className="p-4">
                        Vacinas aplicadas ao paciente {nome}:{" "}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {vacinasAplicadas.length > 0 ? (
                            vacinasAplicadas.map((vacina: any) => (
                                <div
                                    key={vacina.id_vacina}
                                    className="bg-white p-4 shadow-md rounded-md"
                                >
                                    <p className="text-lg font-semibold text-gray-500">
                                        Vacina Pendente
                                    </p>
                                    <p className="text-lg font-semibold text-gray-500">
                                        Nome: {vacina.vacina}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Dose: {vacina.dose}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Sigla: {vacina.sigla_vacina}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <h1 className="p-4">
                                Não foi aplicado nenhuma vacina ao paciente{" "}
                                {nome}
                            </h1>
                        )}
                    </div>

                    <h1 className="p-4">Vacinas pendentes:</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {vacinasPendentes.length == 0 ? (
                            <h1 className="p-4">
                                O(A) paciente {nome} não possui vacinas
                                pendentes
                            </h1>
                        ) : (
                            vacinasPendentes.map((paciente: any) => (
                                <div
                                    key={paciente.id_vacina}
                                    className="bg-white p-4 shadow-md rounded-md"
                                >
                                    <p className="text-lg font-semibold text-gray-500">
                                        Vacina Pendente
                                    </p>
                                    <p className="text-lg font-semibold text-gray-500">
                                        Nome: {paciente.vacina}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Dose: {paciente.dose}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Sigla: {paciente.sigla_vacina}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </>
    );
}
