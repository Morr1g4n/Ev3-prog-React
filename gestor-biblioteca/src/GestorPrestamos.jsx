import { useState,useRef,useEffect } from "react";
import {v4 as uuid} from 'uuid'; /*Instalar con npm i uuid*/
import './GestorPrestamos.css'
import PrestamosIn from "./GPrestamosIn.jsx"; /*Componente Hijo */
const KEY="lista-prestamos" /*array en el localstorage*/

function GestorPrestamos(){
    const [prestamos,setPrestamos]=useState(
        JSON.parse(localStorage.getItem(KEY))?JSON.parse(localStorage.getItem(KEY)):[]
    );
    
    const [idEditando, setIdEditando] = useState(null);

    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(prestamos));
        },[prestamos])
    
    const formRef=useRef();
    const nombreRef=useRef();
    const rutRef=useRef(); 
    const libroRef=useRef();
    const fechaRef=useRef();

    const agregarPrestamo = (e) => {
    e.preventDefault(); 
    if (formRef.current.checkValidity()) {
        const nuevoPrestamo = {
            id: uuid(),
            nombre: nombreRef.current.value,
            rut: rutRef.current.value,
            libro: libroRef.current.value,
            fecha: fechaRef.current.value
        };

        setPrestamos([...prestamos, nuevoPrestamo]);
        formRef.current.reset();
    }
}; 


const eliminarPrestamo = (id) => {
    const listaActualizada = prestamos.filter(prestamo => prestamo.id !== id);
    setPrestamos(listaActualizada);
};

const cargarPrestamoAEditar = (prestamo) => {
        setIdEditando(prestamo.id);
        nombreRef.current.value = prestamo.nombre;
        rutRef.current.value = prestamo.rut;
        libroRef.current.value = prestamo.libro;
        fechaRef.current.value = prestamo.fecha;
    };

    const actualizarPrestamo = (e) => {
        e.preventDefault(); 
        if (formRef.current.checkValidity()) {
            const listaModificada = prestamos.map((prestamo) => {
                if (prestamo.id === idEditando) {
                    return {
                        id: idEditando, 
                        nombre: nombreRef.current.value,
                        rut: rutRef.current.value,
                        libro: libroRef.current.value,
                        fecha: fechaRef.current.value
                    };
                }
                return prestamo; 
            });

            setPrestamos(listaModificada);
            setIdEditando(null); 
            formRef.current.reset(); 
        }
    };


    const cancelarEdicion = () => {
        setIdEditando(null);
        formRef.current.reset();
    };


    return (
        <>
            <h1 className="text-center my-4 titulo-biblioteca">Gestor Biblioteca</h1>
            <form ref={formRef} onSubmit={idEditando ? actualizarPrestamo : agregarPrestamo}>
                {/* Contenedor de formulario  Nombre*/}
                <div className="form-group">
                    <label for="InputNombre">Nombre</label>
                    <input 
                        ref={nombreRef} 
                        placeholder="Nombre" 
                        className="form-control" 
                        type="text"  minLength="4" maxLength="40" required 
                        name="" id="" 
                    />
                </div>
                
                {/* Contenedor de formulario Rut*/}
                <div className="form-group">
                    <label for="InputRUT">RUT</label>
                    <input
                        ref= {rutRef}
                        placeholder="EJ: 12345678-9"
                        className= "form-control"
                        type="text"  pattern="^[0-9]{7,8}-[0-9kK]$" required
                        name ="" id=""
                    />
                </div>

                {/* Contenedor de formulario Libro*/}
                <div className="form-group">
                    <label for="InputLibro">Libro</label>
                    <input 
                        ref={libroRef} 
                        placeholder="Libro" 
                        className="form-control" 
                        type="text"  minLength="4" maxLength="40" required 
                        name="" id="" 
                    />
                </div>

                {/* Contenedor de formulario Fecha*/}
                <div className="form-group">
                    <label for="InputFecha">Fecha</label>
                    <input
                        ref={fechaRef}
                        placeholder="DD/MM/AAAA"
                        className="form-control"
                        type="text" required
                        name="" id=""
                    />
                </div>

                {/* Contenedor de Botones para editar y eliminar*/}
                <div className="mt-3">
                    <button 
                        type="submit" 
                        className={idEditando ? "btn btn-success" : "btn btn-primary"}
                    >
                        {idEditando ? "Guardar Cambios" : "Ingresar"}
                    </button>
                    
                    {/* Botón para cancelar la edición, solo aparece si estamos editando*/}
                    {idEditando && (
                        <button 
                            type="button" 
                            className="btn btn-secondary ms-2" 
                            onClick={cancelarEdicion}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

                <div className="table-responsive mt-4">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>RUT</th>
                                <th>Libro</th>
                                <th>Fecha</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamos.map((prestamo) => (
                                <PrestamosIn 
                                    key={prestamo.id} 
                                    prestamo={prestamo} 
                                    onEditar={cargarPrestamoAEditar} 
                                    onEliminar={eliminarPrestamo} 
                                />
                            ))}
                            {prestamos.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        No hay prestamos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
        </>
    );
};
export default GestorPrestamos;