import React, { useEffect, useState } from "react";
//create your first component
const TodoList = () => {
	// Variable task almacena la informacion
	const [task, setTask] = useState([]);
	// Variable  text muestra la  informacion por pantalla
	const [text, setText] = useState("");
	const handleChange = (event) => {
		event.preventDefault();
		setText(event.target.value);
	};
	// Funcion para eliminar la lista de tareas
	const Delete = (item) => {
		setTask(task.filter((deleteMe) => item != deleteMe));
		fetch("https://assets.breatheco.de/apis/fake/todos/user/chusgf", {
			method: "PUT",
			body: JSON.stringify(task.filter((deleteMe) => item != deleteMe)),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};
	// Funcion para guardar la tarea
	const Save = () => {
		if (!task.map((x) => x.label).includes(text) && text.trim() != "") {
			setTask([...task, { label: text, done: false }]);
			//  Retorna la API con las tareas almacenadas  despues de actualizar la pagina
			fetch("https://assets.breatheco.de/apis/fake/todos/user/chusgf", {
				method: "PUT",
				body: JSON.stringify([...task, { label: text, done: false }]),
				headers: {
					"Content-Type": "application/json",
				},
			});
			setText("");
		}
	};
	// Consultar la API
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/chusgf")
			.then((resp) => resp.json())
			.then((result) => {
				setTask(result);
			});
	}, []);
	return (
		<div>
			<div className="d-flex justify-content-center mb-3 ">
				<input
					value={text}
					className="newTask me-1"
					type="text"
					onChange={handleChange}
				/>
				<button
					className="button btn btn-success"
					onClick={Save}
					value={text}>
					Button
				</button>
			</div>

			<div>
				<ul className="list-group">
					{task.length > 0 &&
						task.map((value, index) => (
							<li
								key={index}
								className=" list-group-item mb-1 p-1 border border-dark d-flex justify-content-between">
								{value.label}
								<button
									className="btn btn-outline-danger btn-sm DelItem"
									onClick={() => Delete(value)}>
									❌
								</button>
							</li>
						))}
				</ul>
				<div>
					<span className="badge bg-light text-dark mb-2">
						Total Tasks: {task.length}
					</span>
				</div>
			</div>
		</div>
	);
};
export default TodoList;
