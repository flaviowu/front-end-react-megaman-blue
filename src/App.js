import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Cards";
import { lista } from "./components/jogosdb";
import { getIndexById } from "./modules/util.js";

export default function App() {
  const [nomeJogo, setNomeJogo] = useState("");                 // input nome do jogo
  const [anoJogo, setAnoJogo] = useState("");                  // input ano de lançamento do jogo
  const [imgUrlJogo, setImgUrlJogo] = useState("");           // input url do jogo
  const [gameplay, setGameplayJogo] = useState("");           // input url do video de gameplay do jogo
  const [edicao, setEdicao] = useState(false);                 // estado modo edição de jogo
  const [idEdicao, setIdEdicao] = useState(null);             // id do jogo a ser editado
  const [listaJogos, setListaJogos] = useState([...lista]);    // lista de jogos

  useEffect(() => {
    if (idEdicao !== null && edicao) {
      const game = listaJogos.filter((f) => f.id === idEdicao)[0];
      setNomeJogo(game.titulo);
      setAnoJogo(game.ano);
      setImgUrlJogo(game.imgUrl);
      setGameplayJogo(game.youtubeId);
    }
  }, [idEdicao]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nomeJogo !== "" && anoJogo !== "" && imgUrlJogo !== "" && gameplay !== "") {
      let listaTemp = listaJogos;
      if (edicao) {
        const index = getIndexById(idEdicao, listaTemp);
        console.log(`id= ${listaTemp[index].id} e o index é ${index}`)
        listaTemp[index] = {
          id: listaTemp[index].id,
          titulo: nomeJogo,
          ano: anoJogo,
          imgUrl: imgUrlJogo,
          youtubeId: gameplay,
        };
      } else if (!edicao) {
        const novoId = listaTemp[listaTemp.length - 1].id + 1;
        listaTemp = [
          ...listaTemp,
          {
            id: novoId,
            titulo: nomeJogo,
            ano: anoJogo,
            imgUrl: imgUrlJogo,
            youtubeId: gameplay,
          },
        ];
      }
      setListaJogos([...listaTemp]); 
      handleClean();
    }
   
  };

  function handleClean() {
    setIdEdicao(null);
    setNomeJogo("");
    setAnoJogo("");
    setImgUrlJogo("");
    setGameplayJogo("");
  }

  function handleDelete(id) {
    setListaJogos(listaJogos.filter((jogo) => jogo.id !== id));
  }

  return (
    <>
      <div className="container-sm">
        <img
          src="https://upload.wikimedia.org/wikipedia/pt/d/de/Mega_man_logo.png"
          alt="logo do mega man"
        />
        <ul>
          {listaJogos.map((jogo) => {
            return (
              <li key={jogo.id}>
                <Card
                  imgUrl={jogo.imgUrl}
                  titulo={jogo.titulo}
                  ano={jogo.ano}
                  youtubeId={jogo.youtubeId}
                  handleDelete={handleDelete}
                />
                <div className="card-btn">
                  <button
                    type="button"
                    onClick={() => {
                      setEdicao(true);
                      setIdEdicao(jogo.id);
                    }}
                  >
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(jogo.id)}>
                    Deletar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="form-adm" style={{ display: "flex" }}>
        <form name="cad-adm">
          <h3>Administração</h3>
          <input
            type="text"
            name="titulo"
            onChange={(e) => setNomeJogo(e.target.value)}
            value={nomeJogo}
            placeholder="Digite o Título do Jogo"
          />
          <input
            type="text"
            name="ano"
            onChange={(e) => setAnoJogo(e.target.value)}
            value={anoJogo}
            placeholder="Digite o ano do Jogo"
          />
          <input
            type="url"
            name="img-url"
            onChange={(e) => setImgUrlJogo(e.target.value)}
            value={imgUrlJogo}
            placeholder="Digite a URL da imagem"
          />
          <input
            type="url"
            name="youtubeId"
            onChange={(e) => setGameplayJogo(e.target.value)}
            value={gameplay}
            placeholder="Digite o link do Gameplay"
          />
          <button type="submit" onClick={handleSubmit}>
            Salvar Jogo
          </button>
          <button type="button" onClick={handleClean}>
            Limpar
          </button>
        </form>
      </div>
    </>
  );
}
