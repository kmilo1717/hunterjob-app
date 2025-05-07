'use client'
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination, Skeleton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Job, getAllJobs } from "@/services/jobService";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  const handleRowClick = (row: any) => {
    router.push(`/dashboard/${row.id}`);
  };

  const statusOptions: { [key: string]: string } = {
    pending: 'Pendiente',
    applied: 'Aplicado',
    rejected: 'Rechazado',
    applied_manually: 'Aplicado manualmente',
    pending_interview: 'Entrevista pendiente',
    tech_test: 'Prueba tecnica',
    passed: 'Aprobado',
  }

  const filteredRows = searchTerm.length >= 3 ? jobs.filter(
    (row) =>
      row.id?.toString().includes(searchTerm) ||
      row.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.salary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.contractType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.schedule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.modality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statusOptions[row.status]?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : jobs

  const fetchJobs = async () => {
    try {
      const jobs = await getAllJobs();
      setJobs(jobs);
      setLoading(false); // Dejar de mostrar el Skeleton después de cargar los datos
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false); // Asegurarse de que el Skeleton desaparezca incluso si hay error
    }
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="text-gray-800 p-4">
      <h1 className="text-3xl">Trabajos</h1>
      <TableContainer className="mt-4" component={Paper}>
        <div className="flex my-4 mx-2">
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            className="m-4 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={500} animation="wave"/>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-gray-500">
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Salary</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contract Type</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Schedule</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Modality</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length ? filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(row)}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.salary}</TableCell>
                    <TableCell>{row.contractType}</TableCell>
                    <TableCell>{row.schedule}</TableCell>
                    <TableCell>{row.modality}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{statusOptions[row.status]}</TableCell>
                  </TableRow>
                )):
                <TableRow>
                  <TableCell colSpan={10}>
                    <p className="text-center">No se encontraron trabajos</p>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
