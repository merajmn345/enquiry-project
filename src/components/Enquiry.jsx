import axios from "axios";
import EnquiryForm from "./EnquiryForm";
import EnquiryList from "./EnquiryList";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL);
function Enquiry() {
    const [enquiryData, setEnquiryData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        _id: "",
    });
    const fetchEnquiry = () => {
        axios.get(`${API_URL}/list`).then((res) => {
            const result = res.data.data;
            // console.log(res.data);
            setEnquiryData(result);
        });
    };
    useEffect(() => {
        fetchEnquiry();
    }, []);

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`${API_URL}/delete/${id}`)
                    .then((res) => {
                        toast.success("Delete successfully!");
                    })
                    .catch((err) => {
                        toast.error("Something went wrong");
                    });
                swal("Poof! Your file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your file is safe!");
            }
        });
    };

    useEffect(() => {
        setTimeout(() => {
            fetchEnquiry(); // <== This is your refetch function
        }, 300);
    }, []);

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/single-user/${id}`);
            console.log("API Response:", response.data);

            // Check the structure of your API response
            // It might be response.data.data or just response.data
            const userData = response.data.data || response.data;

            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                phone: userData.phone || "",
                message: userData.message || "",
                _id: userData._id || id,
            });
        } catch (err) {
            console.log("Edit error:", err);
            toast.error("Failed to load enquiry data for editing");
        }
    };
    return (
        <div className="">
            <ToastContainer />
            <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[35%_1fr] xl:grid-cols-[30%_1fr] gap-4 md:gap-6 lg:gap-10">
                <EnquiryForm fetchEnquiry={fetchEnquiry} formData={formData} setFormData={setFormData} />
                <EnquiryList enquiryData={enquiryData} handleDelete={handleDelete} handleEdit={handleEdit} />
            </div>
        </div>
    );
}

export default Enquiry;
