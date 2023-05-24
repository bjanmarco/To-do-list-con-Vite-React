// Se importa useState de react para los estados de la pagina
// En el archivo index.html se agregaron los scripts para poder utilizar bootstrap y agregarle estilo a la pagina
import { useState } from 'react'
import './App.css'

function App() {
	// Estado para almacenar la lista de tareas
	const [todos, setTodos] = useState([]);
	// Estado para almacenar el valor del campo de entrada de nueva tarea
	const [todo, setTodo] = useState("");
	// Estado para almacenar el ID de la tarea en edición
	const [todoEditing, setTodoEditing] = useState(null);
	// Estado para almacenar el texto de la tarea en edición
	const [editingText, setEditingText] = useState("");

	// Función que se ejecuta al enviar el formulario para agregar una nueva tarea
	function handleSubmit(e) {
		e.preventDefault();
		// Crear un nuevo objeto de tarea
		const newTodo = {
			id: new Date().getTime(), // Generar un ID único utilizando la marca de tiempo
			text: todo, // Tomar el valor del campo de entrada de nueva tarea
			completed: false, // Establecer la tarea como no completada por defecto
		};
		// Agregar la nueva tarea a la lista de tareas utilizando el estado anterior
		setTodos([...todos].concat(newTodo));
		// Limpiar el campo de entrada de nueva tarea
		setTodo("");
	}
	// Función para eliminar una tarea
	function deleteTodo(id) {
		// Filtrar la lista de tareas y mantener solo las que no coinciden con el ID proporcionado
		const updateTodos = [...todos].filter((todo) => todo.id !== id);
		// Actualizar la lista de tareas utilizando el estado anterior
		setTodos(updateTodos);
	}
	// Función para editar una tarea
	function editTodo(id) {
		// Mapear la lista de tareas y modificar la tarea correspondiente al ID proporcionado
		const updateTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				return {...todo, text: editingText };// Actualizar el texto de la tarea
			}
			return todo;
		});
		// Actualizar la lista de tareas utilizando el estado anterior
		setTodos(updateTodos);
		// Restablecer el estado de edición a null y limpiar el texto de edición
		setTodoEditing(null);
		setEditingText("");
	}

	// Componente principal de la aplicación donde se utiliza bootstrap para aplicar los estilos
	return (
		<div
			className="App d-flex container-fluid row justify-content-center mt-5"
			style={{
				borderRadius: "5%",
				border: "5px solid black",
				backgroundColor: "silver",
				width: "450px",
				margin: "auto",
			}}>
			<p>{"To do List"}</p>
			<form onSubmit={handleSubmit}>
				<input
					type={"text"}
					onChange={(e) => setTodo(e.target.value)}
					value={todo}
				/>
				<button className="btn btn-primary m-1" type="submit">
					Subir nota
				</button>
			</form>
			{todos.map((todo) => (
				<div className="todoKey" key={todo.id}>
					{todoEditing === todo.id ? (
						<input
							className="d-flex row"
							type={"text"}
							onChange={(e) => setEditingText(e.target.value)}
							value={editingText}
						/>
					) : (
						<div className="d-flex row input1 ">
							<div
								style={{ fontSize: "20px" }}
								className="todoText">
								{"- " + todo.text}
							</div>
						</div>
					)}
					<button
						className="m-1 btn btn-danger"
						onClick={() => deleteTodo(todo.id)}>
						Borrar
					</button>
					<button
						className="m-1 btn btn-success"
						onClick={() => setTodoEditing(todo.id)}>
						Editar Nota
					</button>
					<button
						className="m-1 btn btn-warning"
						onClick={() => editTodo(todo.id)}>
						Terminar Edicion
					</button>
				</div>
			))}
		</div>
	);
}

export default App
