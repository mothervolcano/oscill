

declare module 'oscill' {

	interface Param {
				
		id: string;
		name: string;
		value: number;
		range: [number,number];
		step: number;
		label: string;
	}

	type ParamSet = Array<Param>;

	interface Mode {

		id: string;
		option: string;
		icon: string;
		default: boolean;
		checked: boolean;
	}

	type ModeSet = Array<Mode>;

	interface Model {

		option: string;
		label: string;
		icon: string;
		console: string;
		modes: ModeSet;
		params: ParamSet;
		default: boolean;
		checked: boolean;
	}

	export {

		Model,
		Param,
		ParamSet,
		Mode,
		ModeSet
	}
};