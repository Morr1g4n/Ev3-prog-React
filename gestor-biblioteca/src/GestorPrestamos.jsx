import { useState,useRef,useEffect } from "react";
import {v4 as uuid} from 'uuid'; /*Instalar con npm i uuid*/

const KEY="lista-prestamos" /*array en el localstorage*/

function GestorPrestamos(){
    const [prestamos,setPrestamos]=useState(
        JSON.parse(localStorage.getItem(KEY))?JSON.parse(localStorage.getItem(KEY)):[]
    );

    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(prestamos));
        },[prestamos])

    const nombreRef=useRef();
    const rutRef=useRef(); {/* Para el rut para ocupar una expresion regular, en el input type del rut luego del text poner esto: pattern="[0-9]{7,8}-[0-9kK]*/}
    const libroRef=useRef();
    const fechaRef=useRef();

    const agregarTarea=()=>{
        const nombre=nombreRef.current.value;
        const id=uuid();
        console.log(id);
        {/*completar*/}
    }
    return (
        <>
            <h1>Gestor Biblioteca</h1>
            <form>
                <div class="form-group">
                    <label for="InputNombre"> Nombre</label>
                    <input ref={nombreRef} placeholder="Nombre" className="form-control form-control-lg" type="text" minLength={"4"} maxLength={"40"} required name="" id="" ></input>
                </div>
                <div class="form-group">
                    <label for="InputLibro"> Libro</label>
                    <input ref={libroRef} placeholder="Libro" className="form-control form-control-lg" type="text"  minLength={"4"} maxLength={"40"} required name="" id="" ></input>
                </div>
                <button type="submit" class="btn btn-primary">Ingresar</button>
            </form>    
        </>
    );
}
export default GestorPrestamos;