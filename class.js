// Proyecto estudiantes

// class constructora

class Estudiante {
    constructor(id, nombre, curso, cant_notas, array_notas, promedio) {
        this.id = id;
        this.nombre = nombre;
        this.curso = curso;
        this.cant_notas = cant_notas;
        this.array_notas = array_notas;
        this.promedio = promedio;
    }

    //metodos
    mostrarInfoEstudiante() {
        console.log(`Estudiante ${this.nombre} con id ${this.id} del curso ${this.curso} tiene un promedio de ${this.promedio} y sus notas son ${this.array_notas}`)
    }

}

//crear un array de objetos

let array_estudiantes = []

if (localStorage.getItem("estudiantes")) {
    //si existe la key estanteria en el storage, va a entrar aca
    // console.log("Ya existe la key estanteria")
    //cuando no es la primera vez, me traigo lo de storage
    array_estudiantes = JSON.parse(localStorage.getItem("estudiantes"))
} else {

    console.log(`ENTRA POR PRIMERA VEZ. SETEAMOS ARRAY`)
    localStorage.setItem("estudiantes", JSON.stringify(array_estudiantes))
}
