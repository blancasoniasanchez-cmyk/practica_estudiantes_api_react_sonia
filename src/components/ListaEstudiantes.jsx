 import { Link } from "react-router";
 import { getStudents, updateemail } from "../api/estudiantes";
 import { useEffect, useState } from "react";
 import Swal from "sweetalert2";
 
 export default function ListaEstudiantes() {
     const [listaEstudiantes, setListaEstudiantes] = useState([]);
 
     const obtenerDetalleEstudiantes = async () => {
         const respuestaData = await getStudents();
         setListaEstudiantes(respuestaData);
     };
 
     useEffect(() => {
         obtenerDetalleEstudiantes();
     }, []);
 
     // ✏️ / ➕ Función para agregar o actualizar correo
     
     
 
 
     
 const manejarGuardarCorreo = async (estudiante) => {
     const tieneCorreo = Boolean(estudiante.correo);
     const accionTexto = tieneCorreo ? 'Actualizar' : 'Agregar';
 
     // 1. Identificar el ID del estudiante
     const idEstudiante = estudiante.id || estudiante._id || estudiante.id_estudiante;
 
     if (!idEstudiante) {
         Swal.fire('Error', 'No se encontró el ID del estudiante', 'error');
         console.error("Estudiante sin ID válido:", estudiante);
         return;
     }
 
     const { value: nuevo_correo } = await Swal.fire({
         title: `${accionTexto} Correo`,
         text: `Ingrese el correo para ${estudiante.nombre}`,
         input: 'email',
         inputValue: estudiante.correo || '',
         showCancelButton: true,
         confirmButtonText: 'Guardar',
         cancelButtonText: 'Cancelar',
         confirmButtonColor: '#0f2347',
         inputValidator: (value) => {
             if (!value) {
                 return '¡El correo es obligatorio!';
             }
         }
     });
 
     if (nuevo_correo && nuevo_correo !== estudiante.correo) {
         try {
             // 2. ✅ Pasamos el ID y la CADENA de texto del correo directamente
             await updateemail(idEstudiante, nuevo_correo); 
 console.log("ID Estudiante:", idEstudiante);
 
 console.log("Nuevo Correo:", nuevo_correo);
 
             Swal.fire({
                 icon: 'success',
                 title: `¡Correo ${tieneCorreo ? 'actualizado' : 'agregado'}!`,
                 text: `El correo ha sido registrado correctamente.`,
                 timer: 2000,
                 showConfirmButton: false
             });
 
             // 3. Volvemos a traer los datos para refrescar la tabla en pantalla
             obtenerDetalleEstudiantes();
         } catch (error) {
             console.error("Error al ejecutar updateemail:", error);
             Swal.fire('Error', `No se pudo ${accionTexto.toLowerCase()} el correo. Revisa la consola.`, 'error');
         }
     }
 };
 
 
 
     
 
 
     return (
         <section className="pagina">
             <section className="contenido">
                 <h1 className="titulo">Listado de Alumnos</h1>
                 <p className="subtitulo">Visualiza y administra la base de datos de estudiantes matriculados.</p>
         
                 <div className="tarjeta">
                     <div className="barra-superior">
                         <div className="buscador">
                             <span className="buscador__icono" aria-hidden="true">🔍</span>
                             <input type="text" placeholder="Buscar por nombre, correo o ID..." className="buscador__input" />
                         </div>
                         <Link to="/estudiantes/registro" className="boton boton--primario">
                             <span aria-hidden="true">+</span> Agregar Estudiante
                         </Link>
                     </div>
             
                     <table className="tabla">
                         <thead>
                             <tr>
                                 <th>Nombre</th>
                                 <th>Edad</th>
                                 <th>Correo</th>
                                 <th className="th-acciones">Acciones</th>
                             </tr>
                         </thead>
                         <tbody>
                             {
                                 listaEstudiantes.map((estudiante) => {
                                     return (
                                         <tr key={estudiante.id || estudiante._id}>
                                             <td>{estudiante.nombre}</td>
                                             <td>{estudiante.edad}</td>
                                             <td className="celda-correo">
                                                 {estudiante.correo ? estudiante.correo : <em style={{ opacity: 0.6 }}>Sin correo</em>}
                                             </td>
                                             <td className="td-acciones">
                                                 {/* ✏️ / ➕ Botón Agregar o Editar Correo */}
                                                 <button 
                                                     onClick={() => manejarGuardarCorreo(estudiante)} 
                                                     className="boton-editar-correo"
                                                     title={estudiante.correo ? "Editar correo" : "Agregar correo"}
                                                 >
                                                     {estudiante.correo ? "✏️ Correo" : "➕ Correo"}
                                                 </button>
 
                                                 <Link to={`/estudiantes/detalle/${estudiante.id || estudiante._id}`} className="enlace-detalle">Ver detalle ›</Link>
                                             </td>
                                         </tr>
                                     )
                                 })
                             }
                         </tbody>
                     </table>
             
                     <div className="pie-tabla">
                         <span className="pie-tabla__info">Mostrando {listaEstudiantes.length} estudiantes</span>
                         <div className="paginacion">
                             <button className="paginacion__boton" aria-label="Página anterior">‹</button>
                             <button className="paginacion__boton" aria-label="Página siguiente">›</button>
                         </div>
                     </div>
                 </div>
             </section>
         </section>
     );
 }