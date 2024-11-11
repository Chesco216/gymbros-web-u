export const ProfileAttribute = ({ label, attribute }) => {
	return (
		<div className="flex gap-2">
			<label htmlFor="">
				{label}:
			</label>
			<p>{attribute}</p>

		</div>
	)
}
