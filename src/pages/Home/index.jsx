// Reack Hooks
import { useEffect, useState, useRef } from "react";
import "./style.css";
import TrashImg from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
	const [users, setUsers] = useState([]);

	// Pega os dados inseridos nos inputs
	const inputName = useRef();
	const inputAge = useRef();
	const inputEmail = useRef();

	// Lista os usuários
	async function getUsers() {
		const usersFromApi = await api.get("/usuarios");
		setUsers(usersFromApi.data);
	}

	async function createUsers() {
		await api.post("/usuarios", {
			name: inputName.current.value,
			age: inputAge.current.value,
			email: inputEmail.current.value,
		});
		// atualiza os usuários
		getUsers();
	}

	async function deleteUsers(id) {
		await api.delete(`/usuarios/${id}`);
		getUsers();
	}

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className="container">
			<form>
				<h1>Cadastro de Usários</h1>

				<input
					name="nome"
					placeholder="Nome"
					type="text"
					ref={inputName}
				/>
				<input
					name="idade"
					placeholder="Idade"
					type="number"
					ref={inputAge}
				/>
				<input
					name="email"
					placeholder="exemplo@email.com"
					type="email"
					ref={inputEmail}
				/>

				<button
					type="button"
					onClick={createUsers}>
					Cadastrar
				</button>
			</form>

			{/* Renderiza cada card */}
			{users.map((user) => (
				<div
					key={user.id}
					className="card">
					<div>
						<p>
							Nome: <span>{user.name}</span>
						</p>
						<p>
							Idade: <span>{user.age}</span>
						</p>
						<p>
							Email: <span>{user.email}</span>
						</p>
					</div>
					<button onClick={() => deleteUsers(user.id)}>
						<img
							src={TrashImg}
							alt="Lixeira vermelha"
						/>
					</button>
				</div>
			))}
		</div>
	);
}

export default Home;
