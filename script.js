const modal = document.querySelector(".modal-container")
const tbody = document.querySelector("tbody")

const setItens = (item) => localStorage.setItem("dbbank", JSON.stringify(item))
const getItens = () => JSON.parse(localStorage.getItem("dbbank") || '[]')

const openModal = (edit = false, index) => {
  modal.classList.add("active")

  let name = document.querySelector("#m-nome")
  let funct = document.querySelector("#m-funcao")
  let salary = document.querySelector("#m-salario")

  let getItem = getItens()

  if (edit){
    name.value = getItem[index].name
    funct.value = getItem[index].funct
    salary.value = getItem[index].salary

    getItem.splice(index, 1)
    setItens(getItem)
  }else{
    name.value = ''
    funct.value = ''
    salary.value = ''
  }
  edit = false
}

modal.addEventListener('click', (e) =>{
  if(e.target.className.indexOf("modal-container") !== -1){
    modal.classList.remove("active")
  }
})

const loadItens = () => {
  const item = getItens()

  tbody.innerHTML = ''

  item.forEach((e, index) => {
    insertItem(e, index)
  });
}

function insertItem (e, index) {
  let tr = document.createElement('tr')

  tr.innerHTML =`
    <td>${e.name}</td>
    <td>${e.funct}</td>
    <td>${e.salary}</td>
    <td class="acao "><button onclick="editItem(${index})"><i class='bx bx-edit'></i></button></td>
    <td class="acao "><button  onclick="deletItem(${index})"><i class='bx bxs-trash'></i></button></td>
    `
  tbody.appendChild(tr)
}

const editItem = (index) => {
  openModal(true, index)
}

const deletItem = (index) => {
  const getItem = getItens()
  getItem.splice(index, 1)

  setItens(getItem)
  loadItens()
}

function addItens (e) {
  const name = document.querySelector("#m-nome").value
  const funct = document.querySelector("#m-funcao").value
  const salary = document.querySelector("#m-salario").value

  e.preventDefault()

  const getItem = getItens()

  getItem.push({"id": Math.random(50, 1000), "name": name, "funct": funct, "salary": salary}) 

  setItens(getItem)

  modal.classList.remove("active")
  loadItens()
}

loadItens()

document.querySelector("#btnSalvar").addEventListener("click", addItens)
