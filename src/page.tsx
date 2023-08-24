
import { useMediaQuery } from 'react-responsive';

import { useState, useEffect } from 'react';

import { Model, Param, ParamSet, Mode, ModeSet } from 'oscill';

import Stage from './components/stage';
import Console from './components/console';

import { reset, init, generate, regenerate, redraw } from './oscillator';



const Page = () => {

	

	const waveParams: ParamSet = [

		{ id:'mkp5', 	name: 'freqCtrl',			value: 25, 		range: [1,100], 	step: 1, 		label: "Freq", },
		{ id:'mkp3', 	name: 'ampCtrl',			value: 50, 		range: [1,100], 	step: 1, 		label: "Amp", },
		{ id:'mkp4', 	name: 'fadeInCtrl',			value: 15, 		range: [0,30], 		step: 0.1, 		label: "P5", },
		{ id:'mkp6', 	name: 'fadeOutCtrl',		value: 1, 		range: [0,2], 		step: 0.01, 	label: "P6", },
		{ id:'mkp7', 	name: 'empty',				value: 1, 		range: [0,2], 		step: 0.01, 	label: "P7", },
	];


	const signalParams: ParamSet = [

		{ id:'sig5', 	name: 'freqCtrl',			value: 25, 		range: [1,100], 	step: 1, 		label: "Freq", },
		{ id:'sig3', 	name: 'ampCtrl',			value: 200, 	range: [1,500], 	step: 1, 		label: "Amp", },
		{ id:'sig4', 	name: 'fadeInCtrl',			value: 15, 		range: [0,30], 		step: 0.1, 		label: "P5", },
		{ id:'sig6', 	name: 'fadeOutCtrl',		value: 1, 		range: [0,2], 		step: 0.01, 	label: "P6", },
		{ id:'sig7', 	name: 'empty',				value: 1, 		range: [0,2], 		step: 0.01, 	label: "P7", },
	];


	const signalModes: ModeSet = [

		{ id:'mdsin', 	option: 'SINE',			icon:'WAVE_SINE',			default: true,			checked: true },
		{ id:'mdtri', 	option: 'TRIANGLE',		icon:'WAVE_TRIANGLE',		default: false,			checked: false },
		{ id:'mdsqr', 	option: 'SQUARE',		icon:'WAVE_SQUARE',			default: false,			checked: false },
		{ id:'mdsaw', 	option: 'SAWTOOTH',		icon:'WAVE_SAWTOOTH',		default: false,			checked: false },
	];


	// ----------------------------------------------------------------------------

	const models: Model[] = [

		{ option: "WAVE", 		label: "Wave", 		icon: "TEST", 		modes: signalModes,			console: "PeanoConsole", 		params: waveParams, 		default: false, checked: false },
		{ option: "SIGNAL", 	label: "Signal", 	icon: "TEST", 		modes: signalModes,			console: 'HilbertConsole', 		params: signalParams, 		default: false, checked: false },
	];


	// ----------------------------------------------------------------------------


	const [ isDesktopOrLaptop, setIsDesktopOrLaptop ] = useState(false);
	const [ isPaperLoaded, setIsPaperLoaded ] = useState(false);

	const [ model, setModel ] = useState< Model | null >( null );
	const [ mode, setMode ] = useState< Mode | null >( null );

	const [ paramsForModel, setParamsForModel ] = useState< ParamSet | null  >( null );
	const [ modelModes, setModelModes ] = useState< ModeSet | null  >( null );

	const [ scaleCtrl, setScaleCtrl ] = useState(3);


	const _isDesktopOrLaptop = useMediaQuery({
    	
    	query: '(min-width: 1224px)'
  	});


	//-----------------------------------------------------------------------------
	// HOOKS


	useEffect( () => {

		setIsDesktopOrLaptop( _isDesktopOrLaptop );

	}, [] );



	useEffect( () => {

		if ( isPaperLoaded ) {


			const _modelParams: any = {};
				
			Array.from( model!.params.values() ).forEach( (p: any ) => {

				_modelParams[p.name] = p.value;
			});

			reset();
			generate( mode!.option, _modelParams );
			redraw( _modelParams, scaleCtrl );

		}

	}, [ mode ] );
	

	useEffect( () => { 

		if ( isPaperLoaded ) {


			if ( model === null ) {

				// TODO: error message

			} else if ( model ) {

				const _modelParams: any = {};
				
				Array.from( model.params.values() ).forEach( (p: any ) => {

					_modelParams[p.name] = p.value;
				});

				reset();
				redraw(
				       _modelParams, 
				       scaleCtrl );
			}
		}

	}, [ paramsForModel ] );


	//-----------------------------------------------------------------------------
	// HANDLERS


	function handleGenerateAction( selectedModel: any ) {

		if ( isPaperLoaded ) {

			const _modelParams: any = {};

			Array.from(selectedModel?.params.values() || []).forEach( (p: any) => {

				_modelParams[p.name] = p.value; 

			});

			const _defaultMode = selectedModel.modes.find( ( mode: Mode ) => mode.default === true );
			
			reset();
			init( selectedModel.option )
			generate( _defaultMode.option, _modelParams );
			// redraw( _defaultMode.option, 
			//        _modelParams, 
			//        scaleCtrl );

			setModel( selectedModel );
			setModelModes( selectedModel.modes );
			setParamsForModel( selectedModel.params );

		} else {

		}
	};


	function handleRegenerateAction( selectedModel: any ) {

		if ( isPaperLoaded ) {
			
			console.log(`ready to regenerate ${ selectedModel.label }`);

			const _modelParams: any = {};


			Array.from(selectedModel?.params.values() || []).forEach( (p: any) => {

				_modelParams[p.name] = p.value; 

			});


			reset();
			regenerate( _modelParams );
			redraw( 
			       _modelParams, 
			       scaleCtrl );


		} else {

		}
	};


	function handleModeSelectionInputForModel( updatedModelModes: any ) {

		setMode( updatedModelModes.find( (mode: Mode) => mode.checked == true )  );
		setModelModes( updatedModelModes );
	}


	function handleParamCtrlInputForModel( updatedParams: any ) {

		setParamsForModel( updatedParams );
	};



	return (
        
        <div className={`relative w-3/4 h-[80vh] m-5 border border-slate-900`}>

		  	
		  	<div className={`w-full h-full`}>

				{ isDesktopOrLaptop && (

                    <Stage

                    	onPaperLoad={setIsPaperLoaded}
    					options={models}
    					onGenerate={handleGenerateAction}
    					onRegenerate={handleRegenerateAction}
                    />

				)}

		    </div>


		    <div className={`absolute ${ isDesktopOrLaptop ? "top-0" : "top-0" } left-0 ${ isDesktopOrLaptop ? "max-w-[250px]" : "w-full" } ${ isDesktopOrLaptop ? "h-fit" : "h-[70vh]" } m-5 border border-slate-900`} > 

		    	<Console

		    		model={model}
		    		modelModes={modelModes}
		    		paramsForModel={paramsForModel}
		    		modeSelectionHandler={handleModeSelectionInputForModel}
		    		controlsInputHandler={handleParamCtrlInputForModel}
	
		    	/>

	    		{ !isDesktopOrLaptop && (


    				<Stage 

		    			onPaperLoad={setIsPaperLoaded}
		    			options={models}
		    			onGenerate={handleGenerateAction}
		    			onRegenerate={handleRegenerateAction}
		    		/>

	    		)}

		    </div>

		</div>

	)

}

export default Page;


