import { useEffect, useState } from 'react';
import styles from './AddUserModal.module.css';

const info = {
	name: '',
	ci: '',
	plan: '',
}

export const AddUserModal = ({ isOpen, setIsOpen, userInfo = info, mod }) => {
	const [name, setName] = useState(userInfo.name);
	const [ci, setCI] = useState(userInfo.ci);
	const [plan, setPlan] = useState(userInfo.plan);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}

		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [isOpen]);

	const handleAddUser = () => {
		console.log('user added');
		setIsOpen(false);
	};

	const handleCancelModal = () => {
		console.log('modal canceled');
		setName('');
		setCI('');
		setPlan('');
		setIsOpen(false);
	};

	if (!isOpen) return null;

	return (
		<div className="relative z-10" aria-labelledby="cu-users" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-black/50 bg-opacity-90 transition-opacity" aria-hidden="true"></div>

			<div id="cu-users" className="fixed inset-0 z-10 w-screen">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-5 pt-6 sm:p-7 sm:pb-6">
							<h3 className="slide-in text-xl font-semibold leading-6 text-gray-900" id="modal-title">{mod} usuario</h3>
							<p className="slide-in text-md text-gray-500 my-3">
								Estás a punto de <strong className="underline">{mod}</strong> un usuario. Ingresa los campos correspondientes para dicha acción.
							</p>

							<form id='myform' onSubmit={handleAddUser} className="flex flex-col justify-center px-auto gap-1">
								<label className="slide-in text-md text-gray-900">Nombre:</label>
								<input
									type='text'
									name='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder='Nombre'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
								<label className="slide-in text-md text-gray-900">Carnet de Identidad:</label>
								<input
									type='text'
									name='ci'
									value={ci}
									onChange={(e) => setCI(e.target.value)}
									placeholder='Carnet de identidad'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
								<label className="slide-in text-md text-gray-900">Plan del gimnasio:</label>
								<input
									type='text'
									name='plan'
									value={plan}
									onChange={(e) => setPlan(e.target.value)}
									placeholder='Plan del gimnasio'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
							</form>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
							<button
								data-modal-hide="cu-users"
								type="button"
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto fade-in"
								onClick={handleCancelModal}
							>
								Cancelar
							</button>
							<button
								form="myform"
								type="submit"
								className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto fade-in"
							>
								{mod} usuario
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
