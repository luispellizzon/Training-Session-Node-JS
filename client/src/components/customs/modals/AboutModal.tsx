import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Arena from '@/assets/mtu-arena.jpeg';

export function AboutModal() {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <p className="text-white border-b-[2px] px-2 py-[0.5px] hover:text-gray-400 hover:border-gray-400">
            About
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader className="px-2 text-left">
          <p className="text-xl font-semibold flex flex-row items-center justify-center gap-1">
            MTU Fitness Training Center
          </p>
        </DialogHeader>
        <div className="w-full max-h-[80dvh] overflow-y-auto pr-5 scroll-smooth">
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-800">About Our Training Platform</h1>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                We are dedicated to help individuals to achieve their fitness goals by providing a
                convenient and user-friendly platform for booking personalized training sessions
                with a variety of facilities.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="bg-blue-50 text-blue-700 p-4 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold  mb-1">
                      Wide Range of Training Facilities
                    </h3>
                    <p>
                      Choose from a variety of training facilities, such as Yoga, Gym, Pool and Spa.
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-50 text-blue-700 p-4 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold ">Convenient Booking System</h3>
                    <p>Browse and book training sessions online, 24/7, from any device.</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-50 text-blue-700 p-4 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold  mb-1">Effortless Account Creation</h3>
                    <p>
                      Get started in minutes with a simple account creation process. Set up your
                      profile and jump into training right away!
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-50 text-blue-700 p-4 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold  mb-1">Session Reports</h3>
                    <p>
                      Easily track your progress with detailed reports on your booking sessions.
                      Review past activities, facility usage, and monitor your journey.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Arena</h2>
              <img src={Arena} />
            </section>

            <section className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h2>
              <div className="relative w-full h-96">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2462.736672714346!2d-8.538622072181823!3d51.884019121901595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4844913336ebb3f7%3A0x3e3d7d24dd22dfab!2sMTU%20Arena%20Gym!5e0!3m2!1sen!2sie!4v1730108021746!5m2!1sen!2sie"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
