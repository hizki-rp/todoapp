import "./App.css";
import { useState } from "react";
import supabase from "./supabase-client";

function App() {
	const [todoList, setTodoList] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const addTodo = async () => {
		const newTodoData = {
			name: newTodo,
			isCompleted: false,
		};
		//implement RLS in production, disable in dev
		const { data, error } = await supabase
			.from("Todolist")
			.insert([newTodoData])
			.single();

		if (error) {
			console.log("error adding todo", error);
		} else {
			setTodoList((prev) => [...prev, data]);
		}
	};

	return (
		<div>
			<h1>To do list</h1>
			<div>
				<input
					type="text"
					placeholder="New Todo..."
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<button onClick={addTodo}>Add todo Item</button>
			</div>

			<ul>
				<li></li>
			</ul>
		</div>
	);
}

export default App;
