import { Task } from "./task";

type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Faz com que exista um obj com chaves equivalentes 
// aos dias da semana, contendo um array de Tasks como valor
type WeeklyTasks = {
	[key in Weekday]: Task[];
}

export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName?: string;
	nickname?: string;
	weeklyTasks?: WeeklyTasks;
	createdAt: string;
	updatedAt: string;
}
