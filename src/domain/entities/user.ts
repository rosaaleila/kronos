export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName?: string;
	nickname?: string;
	// weeklyTasks?: Array<string>; //@todo: colocar tasks
	createdAt: string;
	updatedAt: string;
}
