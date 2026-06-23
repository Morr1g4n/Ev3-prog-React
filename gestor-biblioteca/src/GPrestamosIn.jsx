function PrestamosIn({ prestamo, onEditar, onEliminar }) {
    return (
        <tr>
            <td>{prestamo.nombre}</td>
            <td>{prestamo.rut}</td>
            <td>{prestamo.libro}</td>
            <td>{prestamo.fecha}</td>
            <td className="text-center">
                {/* Al hacer clic, ejecuta el callback onEditar pasándole los datos de este préstamo */}
                <button 
                    type="button" 
                    className="btn btn-warning btn-sm me-2" 
                    onClick={() => onEditar(prestamo)}
                >
                    Editar
                </button>
                {/* Al hacer clic, ejecuta el callback onEliminar pasándole el ID */}
                <button 
                    type="button" 
                    className="btn btn-danger btn-sm" 
                    onClick={() => onEliminar(prestamo.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default PrestamosIn;