import React, { useState, useEffect } from "react";
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

const DialogForm = ({ open, onOpenChange, selectedPatient, onSave, isEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    if (selectedPatient) {
      setFormData(selectedPatient);
    }
  }, [selectedPatient]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = isEdit
        ? await axios.put(
            `http://localhost:3000/api/patients/${selectedPatient.id}`,
            formData
          )
        : await axios.post("http://localhost:3000/api/patients", formData);

      toast.success(response.data.message);
     

      // Reset form data if creating a new patient
      if (!isEdit) {
        setFormData({
          name: "",
          dob: "",
          phone: "",
          email: "",
          address: "",
          description: "",
        });
      }

      onSave(); // Call onSave to refresh the patient list
      onOpenChange(false); // Close the dialog
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data.message || "An error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button>{isEdit ? "Edit Patient" : "Add Patient"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Profile" : "Create New Profile"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit the details below." : "Fill in the details below to create a new profile."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
