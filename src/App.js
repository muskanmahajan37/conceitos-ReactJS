import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  /* 
  1-
    Listar os repositórios da sua API: 
    Deve ser capaz de criar uma lista com 
    o campo title de todos os repositórios
    que estão cadastrados na sua API.
  */

  //definindo estado para armazenar os repositorios da api (estado inicial é um array porque o repositorio é em formado de obj)
  const [repositorios, setRepositorios] = useState([]);

  //fazer com que o componente busque as informações da api e sete o estado dos repositorios com os dados dessa busca
  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositorios(res.data);
      console.log(res.data);
    });
  }, []);

  /* 
  2 - 
    Adicionar um repositório a sua API: Deve ser capaz de
    adicionar um novo item na sua API através de um botão com
    o texto Adicionar e, após a criação, 
    deve ser capaz de exibir o nome dele após o cadastro.
      */
  async function handleAddRepository() {
    const resposta = await api.post("repositories", {
      title: `Repositorio ${new Date().getTime()}`,
      url: "https://api.github.com/repositories",
      techs: "Reactjs",
    });

    //passando os dados da requisicao post pra uma variavel
    const novoRepositorio = resposta.data;
    //setando o estado dos repositorios com esse novo repositorio
    setRepositorios([...repositorios, novoRepositorio]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const deletar = repositorios.filter((repositorio) => repositorio.id !== id);

    setRepositorios(deletar);
  }

  return (
    <div>
      {/* Criar lista com os titles de todos os repositorios */}
      <ul data-testid="repository-list">
        {repositorios.map((repositorio) => (
          <li key={repositorio.id}>
            {repositorio.title}

            <button onClick={() => handleRemoveRepository(repositorio.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
