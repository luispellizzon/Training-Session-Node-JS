import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircleIcon } from 'lucide-react';

export function HelpModal() {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button size={'sm'} className="text-white p-0 hover:text-gray-400">
          <p className="text-white border-b-[2px] px-2 py-[0.5px] hover:text-gray-400 hover:border-gray-400">
            Help Center
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <p className="text-xl font-semibold flex flex-row items-center justify-center gap-1">
            Help Center
            <span>
              <HelpCircleIcon size={18} />
            </span>
          </p>
        </DialogHeader>
        <div className="w-full max-h-[80dvh] overflow-y-auto pr-5 scroll-smooth">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Help Center - Training Session Booking App
          </h1>

          <nav className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Table of Contents</h2>
            <ul className="space-y-2 list-disc list-inside ">
              <li>
                <a href="#getting-started" className="text-blue-600 hover:text-blue-800">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#user-dashboard" className="text-blue-600 hover:text-blue-800">
                  User Dashboard
                </a>
              </li>
              <li>
                <a href="#new-session" className="text-blue-600 hover:text-blue-800">
                  Book a new training session
                </a>
              </li>
              <li>
                <a href="#user-report" className="text-blue-600 hover:text-blue-800">
                  User Report on Main Page
                </a>
              </li>
              <li>
                <a href="#facilities" className="text-blue-600 hover:text-blue-800">
                  Facilities
                </a>
              </li>
              <li>
                <a href="#troubleshooting" className="text-blue-600 hover:text-blue-800">
                  Troubleshooting
                </a>
              </li>
            </ul>
          </nav>

          <div className="space-y-12">
            <section id="getting-started" className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Getting Started
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Creating an Account</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Click the "Register" button on the homepage</li>
                    <li>
                      Fill in your details:
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Password (minimum 6 characters)</li>
                      </ul>
                    </li>
                    <li>Click "Create Account"</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Logging In</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Enter your registered email and password</li>
                    <li>Click "Sign In"</li>
                  </ol>
                </div>
              </div>
            </section>

            <section id="new-session" className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                User Dashboard
              </h2>

              <p className="text-gray-600 mb-4">
                Your dashboard is your central hub for managing all training activities.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-4">Dashboard Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Quick Overview:</span>
                  See your upcoming sessions
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Manage Sessions:</span>
                  Edit or delete a specific training session
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Booking Summary:</span>
                  View total booked sessions
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Recent Activity:</span>
                  Track your latest bookings
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Quick Actions:</span>
                  Book new sessions directly from the dashboard
                </li>
              </ul>
            </section>

            <section id="user-report" className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Book a New Training Session
              </h2>

              <p className="text-gray-600 mb-4">
                Ready to get fit? Book a new training session in advance to choose all the
                facilities that suits you better.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-4">New Training Session</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>
                  Click the "New Session" button on the navigation (left side) on the dashboard
                </li>
                <li>Enter date and time that best suits your time</li>
                <li>Select the facilities you would like to use</li>
                <li>Enter payment details</li>
                <li>Click "Create New Session"</li>
              </ol>
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700">
                  To book a new session, the system will charge 20 EUR from your bank account.
                </p>
              </div>
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-700">
                  To get a refund, you must delete your booked session before your session begins.
                  Refunds are done automatically by the system.
                </p>
              </div>
              <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">
                  Deleting a training session is a action that{' '}
                  <span className="font-semibold">cannot be undone</span>.
                </p>
              </div>
            </section>

            <section id="user-report" className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                User Report on Main Page
              </h2>

              <p className="text-gray-600 mb-4">
                Search for training sessions booked by a user within a specific time range.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-4">Report Form</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Click the "User Report" link on the homepage</li>
                <li>Enter user id and a time range</li>
                <li>Click "Search"</li>
              </ol>
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700">
                  This search will display a table with all the booked sessions from the specified
                  user given the time range
                </p>
              </div>
            </section>

            <section id="facilities" className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Facilities
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-100 rounded-sm p-4 border-l-4 border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Spa</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>Relaxation and wellness treatments</li>
                    <li>Sauna and steam room access</li>
                  </ul>
                </div>

                <div className="bg-gray-100 rounded-sm p-4 border-l-4 border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Gym</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>Full range of exercise equipment</li>
                    <li>Personal training area</li>
                  </ul>
                </div>

                <div className="bg-gray-100 rounded-sm p-4 border-l-4 border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Pool</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>Lane swimming</li>
                    <li>Aqua fitness sessions</li>
                  </ul>
                </div>

                <div className="bg-gray-100 rounded-sm p-4 border-l-4 border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Yoga</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>Dedicated yoga studio</li>
                    <li>Various yoga styles available</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700">
                  You must select at least one facility when booking a new training session
                </p>
              </div>
            </section>

            <section id="troubleshooting" className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Troubleshooting
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Common Issues</h3>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Cannot Log In?</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>Verify your email address and password is correct</li>
                        <li>Check Caps Lock is off</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Booking Error?</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>Ensure you have a valid payment method</li>
                        <li>Check if the selected time slot is available</li>
                        <li>Verify your session doesn't conflict with existing bookings</li>
                      </ul>
                      <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-blue-700">
                          Make sure the time specified to book a training sessions is in the future
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
