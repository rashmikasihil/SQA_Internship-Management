import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import CVIcon from "../../assets/cv.png";
import { CiMail } from "react-icons/ci";
import { MdOutlineContactMail } from "react-icons/md";
import { GrDocument } from "react-icons/gr";

const CVUploadForm = () => {
  const { register, handleSubmit, reset, watch ,formState: { errors }} = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const applyAs = watch("applyAs");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Append files
      if (data.cvFile[0]) {
        formData.append("cvFile", data.cvFile[0]);
      }
      if (data.additionalFiles[0]) {
        formData.append("additionalFiles", data.additionalFiles[0]);
      }

      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await axios.post("http://localhost:5000/api/internships/cv/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      reset(); // Reset form after successful submission
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading CV");
    }

    setLoading(false);
  };

  return (
    <div className=" max-w-screen  border-2 border-gray-200 rounded-lg p-4 m-4 ">
      <div className="flex justify-start items-center gap-3">
        <img src={CVIcon} alt="CV Icon" className="w-12 h-12" />
        <h2 className="text-3xl text-gray-800 font-bold mb-4 mt-10">Add New CV</h2>
      </div>
      <hr className="mb-6" />
      <div className="max-w-full mx-auto p-6 border rounded shadow-lg bg-white">
        <h2 className="text-2xl text-gray-600 font-bold mb-4">New CV</h2>
        <h2 className="text-1xl text-gray-600 font-normal mb-4">You can add your cv and later Schedule an interview for them </h2>
        <div className=" flex columns-auto justify-start items-center gap-3">
          <FaRegUser className=" w-5 h-5 " />
          <h2 className="text-2xl text-gray-600 font-medium  ">ABOUT USER</h2>
        </div>
        <hr className="mb-6" />

        {message && <p className="mb-3 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
          <input
  {...register("fullName")}
  placeholder="Full Name"
  className="peer w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required/>

  <input {...register("nameWithInitials")} placeholder="Name with Initials" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />

 <input {...register("nic", { required: "NIC is required", pattern: { value: /^(\d{9}[Vv]|\d{12})$/,message: "Invalid NIC format"}})} placeholder="NIC Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" />
 {errors.nic && <p className="text-red-500">{errors.nic.message}</p>}
 
  <input {...register("email")} type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />

  <input {...register("postalAddress")} placeholder="Postal Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />

  <input {...register("district")} placeholder="District" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
<div>
<label>
    Date of Birth 
 </label>
  <input {...register("dateOfBirth")} type="date" placeholder="Date of Birth" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
 
  </div>
  <input {...register("mobileNumber")} placeholder="Mobile Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />

  <input {...register("landPhoneNumber")} placeholder="Landline Number (optional)" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" />

  <input {...register("higherEducationInstitute")} placeholder="Higher Education Institute" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />


          </div>

          <select
  {...register("gender")}
  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-400"
  required
>
  <option value="" disabled selected className="text-gray-500">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>


<div className=" flex columns-auto justify-start items-center gap-3 mt-10">
<CiMail className=" w-6 h-6" />
        <h2 className="text-xl text-gray-600 font-medium  ">Type Of Internship and Qualifications</h2>
        </div>
        <hr className="mb-6" />

<div className="  flex columns-auto justify-start items-center  gap-96">    
      <select {...register("applyAs")} className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-400" required>
            <option value="" className="text-gray-500" disabled>Applying As</option>
            <option value="internship"  >Internship</option>
            <option value="dataoperator" >Data Operator</option>
          </select>

          <h2 className=" text-xl text-blue-700 font-sans    ">Internships for students who following higher Education programmes in recognized institue which require an internship period as a part of programme. </h2>
          </div>


          
          {applyAs === "dataoperator" && (
        <>
        <h2 className=" text-gray-600 font-normal text-xl mt-6 "> O/L results for Maths, Science and English are mandatory. PLease Use the format to enter your result

</h2><h2 className="text-gray-700 font-normal text-xl"> (subject : Result)</h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <input {...register("olResults.subject1")} placeholder="Subject 1" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject2")} placeholder="Subject 2" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject3")} placeholder="Subject 3" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject4")} placeholder="Subject 4" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject5")} placeholder="Subject 5" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject6")} placeholder="Subject 6" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject7")} placeholder="Subject 7" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject8")} placeholder="Subject 8" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
  <input {...register("olResults.subject9")} placeholder="Subject 9" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
</div>

          <textarea {...register("alResults")} placeholder="A/L Results" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400"></textarea>
          </>
)}
<input {...register("institute")} placeholder="Higher Educational Qualifications" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" />

         

<input {...register("internshipCategory")} placeholder="Internship Category" className="border p-2 rounded" required />

<div className=" flex columns-auto justify-start items-center gap-3 mt-10">
<MdOutlineContactMail className=" w-6 h-6" />
<h2 className="text-xl text-gray-600 font-medium  ">In case of Emergency</h2>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<input {...register("emergencyContactname")} placeholder="Emergency Contact Name 1" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
<input {...register("emergencyContact")} placeholder="Emergency Mobile Number 1" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<input {...register("emergencyContact2name")} placeholder="Emergency Contact Name 2" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
<input {...register("emergencyContact2")} placeholder="Emergency Mobile Number 2" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-400" required />
</div>


<div className=" flex columns-auto justify-start items-center gap-3 mt-10">
<GrDocument  className=" w-6 h-6" />
<h2 className="text-xl text-gray-600 font-medium  ">Upload Documents</h2>
</div>

<hr className="mb-6" />
<label>Upload CV (PDF only)</label>
      <input
        {...register("cvFile", {
          validate: (file) => file[0]?.type === 'application/pdf' || 'Only PDF files are allowed'
        })}
        type="file"
        accept=".pdf"
        className="border p-2 rounded"
        required
      />
      {errors.cvFile && <p className="text-red-500">{errors.cvFile.message}</p>}

          <label>Additional Files (optional)</label>
          <input {...register("additionalFiles")} type="file" accept=".pdf" className="border p-2 rounded" />

          <button type="submit" className="bg-blue-500 text-white py-2 rounded" disabled={loading}>
            {loading ? "Uploading..." : "Submit CV"}
          </button>
        </form>
      </div>
    </div>

  );
};

export default CVUploadForm;
