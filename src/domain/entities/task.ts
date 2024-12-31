import { Attachments } from "./attachments";

export interface Task {
    id: string;
    title: string;
    description?: string;
    user_id: string;
    color_hex: string;
    sub_tasks?: Task[];
    date_limit: string;
    estimated_time: number;
    used_time: number;
    attachments: Attachments[];
    checklists: Task[];
    tags: string[];
    categories: string[];
}