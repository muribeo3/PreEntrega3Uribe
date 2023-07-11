
//capturar los elementos del DOM
let notas_input = document.getElementById("notasIngresadas")
let agregarEstudianteBtn = document.getElementById("guardarEstudianteBtn")
let agregarNotas = document.getElementById("agregarNotasBtn")
let estudiantesDiv = document.getElementById("estudiantesDiv")
let buscador = document.getElementById("buscador")
let verLista = document.getElementById("verLista")
let ocultarLista = document.getElementById("ocultarLista")
let selectOrden = document.getElementById("selectOrden")
let coincidencia = document.getElementById("coincidencia")
let buscarBtn = document.getElementById("btnBuscar")
//funciones proyecto
function calcularId(array) {
    console.log(array)
    // el mayor valor de id + 1
    if (array.length == 0) {
        return 1
    }
    else {
        let arrayID = array.map((dato) => dato.id)
        console.log(arrayID)
        let id = Math.max(arrayID) + 1
        console.log(id)
        return id
    }
}

function notas() {
    let cantidadNotasIngresadas = document.getElementById("cantidadNotasInput").value
    notas_input.innerHTML = ``

    for (let i = 0; i < cantidadNotasIngresadas; i++) {

        notas_input.innerHTML +=
            `<div class="mb-3">
            <label for="nota${i}" class="form-label">nota ${i + 1} : entre 0 y 10</label>
            <input type="number" class="form-control" id=nota${i} aria-describedby=nota${i}>
        </div>`
    }
}

function mostrarEstudiantes(array) {
    estudiantesDiv.innerHTML = ""
    for (let estudiante of array) {
        estudiantesDiv.innerHTML += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title letra fw-bold">${estudiante.nombre}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${estudiante.curso}</h6>
          <p class="card-text">Promedio: ${estudiante.promedio.toFixed(2)}</p>
          <p class="card-text">Notas: ${estudiante.array_notas}</p>
          `
    }
}

function capturarNotas(cant_notas) {
    let array_notas = []
    let total = 0
    for (let i = 0; i < cant_notas; i++) {
        let nota = document.getElementById(`nota${i}`).value
        array_notas.push(parseInt(nota))
        total += parseInt(nota)

    }
    return [total, array_notas]
}


function capturarEstudiante(array) {

    let nombreEstudianteIngresado = document.getElementById("nombreEstudianteInput")
    let nombreCursoIngresado = document.getElementById("nombreCursoInput")
    let cantidadNotasIngresadas = document.getElementById("cantidadNotasInput")


    let [total, array_notas] = capturarNotas(parseInt(cantidadNotasIngresadas.value))
    let promedio = total / cantidadNotasIngresadas.value
    let id = array.length + 1
    let estudiante = new Estudiante(id, nombreEstudianteIngresado.value, nombreCursoIngresado.value, cantidadNotasIngresadas.value, array_notas, promedio)
    array.push(estudiante)
    localStorage.setItem("estudiantes", JSON.stringify(array))
    mostrarEstudiantes(array)
    nombreEstudianteIngresado.value = ""
    nombreCursoIngresado.value = ""
    cantidadNotasIngresadas.value = ""
    notas_input.innerHTML = ""

}

function ordenarMenorMayor(array) {
    //copia del array original, para aplicar sort y no modificar estanteria
    const menorMayor = [].concat(array)
    console.log(menorMayor)
    //de forma ascendente por el atributo precio
    menorMayor.sort((elem1, elem2) => elem1.promedio - elem2.promedio)
    mostrarEstudiantes(menorMayor)
}

function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    //ordenar forma descendente 
    mayorMenor.sort((elem1, elem2) => elem2.promedio - elem1.promedio)
    mostrarEstudiantes(mayorMenor)
}

function ordenarAlfabeticamenteCurso(array) {
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort((a, b) => {
        if (a.curso > b.curso) {
            return 1
        }
        if (a.curso < b.curso) {
            //return explicito
            return -1
        }
        // a must be equal to b
        return 0
    })

    mostrarEstudiantes(arrayAlfabetico)
}

function ordenarAlfabeticamenteNombre(array) {
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            //return explicito
            return -1
        }
        // a must be equal to b
        return 0
    })

    mostrarEstudiantes(arrayAlfabetico)
}

function buscarInfo(buscado, array) {
    let busqueda = array.filter(
        (dato) => dato.nombre.toLowerCase().includes(buscado.toLowerCase()) || dato.curso.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con la búsqueda ${buscado}</h3>`,
            mostrarEstudiantes(busqueda)) :
        (coincidencia.innerHTML = "", mostrarEstudiantes(busqueda))
}


//EVENTOS: 
agregarNotas.addEventListener("click", function (event) {
    //nos permite que no se actualice al ejecutar el evento
    event.preventDefault()
    notas()
})

guardarEstudianteBtn.addEventListener("click", function (event) {
    event.preventDefault()
    capturarEstudiante(array_estudiantes)
    // console.log(estanteria)
})

verLista.addEventListener("click", () => {
    mostrarEstudiantes(array_estudiantes)
})

ocultarLista.addEventListener("click", () => {
    estudiantesDiv.innerHTML = ""
})

selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
    switch (selectOrden.value) {
        case "1":
            ordenarMayorMenor(array_estudiantes)
            break
        case "2":
            ordenarMenorMayor(array_estudiantes)
            break
        case "3":
            ordenarAlfabeticamenteCurso(array_estudiantes)
            break
        case "4":
            ordenarAlfabeticamenteNombre(array_estudiantes)
        default:
            mostrarEstudiantes(array_estudiantes)
            break
    }
}
)

buscador.addEventListener("input", () => {
    buscarInfo(buscador.value, array_estudiantes)
})

buscarBtn.addEventListener("click", (event) => {
    event.preventDefault()
    buscarInfo(buscador.value, array_estudiantes)
})
