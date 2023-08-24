import WaveConsole from './consoles/waveConsole';
import SignalConsole from './consoles/signalConsole';


interface Props {

	model: any;
	modelModes: any;
	paramsForModel: any;
	modeSelectionHandler: Function;
	controlsInputHandler: Function;
}

const Console = ( props: Props ) => {

	const { model, modelModes, paramsForModel, modeSelectionHandler, controlsInputHandler } = props;

	function selectConsole( CONSOLE_OPTION: string ) {

		switch( CONSOLE_OPTION ) {

			case 'WAVE': 
				return ( <WaveConsole  modes={modelModes} params={paramsForModel} modeSelectionHandler={modeSelectionHandler} controlsInputHandler={controlsInputHandler} /> );
				break;

			case 'SIGNAL': 
				return ( <SignalConsole  modes={modelModes} params={paramsForModel} modeSelectionHandler={modeSelectionHandler} controlsInputHandler={controlsInputHandler} /> );
				break;
		}
	};

	return (

	    <div>		
		
			{ selectConsole( model?.option ) }

	    </div>

	)
};

export default Console;
