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
import toast from "react-hot-toast";
import axios from "axios";

const DialogFormAppointment = ({ open, onOpenChange, selectedAppointment, onSave, isEdit }) => {
  const [appointment, setAppointment] = useState({
    doctor_id: "",
    patient_id: "",
    address: "",
    appointmentDate: "",
    status: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (selectedAppointment) {
      setAppointment({
        ...selectedAppointment,
      });
    } else {
      setAppointment({
        doctor_id: "",
        patient_id: "",
        address: "",
        appointmentDate: "",
        status: "",
      });
    }
  }, [selectedAppointment]);

  useEffect(() => {
    const fetchDoctorsAndPatients = async () => {
      try {
        const doctorsResponse = await axios.get("http://localhost:3000/api/doctors");
        const patientsResponse = await axios.get("http://localhost:3000/api/patients");
        setDoctors(doctorsResponse.data);
        setPatients(patientsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDoctorsAndPatients();
  }, []);

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
              <Label htmlFor="doctor_id">Doctor</Label>
              <select
                id="doctor_id"
                name="doctor_id"
                value={appointment.doctor_id}
                onChange={handleChange}
              >
                <option value="" disabled>Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="patient_id">Patient</Label>
              <select
                id="patient_id"
                name="patient_id"
                value={appointment.patient_id}
                onChange={handleChange}
              >
                <option value="" disabled>Select a Patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
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
                placeholder="Appointment Status"
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
