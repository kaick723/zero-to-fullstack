import {useState} from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadesLista from './components/AtividadesLista'


/* *************************initial state of list********************************************************** */  



/* ****************************************************************************************** */  

function App() {

/* *****************************Function to add Date´s in list************************************************************* */  


const [atividades, setAtividades] = useState([]);
const [atividade, setAtividade] = useState({id:0});
  


function addAtividade(ativ) {
  if (atividades.length === 0) {
    setAtividades([{ ...ativ, id: 1 }]);
  } else {
    setAtividades((prevAtividades) => [...prevAtividades, { ...ativ, id: prevAtividades[prevAtividades.length - 1].id + 1 }]);
  }
}
/* ---------------------------------------------------------------------------------------------------------------------- */
  function cancelarAtividade(){
    setAtividade({id: 0});
  }

      //função para atualizar atividade
  function atualizarAtividade (ativ){
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item));
    setAtividade({id: 0});
  } 

        //função para deletar
  function deletarAtividade(id) { 
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
      setAtividades([...atividadesFiltradas]);
  }
        //função para editar
  function pegarAtividade(id){
    const atividade = atividades.filter((atividade) => atividade.id === id );
    setAtividade(atividade[0]);
  }

  /* *****************************Function to return priority level icon and color************************************************************* */     

  return (

   <>
    <AtividadeForm 
    addAtividade={addAtividade} 
    atividades={atividades}
    ativSelecionada={atividade}
    cancelarAtividade={cancelarAtividade}
    atualizarAtividade={atualizarAtividade}
    /> 

    <AtividadesLista
    atividades={atividades}
    deletarAtividade={deletarAtividade}
    pegarAtividade={pegarAtividade}/>
  </> 
  );
}

export default App;
