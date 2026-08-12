import { useForm } from "react-hook-form"
import { saveStudent } from "../api/estudiantes"
import Swal from "sweetalert2"

export default function RegistroEstudiante() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    /**
     * register: es el elemento que guarda lo que la persona ingrese en la entrada de dato
     * handleSubmit: es la accion donde capturamos los datos y hacemos algo con ellos
     * watch: elemento que nos sirve para probar si los datos llegan
     * formState: { errors }: elemento que nos va servir para personalizar errores
     * reset: es una funcion que limpia el formulario
     */

    //funcion para registrar los datos del estudiante
    // el parametro "estudiante" representa los datos del formulario y los guarda en un objeto
    const registrarEstudiante = async (estudiante) => {
        //console.log("Hola!, estamos en la funcion de registro")
        //console.log(estudiante)
        const respuesta = await saveStudent(estudiante)
        console.log(respuesta)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registrado correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        // limpiamos el formulario
        reset()

    }

    // ejemplo de como se utiliza el watch
    console.log(watch("nombre"))
    return (
        <section className="pagina">
            <section className="contenido contenido--angosto">        
                <h1 className="titulo">Registrar Nuevo Estudiante</h1>
                <p className="subtitulo">Completa la información para dar de alta al estudiante.</p>
        
                <form className="tarjeta-formulario" onSubmit={handleSubmit(registrarEstudiante)}>
                    <div className="seccion">
                        <span className="seccion__icono" aria-hidden="true">🧑‍🎓</span>
                        <h2 className="seccion__titulo">Datos del Estudiante</h2>
                    </div>
                    <hr className="separador" />
        
                    <div className="campo">
                        <label htmlFor="nombre" className="etiqueta">Nombre Completo <span className="requerido">*</span></label>
                        {/** validamos en el register que el campo es obligatorio */}
                        <input id="nombre" type="text" className="entrada" placeholder="Ej. Juan Pérez" {...register("nombre", { required: true })} />
                        {/** personalizando el error */}
                        {errors.nombre && <span>El campo es obligatorio</span>}
                        <span className="ayuda">Ingresa el nombre tal como figura en el documento oficial.</span>
                    </div>
        
                    <div className="fila">
                        <div className="campo">
                            <label htmlFor="edad" className="etiqueta">Edad <span className="requerido">*</span></label>
                            <input id="edad" type="number" className="entrada" placeholder="00" {...register("edad", { required: true })} />
                            {errors.edad && <span>El campo es obligatorio</span>}
                        </div>
            
                        <div className="campo">
                            <label htmlFor="correo" className="etiqueta">
                                Correo Electrónico <span className="requerido">*</span>
                            </label>
                            <input id="correo" type="email" className="entrada" placeholder="estudiante@ejemplo.com" {...register("correo", { required: true })} />
                            {errors.correo && <span>El campo es obligatorio</span>}
                        </div>
                    </div>
            
                    <hr className="separador" />
        
                    <div className="acciones">
                        <button type="submit" className="boton boton--primario">
                            <span aria-hidden="true">💾</span> Guardar Estudiante
                        </button>
                        <button type="button" className="boton boton--secundario">Cancelar</button>
                    </div>
                </form>
            </section>
        </section>
    )
}