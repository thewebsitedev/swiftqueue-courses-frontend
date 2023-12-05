import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useAuth } from './AuthContext'
import SiteHeader from './components/SiteHeader'
import { XMarkIcon } from "@heroicons/react/24/outline";

/**
 * Register screen
 * @returns 
 */
const Register = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()
  const { user, register, error } = useAuth();

  useEffect(() => {
    if (user) {
      setSuccess('You are already registered.');
      setTimeout(() => {
        navigate('/courses');
      }, 1000);
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault()
    register({ email, password });
  }

  return (
    <div className="bg-grey">
      <SiteHeader customClassNames="shadow-sm bg-white" />
      <div className="relative isolate px-6 pt-14 lg:px-8 h-screen">
        <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          {''===success && <div className="w-full max-w-sm space-y-10 bg-white p-6 rounded-md shadow-sm">
            <div>
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create a new account
              </h2>
            </div>
            <form className="space-y-6">
              <div className="relative -space-y-px rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleLoginSubmit}
                >
                  Register
                </button>
              </div>

              {''!==success && <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{success}</p>
                  </div>
                </div>
              </div>}

              {
                error && <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{'Unauthorized' === error ? 'Invalid credentials' : error}</p>
                    </div>
                  </div>
                </div>
              }
            </form>

            <p className="text-center text-sm leading-6 text-gray-500">
              Already a member?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login
              </Link>
            </p>
          </div>}
          {''!==success && <div className="w-full max-w-sm space-y-10 bg-white p-6 rounded-md shadow-sm">
            <div>
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                You are logged in. Redirecting to courses page...
              </h2></div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Register
