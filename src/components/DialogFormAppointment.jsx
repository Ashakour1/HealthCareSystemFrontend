import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";

const DialogFormAppointment = ({ open, onOpenChange, selectedAppointment, onSave, isEdit }) => {
  const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: "",
    address: "",
    appointmentDate: "",
    status: "",
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (selectedAppointment) {
      setAppointment({
        ...selectedAppointment,
      });
    } else {
      setAppointment({
        patientId: "",
        doctorId: "",
        address: "",
        appointmentDate: "",
        status: "",
      });
    }
  }, [selectedAppointment]);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/patients");
      setPatients(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doctors");
      setDoctors(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEdit
        ? await axios.put(
            `http://localhost:3000/api/appointments/${selectedAppointment.id}`,
            appointment
          )
        : await axios.post("http://localhost:3000/api/appointments", appointment);

      toast.success(response.data.message);
      onSave();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data.message || "An error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button variant="outline">{isEdit ? "Edit Appointment" : "Add Appointment"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Appointment" : "Add Appointment"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit the details below." : "Fill in the details below to add a new appointment."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="patientId">Patient</Label>
              <Select name="patientId" value={appointment.patientId} onChange={handleChange}>
                <SelectTrigger>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div>
              <Label htmlFor="doctorId">Doctor</Label>
              <Select name="doctorId" value={appointment.doctorId} onChange={handleChange}>
                <SelectTrigger>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={appointment.address}
                onChange={handleChange}
                placeholder="Appointment Address"
              />
            </div>
            <div>
              <Label htmlFor="appointmentDate">Appointment Date</Label>
              <Input
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                value={appointment.appointmentDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                value={appointment.status}
                onChange={handleChange}
                placeholder="Status"
              />
            </div>
            <DialogFooter>
              <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormAppointment;
