import '../styles/Contact.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BsAsterisk } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from 'axios';

function HomePage() {
    const { register, handleSubmit } = useForm();

    const onsend = async (data) => {
        try {
            const formData = {
                taskDescription: data.taskDescription,
                duration: data.duration
            };

            const response = await axios.post(
                "https://botiga-kvf9.onrender.com/contact/createContact",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Registration sent successfully:", response.data);
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
    };

    return (
        <section className="container mt-5">
            

            <div className="formClass">
                <div className="col-md-4">
                    <h1>Plan Your Day</h1><br/><br/>
                    <h5>Plan By Filling The Form</h5>
                    <form className="p-4 border rounded bg-light" onSubmit={handleSubmit(onsend)}>
                        <div className="mb-3">
                            <label className="form-label">Task Description </label><BsAsterisk className="asteriskIcon" />
                            <input type="text" className="form-control" placeholder="Full Names"
                                {...register('taskDescription', { required: true })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Select Duration </label>
                            <select className="form-select" {...register('duration', { required: true })}>
                                <option value="">Daily</option>
                                <option value="30min">Weekly</option>
                                <option value="1hr">Monthly</option>
                                <option value="2hr">Yearly</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                   
                </div>

            </div>
        </section>
    );
}

export default HomePage;




