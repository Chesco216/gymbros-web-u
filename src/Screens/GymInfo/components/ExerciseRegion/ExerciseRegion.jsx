export const ExerciseRegion = ({ region, exercises }) => {
	return (
		<div className="gap-2">
			<p className="text-base font-bold leading-none tracking-tight text-gray-900">{region}</p>
			<ul className="list-disc flex flex-col px-5 text-gray-600 gap-2">
				{
					exercises.map((exercise) =>
						<li className="capitalize" key={exercise}>{exercise}</li>
					)
				}
			</ul>
		</div>

	)
}
