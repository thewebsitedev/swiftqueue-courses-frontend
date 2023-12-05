import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, PlusSmallIcon } from '@heroicons/react/20/solid'
import { footerNavigation, filters, sortOptions, classNames } from './Helper'
import { Course } from './Types'
import Header from './components/Header'
import EmptyState from './components/EmptyState'
import Spinner from './components/Spinner'
import { getErrorMessage } from './Helper'
import Foooter from './components/Footer'

/**
 * Courses component
 * 
 * @returns JSX.Element
 */
const Courses = () => {

  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [loading, setLoading] = useState(false);

  /**
   * Fetch data from the API
   * triggers when status or sort changes
   * 
   * @returns void
   */
  useEffect( () => {
    const data = fetchData( status.toString(), sort, '' )
    data.then((data) => {
      setCourses(data);
    }).catch((error) => {
      setError(getErrorMessage(error));
    }).finally(() => {
      setLoading(false);
    });
  }
  ,[status,sort])

  /**
   * Fetch data from the API
   * triggers when search changes
   * 
   * Used debouncing to prevent multiple API calls
   * 
   * @returns void
   */
  useEffect( () => {
    const debounce = setTimeout(() => {
      const data = fetchData( status.toString(), sort, search )
      data.then((data) => {
        setCourses(data);
      }).catch((error) => {
        setError(getErrorMessage(error));
      }).finally(() => {
        setLoading(false);
      });
    }, 1000);
    return () => clearTimeout(debounce)
  },[search])

  /**
   * Function to fetch data from the API
   * @param status course status active, coming soon, ended
   * @param sort display order ASC, DESC
   * @param search search by course name
   *
   * @returns Promise<Course[]>
   */
  const fetchData = async (status:string, sort:string, search:string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/courses/?status=${status}&sort=${sort}&search=${search}`);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }

  /**
   * Function to update the status state of the query
   * @param React.ChangeEvent<HTMLInputElement> event
   *
   * @returns void
   */
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const target = event.target;
    const checked = target.type === 'checkbox' ? target.checked : target.value;
    if (checked) {
      setStatus([...status, target.value]);
    } else {
      setStatus(status.filter((item) => item !== target.value));
    }
  }

  /**
   * Function to update the search state of the query
   * @param React.ChangeEvent<HTMLInputElement> event
   *
   * @returns void
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearch(event.target.value);
  }

  /**
   * Function to update the sort state of the query
   * @param string value
   *
   * @returns void
   */
  const handleSortChange = (value: string) => {
    setLoading(true);
    setSort(value);
  }

  return (
    <div className="min-h-full">
      <Header />

      <main className="pb-24">
        <div className="p-6 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Courses</h3>
          <div className="mt-3 sm:ml-4 sm:mt-0">
            <label htmlFor="mobile-search-candidate" className="sr-only">
              Search
            </label>
            <label htmlFor="desktop-search-candidate" className="sr-only">
              Search
            </label>
            <div className="md:flex md:justify-between rounded-md shadow-sm">
              <div className="relative flex-grow focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="mobile-search-candidate"
                  id="mobile-search-candidate"
                  className="block w-full rounded border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden" 
                  placeholder="Search"
                  onChange={handleSearchChange}
                />
                <input
                  type="text"
                  name="desktop-search-candidate"
                  id="desktop-search-candidate"
                  className="hidden w-full rounded border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                  placeholder="Search courses"
                  onChange={handleSearchChange}
                />
              </div>
              <a
                href="/courses/add"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 ml-0 md:ml-3 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3 md:mt-0 w-full md:w-auto"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                New course
              </a>
            </div>
          </div>
        </div>
        {/* Filters */}
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-b border-t border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                  <FunnelIcon
                    className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Filters
                </Disclosure.Button>
              </div>
              <div className="pl-6">
                <button type="button" className="text-gray-500" onClick={
                  () => {
                    setStatus([]);
                  }
                }>
                  Clear
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Status</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.status.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center text-base sm:text-sm">
                        <input
                          id={`status-${optionIdx}`}
                          name="status[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={status.includes(option.value)}
                          onChange={handleStatusChange}
                        />
                        <label htmlFor={`status-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                option.value === sort ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-left w-full'
                              )}
                              onClick={() => handleSortChange(option.value)}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Disclosure>

        <section aria-labelledby="products-heading" className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Courses
          </h2>

          { loading && <Spinner />}

          { !loading && <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            { !error && courses.length > 0 && courses.map((course) => {
              let startDate = new Date(course.start_date);
              
              return <div key={course.id} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-center w-full h-56 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <svg className="w-10 h-10 text-gray-100 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                  </svg>
                </div>
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/courses/${course.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {course.name}
                    </a>
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="mt-1 text-xs text-gray-500">Starts {startDate.toDateString()}</p>
                  </div>
                </div>
              </div>
            })}
          </div>}

          { !error && courses.length === 0 && <EmptyState /> }

          {
            error && <div className="w-full py-10 text-red-600 text-center text-sm">Seems like the API is acting strange. Please contact support with the error message: "{error}".</div>
          }
        </section>
      </main>

      <Foooter />
    </div>
  )
}

export default Courses;
