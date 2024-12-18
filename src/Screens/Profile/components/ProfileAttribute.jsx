export const ProfileAttribute = ({ label, attribute, metric, loading }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-lg fade-in">
			<div className="flex flex-col space-y-2">
				<label className="text-sm font-medium text-gray-500 uppercase tracking-wide slide-in">
					{label}
				</label>
				{
					loading ?


						<div className="animate-pulse h-[14px] bg-gray-300 rounded-full w-36 mb-4"></div>

						:
						attribute ? (

							<p className="text-lg font-semibold text-gray-800 break-words">
								{`${attribute} ${metric ? metric : ''}`}
							</p>

						)
							:
							(

								<p className="text-lg font-semibold text-gray-800 break-words uppercase">
									Sin {label}
								</p>
							)


				}
			</div>
			<div className="mt-2 h-1 w-full bg-gradient-to-r from-primary to-primary/30 rounded-full"></div>
		</div>
	)
}
