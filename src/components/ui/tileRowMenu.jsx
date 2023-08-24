import ModeSelector from './modeSelector';



const TileRowMenu = ({

	options,
	onSelect

}) => {

	function handleValueChange(e) {

		const _options = options.slice();
		_options.map((item) => { 
			
			if (item.option === e.target.value) { 

				item.checked = true;

			} else {

				item.checked = false;
			} 

			return item;
		});
		
		onSelect(_options);
	};


	return (<div className={'w-full grid grid-rows-1 grid-cols-4'}>
		
		{options.map((item) => {


			return (

				<ModeSelector 

					option={item.option}
					icon={item.icon}
					label={item.label}
					onDefaultChecked={item.default}
					onValueChangeHandler={handleValueChange}

				/>
			)
		})}

	</div>)

};

export default TileRowMenu;