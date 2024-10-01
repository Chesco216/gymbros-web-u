import { useState } from 'react';

export const FilterBy = ({ options, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleSelect = (event) => {
		const value = event.target.value;
		setSelectedOption(value);
		onSelect(value); // Pasar la selección al componente padre   
	};

	return (

		<section className="px-2 py-2 flex items-center gap-3">
			<p className='text-lg font-bold sm:text-xl xl:text-2xl'>Filtrar por</p>
			<select
				id="filter-dropdown"
				value={selectedOption}
				onChange={handleSelect}
				aria-label="Filter by"
				className="block ml-auto px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
			>
				{options.map((option, index) => (
					<option
						key={index}
						value={option.value}
						className="text-gray-900 bg-white hover:bg-gray-100"
					>
						{option.label}
					</option>
				))}
			</select>
		</section>

	);
};

