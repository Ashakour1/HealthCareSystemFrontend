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

const DialogFormDoctor = ({ open, onOpenChange, selectedDoctor, onSave, isEdit }) => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    title: "",
    phone: "",
  });

  useEffect(() => {
    if (selectedDoctor) {
      setDoctor({
        ...selectedDoctor,
      });
    } else {
      setDoctor({
        name: "",
        email: "",
        title: "",
        phone: "",
      });
    }
  }, [selectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEdit
        ? await axios.put(
            `http://localhost:3000/api/doctors/${selectedDoctor.id}`,
            doctor
          )
        : await axios.post("http://localhost:3000/api/doctors", doctor);

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
        <Button variant="outline">{isEdit ? "Edit Doctor" : "Add Doctor"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Doctor" : "Add Doctor"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit the details below." : "Fill in the details below to add a new doctor."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={doctor.name}
                onChange={handleChange}
                placeholder="Doctor Name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={doctor.email}
                onChange={handleChange}
                placeholder="Doctor Email"
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={doctor.title}
                onChange={handleChange}
                placeholder="Doctor Title"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
                placeholder="Doctor Phone"
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

export default DialogFormDoctor;
