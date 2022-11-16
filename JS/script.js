const date = new Date()

async function carregarDados() {
  try {
    const response = await fetch('/json/funcionarios.json')
    const lista = await response.json()
    return lista
  } catch (erro) {
    alert(erro)
  }
}

async function apresentarNomes() {
  const funcionarios = await carregarDados()

  sorted = funcionarios.sort((a, b) => {
    return (
      quantoFaltaAniversario(a.data_de_nascimento) -
      quantoFaltaAniversario(b.data_de_nascimento)
    )
  })

  const ul = document.querySelector('#lista')

  sorted.forEach(funcionario => {
    let div = document.createElement('div')
    div.setAttribute('id', 'div_funcionario')

    let liNome = document.createElement('li')
    liNome.setAttribute('id', 'li_nome')

    let liData = document.createElement('li')
    liData.setAttribute('id', 'li_data')

    liNome.innerHTML = funcionario.nome
    liData.innerHTML = saidaData(funcionario.data_de_nascimento)

    div.appendChild(liNome)
    div.appendChild(liData)

    ul.appendChild(div)
  })
}

function transformaData(data) {
  return data.split('-').reverse().join('/')
}

function descobreIdade(data) {
  ano_atual = date.getFullYear()
  mes_atual = date.getMonth() + 1
  dia_atual = date.getDate()

  ano_aniversario = parseInt(data.split('-')[0])
  mes_aniversario = parseInt(data.split('-')[1])
  dia_aniversario = parseInt(data.split('-')[2])

  anos = ano_atual - ano_aniversario

  if (
    mes_atual < mes_aniversario ||
    (mes_atual == mes_aniversario && dia_atual < dia_aniversario)
  ) {
    anos--
  }

  return anos
}

function quantoFaltaAniversario(data) {
  mes_atual = date.getMonth() + 1
  dia_atual = date.getDate()

  mes_aniversario = parseInt(data.split('-')[1])
  dia_aniversario = parseInt(data.split('-')[2])

  meses = mes_aniversario - mes_atual
  if (meses < 0) {
    meses = meses + 12
  }
  dias = dia_aniversario - dia_atual

  ret = meses * 30 + dias
  return ret
}

function saidaData(data) {
  idade = descobreIdade(data)
  faltaAniversario = quantoFaltaAniversario(data)
  saida = `${transformaData(
    data
  )} (${idade}; faltando ${faltaAniversario} dias para o aniversário)`
  return saida
}

document.addEventListener('DOMContentLoaded', apresentarNomes) //chamar a função sem os parênteses pq passa a referência da função e não a execução da mesma
