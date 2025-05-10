'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getJobById, Job } from '@/services/jobService';
import { Button, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { updateJob } from '@/services/jobService';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { StatusOptions } from '@/types/types';


const EditRowForm = () => {
  const params = useParams()
  const router = useRouter()
  const { id } = params;
  const [formData, setFormData] = useState<Job>({
    id: 0,
    title: '',
    company: '',
    salary: '',
    contractType: '',
    schedule: '',
    modality: '',
    description: '',
    location: '',
    status: ''
  });

  const statusOptions: StatusOptions[] = [
    { name: 'pending', display_name: 'Pendiente' },
    { name: 'applied', display_name: 'Aplicado' },
    { name: 'rejected', display_name: 'Rechazado' },
    { name: 'applied_manually', display_name: 'Aplicado manualmente' },
    { name: 'pending_interview', display_name: 'Entrevista pendiente' },
    { name: 'tech_test', display_name: 'Prueba tecnica' },
    { name: 'passed', display_name: 'Aprobado' },
  ]

  const fetchJob = async (id: number) => {
    try {
      if (!id) return false
      const job: Job = await getJobById(id);
      setFormData(job);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    if (!params || !params.id) {
      router.push('/');
      return;
    }

    const jobId = Number(params.id);
    if (isNaN(jobId)) {
      router.push('/');
      return;
    }

    fetchJob(jobId);

  }, [params, router]);

  const handleInputChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    updateJob(Number(id), formData);
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex mb-4 items-center gap-4'>
        <Button variant="outlined" onClick={() => router.back()} color='primary'> <MdOutlineKeyboardArrowLeft /> Volver </Button>
      <h2 className="text-2xl font-bold text-gray-900">Vacante</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black">
        {formData?.title && <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <TextField
            type="text"
            name="title"
            id="title"
            value={formData.title}
            className="w-full mt-1"
          />
        </div>
        }


        {formData?.company && <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-900">Compañía</label>
          <TextField
            type="text"
            name="company"
            id="company"
            value={formData.company ?? ''}
            className="w-full mt-1"
          />
        </div>
        }

        {formData?.salary && <div className="mb-4">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salario</label>
          <TextField
            type="text"
            name="salary"
            id="salary"
            value={formData.salary ?? 0}
            className="w-full mt-1"
          />
        </div>
        }

        {formData?.contractType && <div className="mb-4">
          <label htmlFor="contractType" className="block text-sm font-medium text-gray-700">Tipo de Contrato</label>
          <TextField
            type="text"
            name="contractType"
            id="contractType"
            value={formData.contractType ?? ''}
            className="w-full mt-1"
          />
        </div>
        }


        {formData?.schedule && <div className="mb-4">
          <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Horario</label>
          <TextField
            type="text"
            name="schedule"
            id="schedule"
            value={formData.schedule ?? ''}
            className="w-full mt-1"
          />
        </div>
        }

        {formData?.modality && <div className="mb-4">
          <label htmlFor="modality" className="block text-sm font-medium text-gray-700">Modalidad</label>
          <TextField
            type="text"
            name="modality"
            id="modality"
            value={formData.modality ?? ''}
          />
        </div>
        }

        {formData?.description && <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <TextField
            name="description"
            id="description"
            value={formData.description ?? ''}
            className="mt-1 block w-full"
            multiline
            rows={10}
          />
        </div>
        }

        {formData?.location && <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
          <TextField
            type="text"
            name="location"
            id="location"
            value={formData.location ?? ''}
            className="w-full mt-1"
          />
        </div>
        }
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <Select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
          >
            {statusOptions.map((option: StatusOptions) => (
              <MenuItem key={option.name} value={option.name}>
                {option.display_name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          variant='contained'
        >
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
};

export default EditRowForm;
