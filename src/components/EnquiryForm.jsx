import { useState } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import axios from "axios";
function EnquiryForm({ fetchEnquiry, formData, setFormData }) {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData._id) {
            axios
                .put(`http://localhost:8080/api/enquiry/update/${formData._id}`, formData)
                .then(() => {
                    toast.success("Enquiry updated!");
                    setFormData({ name: "", email: "", phone: "", message: "", _id: "" });

                    fetchEnquiry();
                })
                .catch((err) => toast.error("Failed to update enquiry"));
        } else {
            axios
                .post("http://localhost:8080/api/enquiry/insert", formData)
                .then((res) => {
                    // fetchEnquiry();
                    toast.success("Saved successfully!");
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        message: "",
                    });
                })
                .catch((err) => {
                    // toast.error("Something went wrong");
                    console.log("ERROR: ", err);
                });
        }
    };
    setTimeout(() => {
        fetchEnquiry(); // <== This is your refetch function
    }, 300);

    return (
        <div className="bg-gray-200 p-4 rounded">
            <h2 className="text-[20px] font-bold">Enquiry Form</h2>

            <form onSubmit={handleSubmit}>
                <div className="py-3">
                    <Label htmlFor="name" value="Your Name" />
                    <TextInput
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="py-3">
                    <Label htmlFor="email" value="Your Email" />
                    <TextInput
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="py-3">
                    <Label htmlFor="phone" value="Your Name" />
                    <TextInput
                        type="text"
                        name="phone"
                        placeholder="Enter Your Phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="py-3">
                    <Label htmlFor="message" value="Your Message" />
                    <Textarea
                        type="text"
                        name="message"
                        placeholder="Enter Your Message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <div className="py-3">
                    <Button type="submit" className="w-[100%]">
                        {formData._id ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EnquiryForm;
