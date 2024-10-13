import LoginForm from '@/components/customs/forms/login/LoginForm';
import HeroImage from '@/assets/hero.png';
import { ArrowRight } from 'lucide-react';
import { LoginModal } from '@/components/customs/modals/LoginModal';
import RegistrationForm from '@/components/customs/forms/registration/RegistrationForm';
import { useState } from 'react';

export const Login = () => {
  const [userAction, setUserAction] = useState<string>('sign-in');
  return (
    <section
      id="login"
      className="login-bg w-dvw h-dvh flex items-center justify-center overflow-y-scroll"
    >
      {/* Desktop Landing Page */}
      <div className="hidden sm:flex rounded-sm shadow-2xl mx-2 my-4">
        <div className="bg-slate-900 w-full flex justify-center">
          <div className="w-full text-white flex-initial flex justify-center flex-col items-center p-5">
            <h1 className="text-xl md:text-2xl text-center font-bold tracking-wider">
              Start Your Training Here
            </h1>
            <div className="flex flex-col gap-3 lg:items-center p-4">
              <p className="flex items-center gap-2 text-sm">
                <ArrowRight className="inline-block" size={12} />
                Book your training session at any time.
              </p>
              <p className="flex items-center gap-2 text-sm">
                <ArrowRight className="inline-block" size={12} />
                Choose a range of facilities that best suits your training session.
              </p>
              <p className="flex items-center gap-2 text-sm">
                <ArrowRight className="inline-block" size={12} />
                Get ready to be a better version of yourself.
              </p>
            </div>
            <img src={HeroImage} alt="Hero image" className="w-[500px]" />
            <p className="text-xs italic text-center">MTU Fitness Training Session</p>
          </div>
        </div>
        <div className="bg-white flex-auto flex items-center px-5 py-4 justify-center md:min-w-[350px]">
          {userAction === 'sign-in' && <LoginForm setUserAction={setUserAction} />}
          {userAction === 'sign-up' && <RegistrationForm setUserAction={setUserAction} />}
        </div>
      </div>

      {/* Mobile Landing Page */}
      <div className="flex sm:hidden flex-col rounded shadow-2xl mx-1">
        <div className="bg-slate-900 rounded w-full flex justify-center">
          <div className="w-full text-white flex-initial flex flex-col items-center p-5 gap-3">
            <h1 className="text-2xl text-center font-bold tracking-wider">
              Start Your Training Here
            </h1>
            <div className="flex flex-col gap-3 lg:items-center">
              <p className="flex items-center gap-2 text-sm">
                <ArrowRight className="inline-block" size={12} />
                Book your training session at any time.
              </p>
              <p className="flex items-center gap-2 text-sm">
                <ArrowRight className="inline-block" size={12} />
                Choose a range of facilities that best suits your training session.
              </p>
              <p className="flex items-center gap-2 text-sm">
                <ArrowRight className="inline-block" size={12} />
                Get ready to be a better version of yourself.
              </p>
            </div>
            <img src={HeroImage} alt="Hero image" className="w-[500px] relative left-[-10px]" />
            <div className="w-[75%]">
              <LoginModal />
            </div>
            <p className="text-xs italic text-center pt-4">MTU Fitness Training Session</p>
          </div>
        </div>
      </div>
    </section>
  );
};
