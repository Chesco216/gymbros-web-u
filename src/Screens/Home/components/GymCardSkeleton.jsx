export const GymCardSkeleton = () => {
	return (
		<div
			className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-100 ease-in-out h-[530px] flex flex-col animate-pulse border-2 border-gray-300"
		>
			<div className="flex relative bg-gray-400/70 h-48 animate-pulse items-center justify-center">
				<svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
					<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
				</svg>
			</div>
			<div className="p-4 flex-grow flex flex-col space-y-4">
				<div className="h-7 bg-gray-200 rounded-full w-5/6"></div>
				<div className="h-7 bg-gray-200 rounded-full w-1/6"></div>
				<div className="h-7 bg-gray-200 rounded-full w-5/6"></div>
				<div className="flex gap-3">
					<div className="h-5 bg-gray-200 rounded-full w-1/6"></div>
					<div className="h-5 bg-gray-200 rounded-full w-1/6"></div>
					<div className="h-5 bg-gray-200 rounded-full w-1/6"></div>

				</div>
				<div className="h-2/3 rounded-full w-full"></div>
				<div className="flex mt-auto">
					<div className="mx-auto flex justify-center items-center h-9 bg-gray-200 w-11/12 rounded"></div>
				</div>
			</div>
		</div>
	);
};
