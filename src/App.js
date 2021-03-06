import styled from "styled-components";
import Menu from "./Components/Menu/Index";
import React, { useEffect, useState } from "react";
import Banner from "./Components/Banner/index";
import TodosFilmes from "./Components/TodosFilmes/index";
import Carregamento from "./Components/Carregamento/index";
import Anuncio from "./Components/Anuncio/index";
import { carregarFilmes } from "./Api/funcoes";

const Corpo = styled.section`
  display: flex;
  flex-direction: column;
  color: #000;
`;

const Footer = styled.section`
  height: 200px;
  width: 100%;
  background-color: #a9a9a9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Texto = styled.p`
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  cursor: pointer;
  padding: 5px;

  & a {
    text-decoration: none;
    color: #fff;
  }
`;

export const Small = styled.small`
  text-align: center;
  color: #fff;
`;

const App = () => {
  const [cor, setCor] = useState("transparent");
  const [listaDeFilmes, setListaDeFilmes] = useState([]);
  const [destaqueParaBanner, setDestaqueParaBanner] = useState(null);
  const [anuncio1, setAnuncio1] = useState(null);
  const [anuncio2, setAnuncio2] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      setTimeout(async () => {
        const buscaFilmesEBanner = await carregarFilmes();

        setListaDeFilmes((prevState) => (prevState = buscaFilmesEBanner.lista));
        setDestaqueParaBanner(buscaFilmesEBanner.destaqueBanner);
        setAnuncio1(buscaFilmesEBanner.anuncio1);
        setAnuncio2(buscaFilmesEBanner.anuncio2);
      }, 2000);
    };
    carregar();
  }, []);

  useEffect(() => {
    document.title = "3035Flix";

    const rolarPagina = () => {
      if (window.scrollY > 10) {
        setCor("#101113bd");
      } else {
        setCor("transparent");
      }
    };
    window.addEventListener("scroll", rolarPagina);

    return () => {
      window.removeEventListener("scroll", rolarPagina);
    };
  }, []);

  return (
    <>
      {listaDeFilmes.length <= 0 && !destaqueParaBanner ? (
        <Carregamento id="Carregamento" />
      ) : (
        <Corpo id="corpo">
          <Menu
            corDeFundo={cor}
            id="Menu"
            setListaDeFilmes={setListaDeFilmes}
            setDestaqueParaBanner={setDestaqueParaBanner}
          />
          {destaqueParaBanner && (
            <Banner filme={destaqueParaBanner} id="Banner" />
          )}

          {listaDeFilmes.map((item, key) => {
            return <TodosFilmes key={key} listaDeFilmes={item} />;
          })}
        </Corpo>
      )}
      {anuncio1 && anuncio2 && <Anuncio filme={anuncio1} filme2={anuncio2} />}
      <hr />
      <Footer>
        <Texto>
          <a href="#topo">3035Flix</a>
        </Texto>
        <Small>Desenvolvido por Ayslan Ebling</Small>
      </Footer>
    </>
  );
};

export default App;
