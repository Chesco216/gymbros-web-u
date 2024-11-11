import { useState } from 'react';
import { FilterIcon } from '../icons/FilterIcon';

export const FilterBy = ({ options, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleSelect = (event) => {
		const value = event.target.value;
		setSelectedOption(value);
		onSelect(value); // Pasar la selección al componente padre   
	};

	return (

		<div className="w-full flex justify-center ">
			<section className="px-2 py-4 flex gap-3 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
				<FilterIcon />
				<p className='text-lg font-bold sm:text-xl xl:text-2xl'>Filtrar por:</p>
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
		</div>

	);
};

