import { Point, Path } from 'paper';

import SpinalField from '../attractors/spinalField';
import Spine from '../attractors/spine';

import { curve, pull } from '../../lib/topo/tools/stitcher';

import { markPoint, traceSegment, genRandomDec, isEven } from '../../lib/topo/utils/helpers';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';



class Signal {
	
	
	private _baseline: any;
	private _style: any;

	private _freq: number = 0;
	private _amp: number = 0;

	private fadeInFactor: number = 0;
	private fadeOutFactor: number = 0;

	private _path: any;

	private mode: string;

	private MODES: any = {

		SINE: "SINE",
		TRIANGLE: "TRIANGLE",
		SQUARE: "SQUARE",
		SAWTOOTH: "SAWTOOTH"
	}

	constructor( origin: any, length: number, style?: any ) {

		this.mode = '';

		this._style = style || {

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2
		}

		this._baseline = new SpinalField( origin, length );
	};


	public configure( mode: string, fadeInFactor: number, fadeOutFactor: number ) {

		this.mode = this.MODES[mode];
		this.fadeInFactor = 1 - fadeInFactor;
		this.fadeOutFactor = 1 - fadeOutFactor;
	};


	public generate( frequency: number, amplitude: number, phase: number ) {


		this._baseline.reset();
		this._baseline.clear();

		this._freq = frequency;
		this._amp = amplitude;

		const cycle = this._baseline.attractor.length / this._freq;

		const _handleLength = this.mode === this.MODES.SINE ? cycle/4 : 0;

		const handleLength = _handleLength * 5/3;

		this._path = new Path({

			strokeColor: this._style.strokeColor,
			strokeWidth: this._style.strokeWidth

		});


		// -------------------------------------------------------
		// 1
		
		let ampScaleFactor = 1;

		const fadeInStep = Math.max( 0, this.fadeInFactor / ( this._freq - ( this._freq * this.fadeInFactor ) ) );
		// const fadeInStep = Math.max( 0, this.fadeInFactor / this._freq * this.fadeInFactor );
		// const fadeOutStep = 0;
		const fadeOutStep = Math.max( 0, this.fadeOutFactor / ( this._freq - ( this._freq * this.fadeOutFactor ) ) );

		
		// console.log(`~~~ fadeInStep: ${fadeInStep}`);
		// console.log(`~~~ fadeOutStep: ${fadeOutStep}`);


		const spines = [];

		for ( let i=0; i <= this._freq*2; i++ ) {

			// if ( i < this._freq && fadeInStep > 0 ) {

			// 	ampScaleFactor = Math.min( i * fadeInStep, 1 );

			// } else {

			// 	ampScaleFactor = 1;
			// }

			// if ( i > this._freq && fadeOutStep > 0 ) {

			// 	ampScaleFactor = 1 - Math.min( i * fadeOutStep, 1 );
			// }
		
			const spine = new Spine( this._amp * ampScaleFactor );

			spines.push( spine );
		}

		this._baseline.addAttractors( spines );
		


		// -------------------------------------------------------
		// 2


		const hpts1 = this._baseline.locate(1);
		const hpts0 = this._baseline.locate(0);

		let currPt = null;
		let prevPt = null;

		for ( let i=0; i < hpts1.length; i++ ) {

			currPt = hpts1[i];


			if ( this.mode === this.MODES.SINE ) {

				// currPt.steer( 90*currPt.polarity, 180 ).flip();
				currPt.steer( 90*currPt.polarity ).flip();
			}

			pull( currPt, handleLength );

			if ( prevPt ) {

				// curve( prevPt, currPt, 1/3, 1/3 );
			}

			// hpt.scaleHandles( handleLength ).clearGuides();

			
			if ( this.mode === this.MODES.SQUARE ) {

				hpts0[i].scaleHandles( handleLength );

				this._path.add( hpts0[i].getSegment() );
			}

			// markPoint( hpt.point );
			// traceSegment( hpt.getSegment() );

			this._path.add( currPt.getSegment() );

			prevPt = currPt;

		};

		this._path.fullySelected = true;
		

		// for ( const hpt of hpts0 ) {

		// 	const hasHandle = hpt.polarity === 1 ? true : false;

		// 	hpt.offsetBy(60*phase*genRandomDec(0.10,1), 'TAN')

		// 	hpt.steer( 90*hpt.polarity, 180 );
		// 	hpt.scaleHandles( cycle/3 ).clearGuides();
		// 	hpt.scaleHandles( 1, hasHandle, !hasHandle ).clearGuides();

		// 	// markPoint( hpt.point );
		// 	traceSegment( hpt.getSegment() );

		// 	this._path.add(hpt.getSegment() );
		// }

	}
}


export default Signal;

