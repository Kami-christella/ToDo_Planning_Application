import "../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDensitySmall } from "react-icons/md";
import { SiDailymotion } from "react-icons/si";
import { MdCalendarViewWeek } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";

function HomePage() {
  const { register, handleSubmit } = useForm();

  const onsend = async (data) => {
    try {
      const formData = {
        taskDescription: data.taskDescription,
        duration: data.duration,
      };

      const response = await axios.post(
        // "https://botiga-kvf9.onrender.com/contact/createContact",
        "http://localhost:5001/task/createTask",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Task saved successfully:", response.data);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="">
      <div className="formClass">
        <div className="">
          <form className="" onSubmit={handleSubmit(onsend)}>
            <div className="firstDiv">
              <h1 className="task-header">
                Make a better Plan <br /> for your life
              </h1>
              {/* <span className="task-subtext">Whoever you are, whatever you are looking for, 

 </span> */}

              <div className="input-group-custom">
                <span className="task-subtext">
                  Whoever you are, whatever you are looking for, <br />
                  we have the perfect place for you
                </span>

                <select {...register("duration", { required: true })}>
                  <option value="">Duration</option>
                  <option value="1">Daily Tasks</option>
                  <option value="2">Weekly Tasks</option>
                  <option value="3">Monthly Tasks</option>
                  <option value="4">Yearly Tasks</option>
                </select>

                <input
                  type="text"
                  placeholder="Task"
                  {...register("taskDescription", { required: true })}
                />

                <button type="submit">Add task</button>
              </div>
            </div>

            <div className="filter-buttons">
              <button type="button">
                <MdDensitySmall /> All
              </button>
              <button type="button">
                <SiDailymotion /> Daily
              </button>
              <button type="button">
                <MdCalendarViewWeek /> Weekly
              </button>
              <button type="button">
                <MdOutlineCalendarMonth /> Monthly
              </button>
              <button type="button">
                <GiCalendarHalfYear /> Yearly
              </button>
            </div>

            <div className="allTasks">
              <p>
                1. Learn React{" "}
                <span>
                  <MdModeEditOutline /> <MdDelete />
                </span>
              </p>
              <p>
                2. Learn Node.js{" "}
                <span>
                  <MdModeEditOutline /> <MdDelete />
                </span>
              </p>
              <p>
                3. Learn MongoDB{" "}
                <span>
                  <MdModeEditOutline /> <MdDelete />
                </span>
              </p>
              <p>
                4. Learn MongoDB{" "}
                <span>
                  <MdModeEditOutline /> <MdDelete />
                </span>
              </p>
              <p>
                5. Learn MongoDB{" "}
                <span>
                  <MdModeEditOutline /> <MdDelete />
                </span>
              </p>
              <p>
                6. Learn MongoDB{" "}
                <span>
                  <MdModeEditOutline /> <MdDelete />
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
