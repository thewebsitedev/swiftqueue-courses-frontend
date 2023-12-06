import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Course } from "./Types";
import Header from "./components/Header";
import Foooter from "./components/Footer";
import { getErrorMessage } from "./Helper";

/**
 * Add course page component.
 * 
 * @returns {JSX.Element}
 */
const AddCourse = () => {
    const [course, setCourse] = useState<Course>({
        name: "",
        start_date: "",
        end_date: "",
        status: "active",
    });
    const [error, setError] = useState({
        name: "",
        start_date: "",
        end_date: "",
        status: "",
        message: "",
    });
    const [success, setSuccess] = useState({
        message: "",
    });

    /**
     * Add a course to the database using API.
     * 
     * @returns {Promise<any>}
     * @throws {Error}
     */
    const fetchData = async () => {
        const response = await fetch(
            process.env.REACT_APP_API_URL + "/courses/index.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: course.name,
                    start_date: course.start_date,
                    end_date: course.end_date,
                    status: course.status,
                }),
            }
        );

        if (!response.ok) throw new Error(response.statusText);

        return response.json();
    };

    /**
     * Handles course addition.
     * 
     * @returns void
     * @throws {Error}
     */
    const handleAddCourse = async () => {
        if (!course.name)
            return setError({ ...error, name: "Please enter a course name" });
        if (!course.start_date)
            return setError({
                ...error,
                start_date: "Please enter a start date",
            });
        if (!course.end_date)
            return setError({ ...error, end_date: "Please enter an end date" });
        if (!course.status)
            return setError({
                ...error,
                status: "Please enter a status value",
            });

        let data = fetchData();
        data.then((data) => {
            setCourse({
                name: "",
                start_date: "",
                end_date: "",
                status: "active",
            });
            setSuccess({ ...success, message: data.message });
        }).catch((e) => {
            console.log(e);
            setError({ ...error, message: getErrorMessage(e) });
        });
    };

    /**
     * Handles course name change.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event
     * @returns void
     */
    const handleCourseNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setError({ ...error, name: "" });
        setCourse({ ...course, name: event.target.value });
    };

    /**
     * Handles start date change.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event
     * @returns void
     */
    const handleStartDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setError({ ...error, start_date: "" });
        setCourse({ ...course, start_date: event.target.value });
    };

    /**
     * Handles end date change.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event
     * @returns void
     */
    const handleEndDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setError({ ...error, end_date: "" });
        setCourse({ ...course, end_date: event.target.value });
    };

    /**
     * Handles status change.
     * 
     * @param {React.ChangeEvent<HTMLSelectElement>} event
     * @returns void
     */
    const handleStatusChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setError({ ...error, status: "" });
        setCourse({ ...course, status: event.target.value });
    };

    /**
     * Handles form submission.
     * Prevents page reload.
     * 
     * @param {React.FormEvent<HTMLFormElement>} event
     * @returns void
     */
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="min-h-full">
            <Header />
            <main className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10 divide-y divide-gray-900/10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Add Course
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly
                                so be careful what you share.
                            </p>
                        </div>
                        <form
                            onSubmit={handleFormSubmit}
                            className="mx-4 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-md sm:rounded-xl md:col-span-2"
                        >
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-full">
                                        <label
                                            htmlFor="course-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Course Name
                                        </label>
                                        <div className="mt-2">
                                            <div className="relative flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="course-name"
                                                    id="course-name"
                                                    autoComplete="given-name"
                                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                        error.name !== ""
                                                            ? "text-red-900 ring-red-300"
                                                            : "ring-gray-300"
                                                    }`}
                                                    aria-invalid={
                                                        error.name !== ""
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    aria-describedby={
                                                        error.name !== ""
                                                            ? "name-error"
                                                            : ""
                                                    }
                                                    onChange={
                                                        handleCourseNameChange
                                                    }
                                                    value={course.name}
                                                />
                                                {error.name !== "" && (
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <ExclamationCircleIcon
                                                            className="h-5 w-5 text-red-500"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {error.name !== "" ? (
                                                <p
                                                    className="mt-2 text-sm text-red-600"
                                                    id="email-error"
                                                >
                                                    {error.name}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-full">
                                        <label
                                            htmlFor="start-date"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Start Date
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="datetime-local"
                                                    name="start-date"
                                                    id="start-date"
                                                    autoComplete="given-name"
                                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                        error.start_date !==
                                                        ""
                                                            ? "text-red-900 ring-red-300"
                                                            : "ring-gray-300"
                                                    }`}
                                                    onChange={
                                                        handleStartDateChange
                                                    }
                                                    value={
                                                        course.start_date
                                                    }
                                                />
                                            </div>
                                            {error.start_date !== "" ? (
                                                <p
                                                    className="mt-2 text-sm text-red-600"
                                                    id="start-date-error"
                                                >
                                                    {error.start_date}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-full">
                                        <label
                                            htmlFor="end-date"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            End Date
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="datetime-local"
                                                    name="end-date"
                                                    id="end-date"
                                                    autoComplete="given-name"
                                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                        error.end_date !==
                                                        ""
                                                            ? "text-red-900 ring-red-300"
                                                            : "ring-gray-300"
                                                    }`}
                                                    onChange={
                                                        handleEndDateChange
                                                    }
                                                    value={course.end_date}
                                                />
                                            </div>
                                            {error.end_date !== "" ? (
                                                <p
                                                    className="mt-2 text-sm text-red-600"
                                                    id="email-error"
                                                >
                                                    {error.end_date}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-full">
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Status
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="status"
                                                name="status"
                                                autoComplete="status-name"
                                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                                    error.status !== ""
                                                        ? "text-red-900 ring-red-300"
                                                        : "ring-gray-300"
                                                }`}
                                                defaultValue={"Active"}
                                                onChange={
                                                    handleStatusChange
                                                }
                                            >
                                                <option value="active">
                                                    Active
                                                </option>
                                                <option value="ended">
                                                    Ended
                                                </option>
                                                <option value="coming soon">
                                                    Coming Soon
                                                </option>
                                            </select>
                                            {error.status !== "" ? (
                                                <p
                                                    className="mt-2 text-sm text-red-600"
                                                    id="email-error"
                                                >
                                                    {error.status}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    {/* <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    </div>
                </div> */}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                {error.message !== "" ? (
                                    <div className="flex items-center gap-x-2">
                                        <ExclamationCircleIcon
                                            className="h-5 w-5 text-red-500"
                                            aria-hidden="true"
                                        />
                                        <p className="text-sm text-red-600 text-xs">{`API trouble. Please contact support with the message: "${error.message}".`}</p>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {success.message !== "" ? (
                                    <div className="flex items-center gap-x-2">
                                        <ExclamationCircleIcon
                                            className="h-5 w-5 text-green-500"
                                            aria-hidden="true"
                                        />
                                        <p className="text-sm text-green-600 text-xs">
                                            {success.message}
                                        </p>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleAddCourse}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Foooter />
        </div>
    );
};

export default AddCourse;
