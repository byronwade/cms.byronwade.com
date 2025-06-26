export interface TableNodeData {
	name: string;
	details: {
		id: string;
		label: string;
		type: string;
	}[];
	icon?: JSX.Element | string;
	type?: string;
	description?: string;
	input?: string;
}
