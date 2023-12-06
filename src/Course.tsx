import { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Header from "./components/Header";
import Foooter from "./components/Footer";
import Page404 from "./components/Page404";
import { CourseType } from "./Types";
import { classNames, getErrorMessage } from "./Helper";

/**
 * Course component
 * 
 * @returns JSX.Element
 */
const Course = () => {
    const [course, setCourse] = useState<CourseType>({
        id: 0,
        name: "",
        start_date: "",
        end_date: "",
        status: "",
    });
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);

    // Focus trap
    const cancelButtonRef = useRef(null);
    // Get id from url
    let { id } = useParams();
    // for redirect
    const navigate = useNavigate();

    // Fetch data on initial render
    useEffect(() => {
        const data = fetchData(id as string);
        data.then((data) => {
            setCourse(data);
        }).catch((error) => {
            setError(getErrorMessage(error));
        });
    }, []);

    /**
     * Fetch single course from api
     * 
     * @param id string course id
     * @returns Promise
     * @throws Error
     */
    const fetchData = async (id: string) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/courses/?id=${id}`
        );
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    };

    /**
     * Delete course
     * 
     * @param event React.MouseEvent<HTMLButtonElement>
     * @returns void
     * @throws Error
     */
    const handleCourseDelete = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/courses/index.php?id=${id}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) throw new Error(response.statusText);
        setConfirm(false);
        // Redirect to courses page
        navigate("/courses");
    };

    /**
     * Confirm before deletion
     * 
     * @param event React.MouseEvent<HTMLButtonElement>
     * @returns void
     */
    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setConfirm(true);
    };

    const formattedStartDate = new Date(course.start_date);
    const formattedEndDate = new Date(course.end_date);

    return (
        <div className="min-h-full">
            <Header />

            {/* Show 404 page if course not found */}
            {!course && <Page404 />}

            {course && (
                <main className="pb-12">
                    <header className="relative isolate sm:pt-16">
                        <div
                            className="absolute inset-0 -z-10 overflow-hidden"
                            aria-hidden="true"
                        >
                            <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                                <div
                                    className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                                    style={{
                                        clipPath:
                                            "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                                    }}
                                />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
                        </div>

                        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                                <div className="flex items-center gap-x-6">
                                    <img
                                        src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                                        alt=""
                                        className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                                    />
                                    <h1>
                                        <div className="text-sm leading-6 text-gray-500">
                                            Course{" "}
                                            <span className="text-gray-700">
                                                #{id}
                                            </span>
                                        </div>
                                        <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                                            {course.name}
                                        </div>
                                    </h1>
                                </div>
                                <div className="flex items-center gap-x-4 sm:gap-x-6">
                                    <Link
                                        to={`/courses/${id}/edit`}
                                        className=" hidden sm:block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Edit
                                    </Link>

                                    <Menu
                                        as="div"
                                        className="relative sm:hidden"
                                    >
                                        <Menu.Button className="-m-3 block p-3">
                                            <span className="sr-only">
                                                More
                                            </span>
                                            <EllipsisVerticalIcon
                                                className="h-5 w-5 text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            type="button"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-50"
                                                                    : "",
                                                                "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900"
                                                            )}
                                                        >
                                                            Copy URL
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/courses/${id}/edit`}
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-50"
                                                                    : "",
                                                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                            )}
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
                        <div className="mx-auto lg:mx-0 lg:max-w-none">
                            <div className="lg:col-start-3 lg:row-end-1">
                                <h2 className="sr-only">Summary</h2>
                                <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                    <dl className="flex flex-wrap">
                                        <div className="flex-auto pl-6 pt-6">
                                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                                                Starts
                                            </dt>
                                            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                                                <time
                                                    dateTime={
                                                        course.start_date
                                                    }
                                                >
                                                    {formattedStartDate.toLocaleString(
                                                        "default",
                                                        { month: "long" }
                                                    )}{" "}
                                                    {formattedStartDate.getDate()}
                                                    ,{" "}
                                                    {formattedStartDate.getFullYear()}
                                                </time>
                                            </dd>
                                        </div>
                                        <div className="flex-none self-end px-6 pt-4">
                                            <dt className="sr-only">
                                                Status
                                            </dt>
                                            <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20 capitalize">
                                                {course.status}
                                            </dd>
                                        </div>
                                        <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                            <dt className="flex-none">
                                                <span className="sr-only">
                                                    End date
                                                </span>
                                                <CalendarDaysIcon
                                                    className="h-6 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd className="text-sm leading-6 text-gray-500">
                                                Last day:{" "}
                                                <time
                                                    dateTime={
                                                        course.end_date
                                                    }
                                                >
                                                    {formattedEndDate.toLocaleString(
                                                        "default",
                                                        { month: "long" }
                                                    )}{" "}
                                                    {formattedEndDate.getDate()}
                                                    ,{" "}
                                                    {formattedEndDate.getFullYear()}
                                                </time>
                                            </dd>
                                        </div>
                                    </dl>
                                    <div className="mt-6 border-t border-gray-900/5 px-6 py-6 text-right">
                                        <button
                                            className="text-sm font-semibold leading-6 text-red-800"
                                            onClick={handleConfirm}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Transition.Root show={confirm} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            initialFocus={cancelButtonRef}
                            onClose={setConfirm}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <ExclamationTriangleIcon
                                                            className="h-6 w-6 text-red-600"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-base font-semibold leading-6 text-gray-900"
                                                        >
                                                            Delete Course
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                Are you sure
                                                                you want to
                                                                delete this
                                                                course? All
                                                                of your data
                                                                will be
                                                                permanently
                                                                removed.
                                                                This action
                                                                cannot be
                                                                undone.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    onClick={
                                                        handleCourseDelete
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() =>
                                                        setConfirm(false)
                                                    }
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </main>
            )}

            <Foooter />
        </div>
    );
};

export default Course;
