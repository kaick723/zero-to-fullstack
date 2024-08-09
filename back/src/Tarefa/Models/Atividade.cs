using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tarefa.Models
{
    public class Atividade
    {
           public int id { get; set; }

           public string Titulo { get; set; }

           public string Descricao { get; set; }

           public string Prioridade  { get; set; }

       public Atividade() {}

        public Atividade(int id)
        {
            this.id = id;
        }
    }
}