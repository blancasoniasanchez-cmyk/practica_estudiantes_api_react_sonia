// import React from 'react'

import { useEffect, useState } from "react"
import { getStudentById } from "../api/estudiantes"
import { useParams } from "react-router"

export default function DetalleEstudiante() {
    // creando el estado donde se va guardar la informacion del estudiante
    const [estudiante, setEstudiante] = useState({})
    // capturando el id del estudiante que viene del parametro de la ruta
    const { estudianteId } = useParams();
    console.log(estudianteId)

    // metodo para obtener al estudiante
    const obtenerDetalleEstudiante = async () => {
        // el estudianteId viene del useParams
        const respuesta = await  getStudentById(estudianteId)
        // actualizando el estado con la informacion del estudiante encontrado
        setEstudiante(respuesta)
    }

    useEffect(() => {
        obtenerDetalleEstudiante()
    }, [])
    console.log(estudiante)

    return (

<section className="pagina">
            <section className="contenido contenido--angosto">        
                <h1 className="titulo">Detalle Estudiante</h1>

                <form className="tarjeta-formulario">
                    <div className="seccion">
                        <span className="seccion__icono" aria-hidden="true">📝</span>
                        <h2 className="seccion__titulo">Detalle</h2>
                    </div>
                    <hr className="separador" />
                    <div className="campo">
                    <label htmlFor="nombre" className="etiqueta">ID del estudiante: {estudiante.id}  <span className="requerido">
                        </span></label>
                    <p><n>Nombre:</n> {estudiante.nombre}</p>
                    <p>Edad: {estudiante.edad}</p>
                    <p>Correo: {estudiante.correo}</p>
                    </div>
        
                    <hr className="separador" />
        
                    <div className="acciones">
                
                    </div>
                </form>
            </section>
        </section>



    )
}