export const ProfileAttribute = ({ label, attribute, metric }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg fade-in">
			<div className="flex flex-col space-y-2">
				<label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
					{label}
				</label>
				{
					attribute ?

						<p className="text-lg font-semibold text-gray-800 break-words">
							{`${attribute} ${metric ? metric : ''}`}
						</p>
						:
						<div className="animate-pulse h-2.5 bg-gray-300 rounded-full w-36 mb-4"></div>

				}
			</div>
			<div className="mt-2 h-1 w-full bg-gradient-to-r from-primary to-pink-200 rounded-full"></div>
		</div>
	)
}