import React from "react";
import TodoList from "./todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="container mt-5 todo mx-auto">
			<div className="row">
				<p className="title display-2 text-center mt-2 fst-italic">
					Todo list
				</p>
				<div className="col-12">
					<TodoList />
				</div>
			</div>
		</div>
	);
};
export default Home;
