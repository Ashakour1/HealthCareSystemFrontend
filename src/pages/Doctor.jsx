import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Doctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const api = "http://localhost:3000/api/doctors";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(api);
      setDoctorList(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAddDoctor = async () => {
    console.log("Add Doctor Clicked");
    try {
      await axios.post(api, { name, email, title, description });
      fetchDoctors();
      setShowAddDialog(false);
      setName("");
      setEmail("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const handleUpdateDoctor = async () => {
    console.log("Update Doctor Clicked");
    try {
      if (selectedDoctor) {
        await axios.put(`${api}/${selectedDoctor.id}`, {
          name,
          email,
          title,
          description,
        });
        fetchDoctors();
        setShowEditDialog(false);
        setSelectedDoctor(null);
        setName("");
        setEmail("");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handleDeleteDoctor = async () => {
    console.log("Delete Doctor Clicked");
    try {
      if (selectedDoctor) {
        await axios.delete(`${api}/${selectedDoctor.id}`);
        fetchDoctors();
        setShowDeleteDialog(false);
        setSelectedDoctor(null);
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleEditClick = (doctor) => {
    setName(doctor.name);
    setEmail(doctor.email);
    setTitle(doctor.title);
    setDescription(doctor.description);
    setSelectedDoctor(doctor);
    setShowEditDialog(true);
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteDialog(true);
  };

  const filteredDoctors = doctorList.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="w-full p-4">

      <Card>
        <CardHeader className="text-blue-600">
          <CardTitle>Doctors</CardTitle>
          <div className="flex justify-between items-center mt-4">
            <Input
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3"
            />
            <Button
              className="bg-blue-600"
              onClick={() => setShowAddDialog(true)}
            >
              Add Doctor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="py-2 px-4 border-b">{doctor.id}</td>
                  <td className="py-2 px-4 border-b">{doctor.name}</td>
                  <td className="py-2 px-4 border-b">{doctor.title}</td>
                  <td className="py-2 px-4 border-b">{doctor.description}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleEditClick(doctor)}
                    >
                      Update
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDeleteClick(doctor)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Doctor Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Doctor</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new doctor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full gap-4 mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter doctor's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter doctor's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter doctor's title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter doctor's description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDoctor}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Doctor Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
            <DialogDescription>
              Modify the details of the selected doctor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full gap-4 mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter doctor's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter doctor's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter doctor's title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter doctor's description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDoctor}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Doctor Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this doctor?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteDoctor}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Doctor;