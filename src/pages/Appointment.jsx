import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppointmentDialog from "@/components/DialogFormAppointment";
import DashboardHeader from "@/components/DashboardHeader";
import Aside from "@/components/Aside";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@/hooks/useUser";

const Appointment = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchAppointments();
    fetchDoctorsAndPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/appointments");
      setAppointments(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctorsAndPatients = async () => {
    try {
      const [doctorsResponse, patientsResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/doctors"),
        axios.get("http://localhost:3000/api/patients"),
      ]);
      setDoctors(doctorsResponse.data);
      setPatients(patientsResponse.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch doctors or patients");
    }
  };

  const getDoctorName = (id) => {
    const doctor = doctors.find((doctor) => doctor.id === id);
    return doctor ? doctor.name : "Unknown Doctor";
  };

  const getPatientName = (id) => {
    const patient = patients.find((patient) => patient.id === id);
    return patient ? patient.name : "Unknown Patient";
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEdit(true);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/appointments/${id}`);
      toast.success("Appointment deleted successfully");
      fetchAppointments(); // Refresh the appointment list
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the appointment");
    }
  };

  const handleSave = () => {
    setSelectedAppointment(null);
    setIsEdit(false);
    setDialogOpen(false);
    fetchAppointments();
  };

  return (
    <div className="flex min-h-screen w-full">
      <Aside />
      <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <AppointmentDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                selectedAppointment={selectedAppointment}
                onSave={handleSave}
                isEdit={isEdit}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableHead className="hidden md:table-cell">Appointment Date</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{getPatientName(appointment.patientId)}</TableCell>
                  <TableCell>{getDoctorName(appointment.doctorId)}</TableCell>
                  <TableCell className="hidden md:table-cell">{appointment.address}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{appointment.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(appointment)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(appointment.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default Appointment;
