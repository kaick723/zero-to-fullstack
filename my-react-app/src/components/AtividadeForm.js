import {useEffect, useState} from 'react'


   //criando atividade inicial que será usada abaixo
const atividadeInicial ={
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: ''
}

export default function AtividadeForm(props) {

  //use State
  const [atividade, setAtividade]= useState(atividadeAtual());

  //use Effect que vai setar setAtividade usado acima no use State
  useEffect(() => {
    if(props.ativSelecionada.id !== 0)
      setAtividade(props.ativSelecionada);
  }, [props.ativSelecionada]);

  //será usado nos campos de texto para que sejam adicionado os dados na tarefa assim que o botão editar é acionado
  const inputTextHandler = (e) => {
    const {name, value} = e.target;
    
    setAtividade({...atividade, [name]: value});
}

//usado para atualizar a atividade assim que o botão salvar é acionado
const handleSubmit = (e) => {
  e.preventDefault();

  if(props.ativSelecionada.id !== 0)
     props.atualizarAtividade(atividade);
  else
    props.addAtividade(atividade);
    
    setAtividade(atividadeInicial);
}

//usado para cancelar atividade assim que o botão é selecionado
const handleCancelar = (e) => {
  e.preventDefault();

  props.cancelarAtividade()

  setAtividade(atividadeInicial);
}

//função para atualizar o useState
  function atividadeAtual() {
  if (props.ativSelecionada.id !== 0){
    return props.ativSelecionada;
  }else{
    return atividadeInicial;
  }
}

  return (
    <>
    <h1>Atividades {atividade.id !== 0 ? atividade.id : ''}</h1>
<form className='row g-3' onSubmit={handleSubmit}>    
{/* form Title */}
  <div className="form-group col-md-6">
    <label className='form-label'>Titulo</label>
      <input
        name='titulo'
        value={atividade.titulo} 
        onChange={inputTextHandler}
        id="titulo"
        type="text"
        className="form-control" 
      />
  </div>

      {/* form priority */}
<div className="form-group col-md-6">
<label className='form-label'>Prioridade</label>

  <select 
    name='prioridade'
    value={atividade.prioridade}
    onChange={inputTextHandler}
    id="prioridade" 
    className="form-select"
    >
     <option defaultValue={0}>Prioridade</option>
     <option value="1">Baixa</option>
     <option value="2">Normal</option>
     <option value="3">Alta</option>
  </select>
</div>

{/* form Description */}
<div className="form-group col-md-12">
<label className='form-label'></label>
  <textarea 
    name='descricao'
    value={atividade.descricao}
    onChange={inputTextHandler}
    id="descricao" 
    type="text" 
    className="form-control" 
    placeholder='descricao'
/>
</div>

<div className='col-12'>
{atividade.id === 0 ? (
<button onClick={props.addAtividade} className="btn btn-outline-secondary " type='submit'><i className='fas fa-plus me-2'></i> Atividade</button>
 ):(
 <>
 <button className="btn btn-outline-success me-2" type='submit'><i className='fas fa-plus me-2'></i> Salvar</button>
 
 <button className="btn btn-outline-danger" onClick={handleCancelar}><i className='fas fa-plus me-2'></i> Cancelar</button>
 </>
)}
</div>
</form>
</>
  )
}


