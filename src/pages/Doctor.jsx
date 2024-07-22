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
import DoctorDialog from "@/components/DialogFormDoctor";
import DashboardHeader from "@/components/DashboardHeader";
import Aside from "@/components/Aside";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@/hooks/useUser";

const Doctor = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doctors");
      setDoctors(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEdit(true);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/doctors/${id}`);
      toast.success("Doctor deleted successfully");
      fetchDoctors(); // Refresh the doctor list
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the doctor");
    }
  };

  const handleSave = () => {
    setSelectedDoctor(null);
    setIsEdit(false);
    setDialogOpen(false);
    fetchDoctors();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DoctorDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                selectedDoctor={selectedDoctor}
                onSave={handleSave}
                isEdit={isEdit}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Title</TableHead>
                <TableHead className="hidden md:table-cell">Reg Date</TableHead>
                <TableHead className="hidden md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.title}</TableCell>
                  <TableCell>{doctor.createdAt.slice(0, 10)}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(doctor)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(doctor.id)}>Delete</DropdownMenuItem>
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

export default Doctor;
