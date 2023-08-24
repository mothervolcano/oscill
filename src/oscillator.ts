import { Layer } from 'paper';
import { paperScope } from './components/paperStage';

import Wave from './oscill-modules/models/wave';
import Signal from './oscill-modules/models/signal';



let view: any;
let origin: any;
let layer: any;

let signal: any;
let model: any;


export function reset() {

  paperScope.project.clear();

  view = paperScope.project.view
  layer = new Layer();

}


// Note: initializes the requested model and creates a state and or context that is used by the other methods: generate, regenerate and redraw;

export function init(
  
  selectedModel: string

) {
  
  origin = view.center;

  switch( selectedModel ) {

    case 'WAVE': 

      model = Wave;
      break;

    case 'SIGNAL':
      
      model = Signal;
      break;
  }
};



export function generate(

  mode: string,
  params: any

) {

  const { freqCtrl, ampCtrl, fadeInCtrl, fadeOutCtrl } = params;

  console.log(`GENERATING SIGNAL`);

  origin = view.center;


  signal = new model( origin, 800 );
  
  signal.configure( mode, fadeInCtrl, fadeOutCtrl );
  // signal.generate( freqCtrl, ampCtrl );

  // layer.position = origin;
  
}


// Note: modifies the model based on user or external input;

export function redraw(

    params: any,
    scaleCtrl: number,

  ) {

    const { freqCtrl, ampCtrl, fadeInCtrl, fadeOutCtrl } = params;

    // signal.configure( mode, fadeInCtrl, fadeOutCtrl );
    signal.generate( freqCtrl, ampCtrl );

}



// Note: regenerates the model that is currently selected with different initial parameters or configuration and updates the stage.

export function regenerate(

    params: any

  ) {

      const { iterationsNum } = params;

      console.log(`REGENERATING OSCILLATOR... (to be implemented) }`);
}


