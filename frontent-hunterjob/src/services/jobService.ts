
import { api } from '@/services/api';

export interface Job {
  id: number;
  title: string;
  company: string;
  salary: string | null;
  contractType: string | null;
  schedule: string | null;
  modality: string | null;
  description: string | null;
  location: string | null;
  status: string;
}

const getAllJobs = async (): Promise<Job[]> => {
  try {
    const response = await api.get<Job[]>('/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

const getJobById = async (id: number): Promise<Job> => {
  try {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

const updateJob = async (id: number, job: Job): Promise<Job> => {
  try {
    const response = await api.put<Job>(`/jobs/${id}`, job);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export {
  getAllJobs,
  getJobById,
  updateJob
}
