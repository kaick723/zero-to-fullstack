using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tarefa.Models;
using Tarefa.Data;

namespace Tarefa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;
     
        public AtividadeController(DataContext context)
        {
            _context = context;    
        }

       [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

         [HttpGet("{id}")]
public ActionResult<Atividade> Get(int id)
{
    var atividade = _context.Atividades.FirstOrDefault(ati => ati.id == id);
    if (atividade == null)
    {
        return NotFound(); // Retorna 404 se a atividade não for encontrada
    }
    return Ok(atividade); // Retorna a Atividade encontrada
}

    
       [HttpPost]
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);

            if (_context.SaveChanges()>0)
            return _context.Atividades;
            else
            throw new Exception("Voce não conseguiu adicionar uma atividade"); 
        }
    //------------------------------------------------------------------------------------------------------------
      [HttpPut("{id}")]
public ActionResult<Atividade> Put(int id, Atividade atividade)
{
    // Verifique se o ID da URL corresponde ao ID da atividade passada
    if (id != atividade.id)
        return BadRequest("O ID da URL não corresponde ao ID da atividade"); // Retorna 400 Bad Request

    // Encontre a atividade existente no banco de dados
    var atividadeExistente = _context.Atividades.FirstOrDefault(ati => ati.id == id);
    if (atividadeExistente == null)
        return NotFound(); // Retorna 404 Not Found se a atividade não for encontrada

    // Atualiza os valores da atividade existente com os valores fornecidos
    _context.Entry(atividadeExistente).CurrentValues.SetValues(atividade);

    // Salva as alterações no banco de dados
    if (_context.SaveChanges() > 0)
    {
        return Ok(atividadeExistente); // Retorna a atividade atualizada com status 200 OK
    }
    else
    {
        return StatusCode(500, "Erro ao atualizar a atividade"); // Retorna 500 Internal Server Error em caso de falha
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ati => ati.id == id);
            if (atividade == null)
                throw new Exception("Você está tentando deletar uma atividade que não existe");
            _context.Remove(atividade);
               return _context.SaveChanges() > 0;         
        }
    }
}