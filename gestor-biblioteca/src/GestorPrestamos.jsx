import { useState,useRef,useEffect } from "react";
import {v4 as uuid} from 'uuid'; /*Instalar con npm i uuid*/
import './GestorPrestamos.css'
const KEY="lista-prestamos" /*array en el localstorage*/

function GestorPrestamos(){
    const [prestamos,setPrestamos]=useState(
        JSON.parse(localStorage.getItem(KEY))?JSON.parse(localStorage.getItem(KEY)):[]
    );

    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(prestamos));
        },[prestamos])
    
    const formRef=useRef();
    const nombreRef=useRef();
    const rutRef=useRef(); {/* Para el rut para ocupar una expresion regular, en el input type del rut luego del text poner esto: pattern="[0-9]{7,8}-[0-9kK]*/}
    const libroRef=useRef();
    const fechaRef=useRef();

    const agregarPrestamo=(e)=>{
        e.preventDefault(); {/*evita que la página se recargue al enviar el formulario*/}
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
    return (
        <>
            <h1>Gestor Biblioteca</h1>
            <form ref={formRef} onSubmit={agregarPrestamo}>
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
                        type="text"  pattern="^[0-9]{7,8}-[0-9kK]$"
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
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
                <div className="table-responsive mt-4">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>RUT</th>
                                <th>Libro</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamos.map((prestamo) => (
                                <tr key={prestamo.id}>
                                    <td>{prestamo.nombre}</td>
                                    <td>{prestamo.rut}</td>
                                    <td>{prestamo.libro}</td>
                                    <td>{prestamo.fecha}</td>
                                </tr>
                            ))}
                            {prestamos.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">
                                        No hay préstamos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
        </>
    );
}
export default GestorPrestamos;