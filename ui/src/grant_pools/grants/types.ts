import type {
	Record,
	ActionHash,
	DnaHash,
	SignedActionHashed,
	EntryHash,
	AgentPubKey,
	Create,
	Update,
	Delete,
	CreateLink,
	DeleteLink
} from '@holochain/client';

export type GrantsSignal =
	| {
			type: 'EntryCreated';
			action: SignedActionHashed<Create>;
			app_entry: EntryTypes;
	  }
	| {
			type: 'EntryUpdated';
			action: SignedActionHashed<Update>;
			app_entry: EntryTypes;
			original_app_entry: EntryTypes;
	  }
	| {
			type: 'EntryDeleted';
			action: SignedActionHashed<Delete>;
			original_app_entry: EntryTypes;
	  }
	| {
			type: 'LinkCreated';
			action: SignedActionHashed<CreateLink>;
			link_type: string;
	  }
	| {
			type: 'LinkDeleted';
			action: SignedActionHashed<DeleteLink>;
			link_type: string;
	  };

export type EntryTypes =
	| ({ type: 'GrantPoolOutcome' } & GrantPoolOutcome)
	| ({ type: 'Evaluation' } & Evaluation)
	| ({ type: 'Application' } & Application)
	| ({ type: 'GrantPool' } & GrantPool)
	| ({ type: 'TimePeriod' } & TimePeriod)
	| ({ type: 'EvaluationTemplate' } & EvaluationTemplate)
	| ({ type: 'ApplicationTemplate' } & ApplicationTemplate);

export interface ApplicationTemplate {
	json_schema: string;
	name: string;
}

export interface NumberRange {
	min: number;
	max: number;
}

export interface WeightedCriteria {
	label: string,
	weight: number,
}

export enum ScoreType {
	Single = 'Single',
	Weighted = 'Weighted'
}

export interface ScoreTemplate {
	type: ScoreType;
	content: undefined | WeightedCriteria[];
}

export interface EvaluationTemplate {
	name: string;
	
	qualitative_json_schema: string;

	score_range: NumberRange,
	
	score: ScoreTemplate;
}

export interface TimePeriod {
	start_at: number;

	end_at: number;
}

export interface GrantPool {
	name: string;

	purpose_description: string;

	rules_description: string;

	time_period: ActionHash;

	application_template: ActionHash;

	evaluation_template: ActionHash;

	evaluators: AgentPubKey[];
}

export interface Status {
	type: 'Draft' | 'Submitted' | 'Evaluated' | 'Claimed';
}

export interface Application {
	application_template: ActionHash;

	json_data: string;

	status: Status;
}

export interface AttributeScore {
    label: string,
    value: number,
}

export interface Score {
	type: ScoreType
	content: number | AttributeScore[]
}

export interface Evaluation {
	application: ActionHash;

	json_data: string;

	comments: string;

	score: Score;
}

export interface GrantPoolOutcome {
	grant_pool: ActionHash;

	outcomes: string;

	coupon: Array<number>;
}
