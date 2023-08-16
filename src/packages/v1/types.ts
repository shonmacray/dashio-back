export interface IHeader {
    id?: string;
    user_id: string;
    contact: string;
    city_country: string;
    job_title: string;
    linkedIn: string;
    twitter: string;
    bio: string;
}

export interface IProject {
    id?: string;
    user_id: string;
    name: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface IExperience {
    id?: string;
    user_id: string;
    title: string;
    company: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface IEducation {
    id?: string;
    user_id: string;
    school: string;
    certificate: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface IAward {
    id?: string;
    user_id: string;
    award: string;
    description: string;
}

export type ISection = "project" | "experience" | "education" | "header" | "award"