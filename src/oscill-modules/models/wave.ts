import { Point, Segment, Path } from 'paper';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Wave {


	private _baseline: any;
	private _path: any;
	private _style: any;

	private _amp: number = 0;
	private _freq: number = 0;
	private _phase: number = 0;

	private mod1: number;
	private mod2: number;


	constructor( origin: any, length: number, style?: any ) {

		this._style = style || {

			strokeColor: DEBUG_GREEN,
			strokeWidth: 2
		}

		this.mod1 = 1;
		this.mod2 = 1;

		const A = new Point( origin.x - length, origin.y )
		const B = new Point( origin.x + length, origin.y )

		this._baseline = new Path({

			segments: [ A, B ],
			strokeColor: GUIDES,
			strokeWidth: 1

		});

		// this._baseline.firstSegment.handleOut = new Point({

		// 	angle: -45,
		// 	length: length/2
		// });

		// this._baseline.lastSegment.handleIn = new Point({

		// 	angle: 90 + 45,
		// 	length: length/3
		// });

		return this;
	}


	public configure( p: number ) {

		this.mod2 = p;
	}


	public generate( frequency: number, amplitude: number, phase: number ) {


		this._freq = frequency;
		this._amp = amplitude;

		const mod3 = 1;
		const mod4 = 1;

		this._baseline = new Path({

			segments: this._baseline.segments,
			strokeColor: GUIDES,
			strokeWidth: 1

		});


		this._path = new Path({

			strokeColor: this._style.strokeColor,
			strokeWidth: this._style.strokeWidth

		});

		const cycle = this._baseline.length / this._freq;
		

		for ( let i=0; i < this._freq; i++ ) {

			const vN = this._baseline.getNormalAt(cycle*i)
			const vT = this._baseline.getTangentAt(cycle*i)
			
			const oP = this._baseline.getPointAt(cycle*i)
			const xP = this._baseline.getPointAt(cycle*i+cycle*0.5)
			const hP = this._baseline.getPointAt(cycle*i+cycle*0.25)
			const lP = this._baseline.getPointAt(cycle*i+cycle*0.75)

			const vNo = new Point({

				length: 1,
				angle: vN.angle + mod3 * 180
			})

			const vNx = new Point({

				length: 1,
				angle: vN.angle - mod4 * 180
			})

			this._path.add( 	

			    new Segment( 

                    oP, 	
                    vNo.multiply( this._amp * this.mod2 ), 
                    vNo.multiply( this._amp * this.mod2 * -1 )
	            ) 
			)

			this._path.add( 	

			    new Segment(

                    hP.add( vN.multiply( this._amp ) ), 
                    vT.multiply( cycle * 0.25 * this.mod1 * -1 ), 
                    vT.multiply( cycle * 0.25 * this.mod1 ) 
		        )
			)

			this._path.add( 	

			    new Segment(

                    xP, 
                    vNx.multiply( this._amp * this.mod2 * -1), 
                    vNx.multiply( this._amp * this.mod2 ) 
		        ) 
			)

			this._path.add( 	

			    new Segment(

                    lP.subtract( vN.multiply( this._amp ) ), 
                    vT.multiply( cycle * 0.25 * this.mod1 *-1 ), 
                    vT.multiply( cycle * 0.25 * this.mod1 ) 
		        )
			) 
		}

		// this._path.smooth({ type: 'catmull-rom', factor: 0.1 });
		// this._path.smooth({ type: 'continuous' });

		// this._path.fullySelected = true;
		// this._path.smooth({ type: 'geometric', factor: 0.1 });

	}


	public scale( p5: number ) {

		this.mod2 = p5;
	}
}

export default Wave;


